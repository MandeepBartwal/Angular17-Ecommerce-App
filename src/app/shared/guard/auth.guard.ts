import { Injectable } from '@angular/core';
import { Router, CanActivate, Route, UrlSegment, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { Observable } from 'rxjs/internal/Observable';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _sharedService: SharedService,
  ) {}
  private _check(redirectURL: string): Observable<boolean> {
    // Check the authentication status
    return this._sharedService.check()
      .pipe(
        switchMap((authenticated) => {

          if (!authenticated) {
            // Redirect to the sign-in page
            this.router.navigate(['/login']);

            // Prevent the access
            return of(false);
          }

          // Allow the access
          return of(true);
        })
      );
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._check('/login');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const redirectUrl = state.url === '/login' ? '' : state.url;
      return this._check(redirectUrl);
  }
}
