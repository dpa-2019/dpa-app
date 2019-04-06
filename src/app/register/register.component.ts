import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

constructor( private http: HttpClient) { }
  createUser(firstname: string, lastname: string, password: string, email: string,
    birthyear: number, birthday: number, birthmonth: number): void {

    console.log('aaaaa ' + name);
    const user = {'firstname' : firstname,
                    'lastname': lastname,
                    'password': password,
                    'email': email,
                    'birthyear': birthyear,
                    'birthday': birthday,
                    'birthmonth': birthmonth};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    const url = '/api/user/register';

    this.http.put<User>(url, user, httpOptions).subscribe((res) => { console.log(res)});

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
