import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './app-shell.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonComponentsModule } from 'src/app/common/components/common-component.module';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    loadChildren: () => import('./../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'show',
    component: AppShellComponent,
    loadChildren: () => import('./../components/expense-filter/expense-filter.module').then(m => m.ExpenseFilterModule)
  },
  {
    path: 'dashboard',
    redirectTo: '',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [AppShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatButtonModule,
    CommonComponentsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppShellModule { }
