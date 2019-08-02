import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators'
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as FromApp from '../store/app.reducer';

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, 
                private router: Router,
                private store: Store<FromApp.AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot ): boolean | Promise<boolean> | Observable<boolean| UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map((appState) => {
                if(appState) {
                    return appState.user;
                }
            }),
            map(user => {
                const isAuth = !!user;
                if(isAuth) { 
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
        );
    }
}