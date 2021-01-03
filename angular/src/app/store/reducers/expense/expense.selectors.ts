import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IExpense, IExpenseEntityState } from 'src/app/common/interface';
import { ExpenseAdaptor } from './expense.reducer';

// get the selectors
const {
    selectAll,
} = ExpenseAdaptor.getSelectors();


// select the array of users
const allExpenses = selectAll;

export const selectExpenseFromState = createFeatureSelector<IExpenseEntityState>('expenses');

export const getAllExpenses = createSelector(selectExpenseFromState, allExpenses);


export const getExpensesByMemberId = createSelector(allExpenses,
    (expenses: IExpense[], props: { memberId: number }) => expenses.find(expense => expense.member_id === props.memberId));

export const getAllExpenseByMonth = createSelector(getAllExpenses,
    (expenses: IExpense[], props: { month: number }) => expenses.filter((e) => new Date(e.dated).getMonth() + 1 === props.month));

export const getExpenseByVendorId = createSelector(getAllExpenseByMonth,
    (expenses: IExpense[], props: { month: number, vendorId: number }) => expenses.filter(expense => expense.vendor_id === props.vendorId));

export const getExpenseByVendorIdForDay = createSelector(getAllExpenseByMonth,
    (expenses: IExpense[], props: { month: number, vendorId: number, day: number }) =>
        expenses.filter(expense => new Date(expense.dated).getDate() === props.day));

export const getExpenseByForDay = createSelector(getAllExpenseByMonth,
    (expenses: IExpense[], props: { month: number, day: number }) =>
        expenses.filter(expense => new Date(expense.dated).getDate() === props.day));
