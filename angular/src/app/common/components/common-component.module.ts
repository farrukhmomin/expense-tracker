import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MembersComponent } from './members/members.component';
import { MatListModule } from '@angular/material/list';
import { TagSummaryComponent } from './tag-summary/tag-summary.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpenseGroupComponent } from './expense-group/expense-group.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
    declarations: [MembersComponent, TagSummaryComponent, ExpenseGroupComponent, ExpenseListComponent],
    imports: [
        CommonModule,
        MatListModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatRippleModule
    ],
    exports: [
        MembersComponent,
        TagSummaryComponent,
        ExpenseGroupComponent,
        ExpenseListComponent
    ]
})
export class CommonComponentsModule { }
