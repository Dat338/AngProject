import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : "",
        redirectTo : "main",
        pathMatch : "full"
    },
    {
        path : "main",
        loadComponent : () => import('./mainpage/mainpage').then(m => m.Mainpage)
    },
    {
        path : "**",
        redirectTo : "main"
    }
];
