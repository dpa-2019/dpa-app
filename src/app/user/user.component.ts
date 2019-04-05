import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor( private http: HttpClient) { }
  getUser(name: string): void {

    console.log('aaaaa ' + name);
    const url = '/api/user/get?name='+name+'&age=0';
    /*return this.http.get<User>(url).pipe(
      tap(_ => console.log('fetched user name=${name}')),
      catchError(this.handleError<User>('getHero name=${name}'))
    );*/

    this.http.get<User>(url).subscribe((res) => { console.log(res)});

  }

  ngOnInit() {
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
