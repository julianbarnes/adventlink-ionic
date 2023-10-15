import { format, utcToZonedTime } from 'date-fns-tz';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEventComponent  implements OnInit {

  constructor() {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date();
    const zonedTime = utcToZonedTime(date, userTimeZone);
    console.log(format(zonedTime, 'MMM dd, yyyy HH:mm', {timeZone: userTimeZone}));
  }

  ngOnInit() {}

}
