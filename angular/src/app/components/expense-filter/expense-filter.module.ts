import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
import { CommonComponentsModule } from '../../common/components/common-component.module';
import { ExpenseFilterComponent } from './expense-filter.component';

const routes: Routes = [
    {
        path: 'member/:id',
        component: ExpenseFilterComponent
    },
    {
        path: 'tag/:tag',
        component: ExpenseFilterComponent
    }
];


@NgModule({
    declarations: [ExpenseFilterComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatChipsModule,
        CommonComponentsModule
    ],
    exports: [
        RouterModule
    ]
})
export class ExpenseFilterModule { }
