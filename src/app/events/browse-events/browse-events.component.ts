import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SelectableChipListComponent } from 'src/app/shared/selectable-chip-list/selectable-chip-list.component';

@Component({
  selector: 'app-browse-events',
  templateUrl: './browse-events.component.html',
  styleUrls: ['./browse-events.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, SelectableChipListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseEventsComponent {
  readonly categories = ['Social', 'Bible Study', 'Professional', 'Spiritual', 'Small Group'];

  constructor() { }

  onSelectedItemsChanged() {
    
  }

}
