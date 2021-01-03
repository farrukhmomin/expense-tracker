import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { environment } from 'src/environments/environment';
import { IExpense, IIgnoreTags } from '../../interface';

interface ITags {
  tag: string;
  count: number;
  total: number;
  expenses?: IExpense[];
}

@Component({
  selector: 'app-tag-summary',
  templateUrl: './tag-summary.component.html',
  styleUrls: ['./tag-summary.component.scss']
})
export class TagSummaryComponent implements OnChanges {

  @Input() expenses: IExpense[] = [];
  @Input() ignoreTags: IIgnoreTags[] = [];
  @Input() month: number = new Date().getMonth() + 1;
  iconUrl = environment.iconsUrl;

  tags: ITags[] = [];
  tagsFormed = false;

  constructor(private expenseType: ExpenseService) { }

  ngOnChanges(changes: SimpleChanges): void {

    this.tags = [];

    this.expenses?.forEach(expense => {
      expense.tagsArray.forEach((t: string) => {
        const found = this.tags.find(i => i.tag === t);
        const ignoreTagFound = this.ignoreTags.find(i => i.tag === t);

        if (ignoreTagFound === undefined) {


          if (found === undefined) {
            this.tags.push({ tag: t, count: 1, total: expense.expense_total, expenses: [expense] });
          } else {
            found.count = found.count + 1;
            found.total = found.total + expense.expense_total;
            if (!found.expenses?.find(i => i.id === expense.id)) {
              found.expenses?.push(expense);
            }
          }


        }

      });


    });

    this.tags = this.tags.sort((a, b) => b.count - a.count);
  }

  getIcon(desc: string): string {
    return this.expenseType.expenseTypeIcons[desc.toLowerCase()];
  }
}
