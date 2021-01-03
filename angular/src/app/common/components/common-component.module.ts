import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MembersComponent } from './members/members.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TagSummaryComponent } from './tag-summary/tag-summary.component';

@NgModule({
    declarations: [MembersComponent, TagSummaryComponent],
    imports: [CommonModule, MatListModule, MatIconModule],
    exports: [
        MembersComponent,
        TagSummaryComponent
    ]
})
export class CommonComponentsModule { }
