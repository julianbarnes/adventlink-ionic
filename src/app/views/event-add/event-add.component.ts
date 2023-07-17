import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/shared/services/events-service';
@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss'],
})
export class EventAddComponent implements OnInit {
  public eventForm: FormGroup;
  public file: File;
  constructor(private fb: FormBuilder, private eventsService: EventsService, private router: Router) {}

  ngOnInit() {
    this.eventForm = this.fb.group({
      title: [''],
      description: [''],
      url: [''],
      startDate: [''],
      endDate: [''],
      location: [''],
      picture: [''],
    });
  }

  save() {
    console.log(this.file);
    //convert date to utc
    this.eventForm.value['startDate'] = this.convertToUtc(this.eventForm.value['startDate']);
    this.eventForm.value['endDate'] = this.convertToUtc(this.eventForm.value['endDate']);
    this.eventsService.addEvent(this.eventForm.value, this.file).subscribe(
      (response) => {
        console.log(response);
        this.navigateToEvents();
      },
      (error: any) => {
        alert('There was an error');
      }
    );
  }

  fileChosen(event: any) {
    if (event.target.value) {
      this.file = <File>event.target.files[0];
      console.log(event.target.files);
    }
  }

  navigateToEvents() {
    this.router.navigate(['events']);
  }

  /**
   * @description takes in a EST Date and returns the date in UCT
   * @returns Date
   */
  private convertToUtc(date: Date) {
    let estDate = new Date(date);
    return estDate.toUTCString();
  }
}
