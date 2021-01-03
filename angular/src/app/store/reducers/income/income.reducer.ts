import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IIncome, IIncomeEntityState } from 'src/app/common/interface';
import { GetIncomeAction, LoadIncomeAction } from '../../actions/income.action';


export const IncomeAdaptor: EntityAdapter<IIncome> = createEntityAdapter<IIncome>();

const initialIncomeState = IncomeAdaptor.getInitialState();

const incomeReducer = createReducer(
    initialIncomeState,
    on(GetIncomeAction),
    on(LoadIncomeAction, (state, { income }) => IncomeAdaptor.addMany(income, state))
);

export function IncomeReducer(state: IIncomeEntityState | undefined, action: Action): IIncomeEntityState {
    return incomeReducer(state, action);
}
