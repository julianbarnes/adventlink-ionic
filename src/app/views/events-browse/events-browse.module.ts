import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { EventsBrowseComponent } from './events-browse.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { AccountComponent } from '../../shared/components/account/account.component';
import { CategoryBarComponent } from '../../shared/components/category-bar/category-bar.component';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [
    EventsBrowseComponent,
    EventDetailComponent,
    CategoryCardComponent,
    DropdownComponent,
    CategoryBarComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ScrollingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  exports: [MatCardModule],
})
export class EventsBrowseModule {}
