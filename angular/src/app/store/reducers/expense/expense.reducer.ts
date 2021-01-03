import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IExpense, IExpenseEntityState } from 'src/app/common/interface';
import { GetExpenseAction, LoadExpenseAction } from '../../actions/expense.action';

export const ExpenseAdaptor: EntityAdapter<IExpense> = createEntityAdapter<IExpense>();

const expenseReducer = createReducer(
    ExpenseAdaptor.getInitialState(),
    on(GetExpenseAction),
    on(LoadExpenseAction, (state, { expenses: expenses }) => ExpenseAdaptor.addMany(expenses, state))
);

export function ExpenseReducer(state: IExpenseEntityState | undefined, action: Action): IExpenseEntityState {
    return expenseReducer(state, action);
}
