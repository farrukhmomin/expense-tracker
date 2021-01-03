import { createAction, props } from '@ngrx/store';
import { IExpenseType } from 'src/app/common/interface';

export enum ExpenseTypeActionTypes {
    EXPENSE_TYPE_LIST_SUCCESS = 'Expense type list SUCCESS',
    EXPENSE_TYPE_LIST_GET = 'Expense type list GET'
}

export const GetExpenseTypeAction = createAction(
    ExpenseTypeActionTypes.EXPENSE_TYPE_LIST_GET
);

export const LoadExpenseTypeAction = createAction(
    ExpenseTypeActionTypes.EXPENSE_TYPE_LIST_SUCCESS,
    props<{ expenseType: IExpenseType[] }>()
);
