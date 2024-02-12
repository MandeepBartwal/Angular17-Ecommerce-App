import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { credentials, productData } from '../types/shared.types';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public userId$: BehaviorSubject<number> = new BehaviorSubject(0);
  public userInfo$: BehaviorSubject<any> = new BehaviorSubject(null);
  public productData$: BehaviorSubject<productData | null> = new BehaviorSubject<productData | null>(null)
  public _authenticated: boolean = false
  constructor(private _httpClient: HttpClient) { }
  set accessToken(token: any) {
    localStorage.setItem('accessInfo', JSON.stringify(token));
  }

  get accessToken(): any {
    let getToken: any = localStorage.getItem('accessInfo');
    JSON.parse(getToken)
    return getToken ?? '';
  }
  signIn(credentials: credentials): Observable<any> {
    if (this._authenticated) {
      alert('User is already logged in.');
    }

    return this._httpClient.post(`${environment.apiUrl}auth/login`, credentials).pipe(
      map((res: any) => {
        // Store the access token in the local storage
        let accessInfo = {
          accessToken: res.token,
          userID: res.id,
          isLoogedIn: true
        }
        this.accessToken = accessInfo;
        this._authenticated = true;
        return of(res)
      })
    )
  }


  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    return of(true)
  }

  getAllProducts() {
    return this._httpClient.get<productData>(`${environment.apiUrl}products`).pipe(map((res) => {
      this.productData$.next(res)
      return res
    }))
  }
}
