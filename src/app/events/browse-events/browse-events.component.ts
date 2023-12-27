import { SelectableChipListComponent } from 'src/app/shared/selectable-chip-list/selectable-chip-list.component';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AddEventComponent } from '../add-event/add-event.component';

@Component({
  selector: 'app-browse-events',
  templateUrl: './browse-events.component.html',
  styleUrls: ['./browse-events.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, AddEventComponent, SelectableChipListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseEventsComponent {
  readonly categories = ['Social', 'Bible Study', 'Professional', 'Spiritual', 'Small Group'];

  constructor() { }

  onSelectedItemsChanged() {
    
  }

}
