import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getKeyValues } from 'src/app/common/helper-functions';
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



// namespace: monthly filters
export const getAllExpenseByMonth = createSelector(getAllExpenses,
    (expenses: IExpense[], props: { month: number }) => expenses.filter((e) => new Date(e.dated).getMonth() + 1 === props.month));

export const getAllExpenseTotalByMonth = createSelector(getAllExpenseByMonth,
    (expenses: IExpense[], props: { month: number }) =>
        expenses.reduce((total, expense) => total + expense.expense_total, 0)
);

export const getExpenseForMonthFilterByCol = createSelector(getAllExpenseByMonth,
    (expenses: IExpense[], props: { month: number, column: keyof IExpense, columnValue: string }) =>
        expenses.filter(expense => getKeyValues<IExpense>(expense, props.column).indexOf(props.columnValue) >= 0));

export const getExpenseTotalForMonthFilterByCol = createSelector(getExpenseForMonthFilterByCol,
    (expenses: IExpense[], props: { month: number, column: keyof IExpense, columnValue: string }) =>
        expenses.reduce((total, expense) => total + expense.expense_total, 0)
);

export const getExpenseByVendorIdInMonth = createSelector(getAllExpenseByMonth,
    (expenses: IExpense[], props: { month: number, vendorId: number }) => expenses.filter(expense => expense.vendor_id === props.vendorId));

export const getExpenseByVendorIdForDayInMonth = createSelector(getAllExpenseByMonth,
    (expenses: IExpense[], props: { month: number, vendorId: number, day: number }) =>
        expenses.filter(expense => new Date(expense.dated).getDate() === props.day));

export const getExpenseByForDayInMonth = createSelector(getAllExpenseByMonth,
    (expenses: IExpense[], props: { month: number, day: number }) =>
        expenses.filter(expense => new Date(expense.dated).getDate() === props.day));

export const getExpenseForMonthByTag = createSelector(getAllExpenseByMonth,
    (expenses: IExpense[], props: { month: number, tag: string }) =>
        expenses.filter(expense => expense.tags.indexOf(props.tag) >= 0));

// end monthly filters
