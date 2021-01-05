import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IIncome, IIncomeEntityState, IVendor } from 'src/app/common/interface';
import { IncomeAdaptor } from './income.reducer';

const { selectAll } = IncomeAdaptor.getSelectors();

export const selectIncomeFromState = createFeatureSelector<IIncomeEntityState>('income');

export const getAllIncome = createSelector(selectIncomeFromState, selectAll);

export const getIncomeByMonth = createSelector(
    getAllIncome, (allIncome: IIncome[], props: { month: number }) => allIncome.filter((income) => {
        return new Date(income.dated).getMonth() + 1 === props.month;
    }));

export const getIncomeTotalForCurrentMonth = createSelector(
    getIncomeByMonth, (income: IIncome[]) => income.reduce((total, item) => total + (+item.amount), 0));
