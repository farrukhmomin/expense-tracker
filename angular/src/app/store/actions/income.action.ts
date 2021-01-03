import { createAction, props } from '@ngrx/store';
import { IIncome } from 'src/app/common/interface';

export enum IncomeActionType {
    GetIncomeAction = 'Get Income',
    LoadIncomeAction = 'Load Income'
}

export const GetIncomeAction = createAction(IncomeActionType.GetIncomeAction);

export const LoadIncomeAction = createAction(IncomeActionType.LoadIncomeAction, props<{ income: IIncome[] }>());
