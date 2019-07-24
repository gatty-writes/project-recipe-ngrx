import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators'
import { AuthService } from './auth.service';

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot ): boolean | Promise<boolean> | Observable<boolean| UrlTree> {
        return this.authService.user$.pipe(
            take(1),
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