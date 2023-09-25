import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectableChipComponent } from '../selectable-chip/selectable-chip.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selectable-chip-list',
  templateUrl: './selectable-chip-list.component.html',
  styleUrls: ['./selectable-chip-list.component.scss'],
  imports: [CommonModule, SelectableChipComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectableChipListComponent  implements OnChanges {
  @Input() items: string[] = [];
  @Output() selectedItemsChanged = new EventEmitter<string[]>();

  // value: isSelected
  private readonly itemsMap = new Map<string, boolean>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      this.itemsMap.clear();
      for (const item of this.items) {
        this.itemsMap.set(item, false);
      }
    }
  }

  onChipSelection(index: number) {
    const item = this.items[index];
    this.itemsMap.set(item, !this.itemsMap.get(item)!);
    const selectedItems = Array.from(new Map([...this.itemsMap]
        .filter(([_, v]) => v === true))
      .keys());
    this.selectedItemsChanged.emit(selectedItems);
  }
}
