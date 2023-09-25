import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrowseEventsComponent } from './events/browse-events/browse-events.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: BrowseEventsComponent
  },
  {
    path: 'events/add',
    component: AddEventComponent
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
