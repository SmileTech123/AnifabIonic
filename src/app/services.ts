import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseurl: string = 'https://anifab.duckdns.org:3000';

@Injectable({
  providedIn: 'root',
})
export class ServiceAnifab {
  constructor(private http: HttpClient) {}

  Authenticate(user: string, password: string) {
    return this.http.get(
      baseurl + '/loguser?user=' + user + '&pass=' + password
    );
  }

  LastSeen(user: string) {
    return this.http.get(baseurl + '/lastseenget?user=' + user);
  }

  

}
