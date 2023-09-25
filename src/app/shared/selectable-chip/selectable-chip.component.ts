import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-selectable-chip',
  templateUrl: './selectable-chip.component.html',
  styleUrls: ['./selectable-chip.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectableChipComponent {
  protected selected = false;

  @Output() chipSelected = new EventEmitter<void>();

  constructor(private readonly cdr: ChangeDetectorRef) {
  }

  onChipClick() {
    this.selected = !this.selected;
    this.cdr.detectChanges();
    this.chipSelected.emit();
  }
}
