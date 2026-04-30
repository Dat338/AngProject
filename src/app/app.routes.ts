import { Routes } from '@angular/router';
import { guardGuard } from './guards/guard-guard';

export const routes: Routes = [
    {
        path : "",
        redirectTo : "main",
        pathMatch : "full"
    },
    {
        path : "home",
        loadComponent : () => import('./home/home').then(m => m.Home)
    },
    {
        path : "main",
        loadComponent : () => import('./mainpage/mainpage').then(m => m.Mainpage)
    },
    {
        path : "login",
        loadComponent : () => import('./login/login').then(m => m.Login)
    },
    {
        path : "register",
        loadComponent : () => import('./register/register').then(m => m.Register)
    },
    {
        path : "details",
        loadComponent : () => import('./details/details').then(m => m.Details)
    },
    {
        path : "cart",
        loadComponent : () => import('./cart/cart').then(m => m.Cart),
        canActivate : [guardGuard]
    },
    {
        path : "profile",
        loadComponent : () => import('./profile/profile').then(m => m.Profile),
        canActivate : [guardGuard]
    },
    {
        path : "**",
        redirectTo : "home"
    }
];
