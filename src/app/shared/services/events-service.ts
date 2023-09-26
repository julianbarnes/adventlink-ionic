import { Observable, throwError } from 'rxjs';
import { catchError, retry, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventDetails } from 'src/app/interfaces/event-details';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private server: string;
  constructor(private http: HttpClient) {
    this.server = environment.url;
  }

  public getEvents(): Observable<any> {
    return this.http.get(`${this.server}/events/all`);
  }
  public getActiveEvents() {
    return this.http.get(`${this.server}/events/active`);
  }
  public addEvent(event: EventDetails, picture?: any) {
    event.picture = picture;

    return this.addEventPicture(event, picture).pipe(
      mergeMap((response) => {
        event.picture = response['picture'];
        return this.http.post(`${this.server}/events/add`, event);
      })
    );
  }
  private addEventPicture(event: EventDetails, picture: any): Observable<any> {
    let formData = new FormData();
    formData.set('title', event.title);
    formData.append('picture', picture);
    return this.http.post(`${this.server}/events/add-picture`, formData);
  }
}
