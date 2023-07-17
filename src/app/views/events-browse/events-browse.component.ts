import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../shared/services/events-service';
import { EventDetails } from '../../interfaces/event-details';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VerseService } from 'src/app/service/verse.service';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-events-browse',
  templateUrl: './events-browse.component.html',
  styleUrls: ['./events-browse.component.scss'],
})
export class EventsBrowseComponent implements OnInit {
  public allEvents: EventDetails[];
  public pastEvents: EventDetails[];
  public events: EventDetails[];
  public categoryForm: FormControl;
  public categories: string[] = [
    'Bible Studies',
    'Potluck',
    'Community Development',
    'Sports',
    'Evangelistic',
    'Social',
  ];
  public isAdmin = false;
  public eventForm: FormGroup;
  public links = [
    {
      url: 'https://adventistbookcenter.com/',
      picture: '../../../assets/images/abc.png',
    },
    {
      url: 'https://www.adventistworld.org/',
      picture: '../../../assets/images/adventist-world.png',
    },
    {
      url: 'https://www.amazingfacts.org',
      picture: '../../../assets/images/af.png',
    },
    {
      url: 'https://www.adventistbiblicalresearch.org',
      picture: '../../../assets/images/andrews.png',
    },
    {
      url: 'https://www.news.adventist.org',
      picture: '../../../assets/images/ann.png',
    },
    {
      url: 'https://www.atsjats.org/',
      picture: '../../../assets/images/astr.png',
    },
    {
      url: 'https://www.audioverse.org/',
      picture: '../../../assets/images/audio-verse.png',
    },
    {
      url: 'https://www.awr.org/',
      picture: '../../../assets/images/awr.png',
    },
    {
      url: 'https://www.whiteestate.org/',
      picture: '../../../assets/images/egw.png',
    },
    {
      url: 'https://faithfortoday.tv/',
      picture: '../../../assets/images/fft.png',
    },
    {
      url: 'https://www.glowonline.org/',
      picture: '../../../assets/images/glow.png',
    },
    {
      url: 'https://www.libertymagazine.org/',
      picture: '../../../assets/images/liberty.png',
    },
    {
      url: 'https://www.ministrymagazine.org/',
      picture: '../../../assets/images/ministry.png',
    },
  ];
  private bibleVersePromises = [];
  public bibleVerses = [];

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private router: Router,
    private verseService: VerseService
  ) {}

  async ngOnInit() {
    //Bible verses
    setInterval(() => {
      for (let i = 0; i < 10; i++) {
        this.bibleVersePromises.push(firstValueFrom(this.verseService.getVerse()));
      }
      Promise.all(this.bibleVersePromises).then((responses) => {
        responses.forEach((verse) => {
          this.bibleVerses.push(verse[0]);
        });
      });
    }, 10000);

    this.categoryForm = new FormControl('Worship');

    this.eventForm = this.fb.group({
      ageGroup: [''],
      category: [''],
    });
    //Get event works
    this.eventsService.getEvents().subscribe((response) => {
      this.allEvents = response.data;
      this.filterEvents();
    });

    this.eventForm.controls['ageGroup'].valueChanges.subscribe((value) => {
      this.filterEvents('ageGroup', value);
    });

    this.eventForm.controls['category'].valueChanges.subscribe((value) => {
      this.filterEvents('category', value);
    });
  }

  navigate(event: EventDetails) {
    this.router.navigate(['/event-detail/' + event._id], { state: { data: event } });
  }

  navigateToAdd() {
    this.router.navigate(['events/add']);
  }

  filterEvents(category?: string, value?: string) {
    let today = new Date();
    // console.log(this.allEvents.map(event => typeof event.startDate))
    this.events = this.allEvents.filter((event) => new Date(event.startDate) > today);
    if (category) {
      this.events = this.events.filter((event) => event[category] === value);
    }
  }
}
