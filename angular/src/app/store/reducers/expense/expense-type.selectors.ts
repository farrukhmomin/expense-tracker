import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IExpenseType, IExpenseTypeEntityState } from 'src/app/common/interface';
import { ExpenseTypeAdaptor } from './expense-type.reducer';

// get the selectors
const {
    selectAll,
} = ExpenseTypeAdaptor.getSelectors();


// select the array of users
const allExpenseTypes = selectAll;

export const selectEntityTypeFromState = createFeatureSelector<IExpenseTypeEntityState>('expenseTypes');

export const getAllExpenseTypes = createSelector(selectEntityTypeFromState, allExpenseTypes);

export const getExpenseTypeById = createSelector(getAllExpenseTypes,
    (expenses: IExpenseType[], props: { expenseId: number }) => expenses.find(expense => expense.id === props.expenseId));

export const getExpenseIconByDescription = createSelector(getAllExpenseTypes,
    (expenseTypes: IExpenseType[], props: { desc: string }) => {
        const found = expenseTypes.find((e) => e.name.toLowerCase().indexOf(props.desc.toLowerCase()) > -1);
        return found;
    });
