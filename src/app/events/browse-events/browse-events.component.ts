import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SelectableChipListComponent } from 'src/app/shared/selectable-chip-list/selectable-chip-list.component';
import { EventsService } from '../../shared/services/events-service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-browse-events',
  templateUrl: './browse-events.component.html',
  styleUrls: ['./browse-events.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, SelectableChipListComponent, HttpClientModule, MatCardModule],
  providers: [EventsService, HttpClient],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseEventsComponent implements OnInit{
  readonly categories = ['Social', 'Bible Study', 'Professional', 'Spiritual', 'Small Group'];
  public allEvents: any[] = [];

  constructor(private eventsService: EventsService) { 
    //Get event works
    this.eventsService.getEvents().subscribe((response) => {
      debugger;
      this.allEvents = response.data;
      console.log(this.allEvents)
    });
  }

  ngOnInit() {
    //Get event works
    this.eventsService.getEvents().subscribe((response) => {
      debugger;
      this.allEvents = response.data;
      console.log(this.allEvents)
    });
  }
  onSelectedItemsChanged() {
    
  }

}
