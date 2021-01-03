import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IExpenseTypeEntityState, IExpenseType } from 'src/app/common/interface';
import { GetExpenseTypeAction, LoadExpenseTypeAction } from '../../actions/expense-type.action';

export const ExpenseTypeAdaptor: EntityAdapter<IExpenseType> = createEntityAdapter<IExpenseType>();

const expenseTypeReducer = createReducer(
    ExpenseTypeAdaptor.getInitialState(),
    on(GetExpenseTypeAction),
    on(LoadExpenseTypeAction, (state, { expenseType: expenses }) => ExpenseTypeAdaptor.addMany(expenses, state))
);

export function ExpenseTypeReducer(state: IExpenseTypeEntityState | undefined, action: Action): IExpenseTypeEntityState {
    return expenseTypeReducer(state, action);
}
