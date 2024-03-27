import { Routes } from '@angular/router';
import { LayoutComponent } from './domains/shared/components/layout/layout.component';
import { authGuard } from './domains/shared/guards/auth.guard';
import CreateTransactionComponent from './domains/transactions/components/create-transaction/create-transaction.component';



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
                path: 'create-transaction',
                // canActivate: [authGuard],
                loadComponent: () => import('./domains/transactions/components/create-transaction/create-transaction.component')
            },
            {
                path: '**',
                loadComponent: () => import('./domains/home/home.component')
            }
        ]
    },
    {
        path: '**',
        component: LayoutComponent
    }
];
