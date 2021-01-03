import { createAction, props } from '@ngrx/store';
import { IExpense } from 'src/app/common/interface';

export enum ExpenseActionTypes {
    EXPENSE_LIST_SUCCESS = 'Expense list SUCCESS',
    EXPENSE_LIST_GET = 'Expense list GET'
}

export const GetExpenseAction = createAction(
    ExpenseActionTypes.EXPENSE_LIST_GET
);

export const LoadExpenseAction = createAction(
    ExpenseActionTypes.EXPENSE_LIST_SUCCESS,
    props<{ expenses: IExpense[] }>()
);
