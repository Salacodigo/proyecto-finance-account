import { Routes } from '@angular/router';
import { LayoutComponent } from './domains/shared/components/layout/layout.component';


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
                loadComponent: () => import('./domains/transactions/components/dashboard/dashboard.component')
            },
            {
                path: 'profile',
                loadComponent: () => import('./domains/profile/profile.component')
            },
            {
                path: 'transaction-list',
                loadComponent: () => import('./domains/transactions/components/transaction-list/transaction-list.component')
            },
            {
                path: 'login',
                loadComponent: () => import('./domains/authentication/components/login/login.component')
            },
            {
                path: 'signup',
                loadComponent: () => import('./domains/authentication/components/sign-up/sign-up.component')
            },
            {
                path: 'accounts',
                loadComponent: () => import('./domains/accounts/accounts.component')
            },
        ]
    },
    {
        path: '**',
        component: LayoutComponent
    }
    
];
