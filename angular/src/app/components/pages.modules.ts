import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonComponentsModule } from '../common/components/common-component.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseFilterComponent } from './expense-filter/expense-filter.component';

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./../components/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'show',
        loadChildren: () => import('./../components/expense-filter/expense-filter.module').then(m => m.ExpenseFilterModule)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CommonComponentsModule
    ],
    exports: [
        RouterModule
    ]
})
export class PagesModule { }
