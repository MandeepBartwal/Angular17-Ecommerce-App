/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { credentials, product, productData, userInfo } from '../types/shared.types'

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public userId$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  public userInfo$: BehaviorSubject<userInfo | null> = new BehaviorSubject<userInfo | null>(null)
  public productData$: BehaviorSubject<productData | null> = new BehaviorSubject<productData | null>(null)
  public authenticated: boolean = false

  constructor(private httpClient: HttpClient) {}

  set accessToken(token: any) {
    localStorage.setItem('accessInfo', JSON.stringify(token))
  }

  get accessToken(): any {
    const getToken = localStorage.getItem('accessInfo')
    return JSON.parse(getToken || '{}')
  }

  signIn(credentials: credentials): Observable<credentials> {
    if (this.authenticated) {
      alert('User is already logged in.')
      return of({ username: '', password: '' })
    }

    return this.httpClient.post<any>(`${environment.apiUrl}auth/login`, credentials).pipe(
      map((res) => {
        const accessInfo = {
          accessToken: res.token,
          userID: res.id,
          isLoggedIn: true,
        }
        this.accessToken = accessInfo
        this.authenticated = true
        return res
      }),
    )
  }

  check(): Observable<boolean> {
    if (this.authenticated) {
      return of(true)
    }

    if (!this.accessToken.accessToken) {
      return of(false)
    }

    return of(true)
  }

  getAllProducts(): Observable<productData> {
    return this.httpClient.get<productData>(`${environment.apiUrl}products`).pipe(
      map((res) => {
        this.productData$.next(res)
        return res
      }),
    )
  }

  getProductDetails(productId: number): Observable<product> {
    return this.httpClient.get<product>(`${environment.apiUrl}products/${productId}`)
  }
}
