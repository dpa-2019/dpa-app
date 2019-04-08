import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  public loggedinuser: User;
  public message: string;
  constructor(private router: Router, private http: HttpClient) {
      this.loggedinuser = JSON.parse(localStorage.getItem('loggedinuser'));
  }


  logout() {
    localStorage.removeItem('access_token');
        localStorage.removeItem('loggedinuser');

  }

  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

  getUser(email: string, password: string): void {

    const user = {'email': email, 'password': password};
    const url = '/api/user/login';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    //this.http.post<User>(url, user, httpOptions).subscribe((res: any) => { console.log(res)});
    this.http.post<User>(url, user, httpOptions).subscribe(
      (res: any) => {

        localStorage.setItem('access_token', res.access_token?res.access_token : 'fake-token');
        localStorage.setItem('loggedinuser', JSON.stringify(res));

        this.router.navigateByUrl('/profile');
        },
      (error) => { console.log(error); this.message = error.error });
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
