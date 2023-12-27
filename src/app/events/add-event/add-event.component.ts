import { format, utcToZonedTime } from 'date-fns-tz';
import { BehaviorSubject } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonDatetime, IonicModule, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEventComponent implements OnInit {
  date = '';
  description = '';
  location = '';
  name = '';
  url = '';
  selectedImage = new BehaviorSubject<File|undefined>(undefined);

  @ViewChild('fileInput')
  fileInput!: IonInput;

  @ViewChild('datepicker')
  datepicker!: IonDatetime;

  constructor() {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date();
    const zonedTime = utcToZonedTime(date, userTimeZone);
    console.log(format(zonedTime, 'MMM dd, yyyy HH:mm', {timeZone: userTimeZone}));
  }

  async getSelectedFile(): Promise<FileList|null> {
    return (await this.fileInput.getInputElement()).files;
  }

  async submit() {
    const files: FileList|null = await this.getSelectedFile();
    if (!files || files.length === 0) return;
    // TODO: Send file data to the server
  }

  async clickFileInput() {
    (await this.fileInput.getInputElement()).click();
  }

  onDateChange() {
    // Close the date picker on selection
    document.querySelector('ion-modal.ion-datetime-button-overlay')
    ?.shadowRoot?.querySelector('ion-backdrop')?.click();
  }

  async onFileSelected() {
    const files: FileList|null = await this.getSelectedFile();
    this.selectedImage.next(files?.[0]);
  }

  ngOnInit() {}

}
