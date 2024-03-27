import { Routes } from '@angular/router';
import { LayoutComponent } from './domains/shared/components/layout/layout.component';
import { authGuard } from './domains/shared/guards/auth.guard';




export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./domains/home/home.component')
            },
            {
                path: 'dashboard',
                canActivate: [authGuard],
                loadComponent: () => import('./domains/transactions/components/dashboard/dashboard.component')
            },
            {
                path: 'profile',
                canActivate: [authGuard],
                loadComponent: () => import('./domains/profile/profile.component')
            },
            {
                path: 'transaction-list',
                canActivate: [authGuard],
                loadComponent: () => import('./domains/transactions/components/transaction-list/transaction-list.component')
            },
            {
                path: '**',
                loadComponent: () => import('./domains/home/home.component')
            }
            // {
            //     path: 'signin',
            //     loadComponent: () => import('./domains/authentication/components/login/login.component')
            // },
            // {
            //     path: 'signup',
            //     loadComponent: () => import('./domains/authentication/components/sign-up/sign-up.component')
            // },
            
        ]
    },
    {
        path: '**',
        component: LayoutComponent
    }
    
];
