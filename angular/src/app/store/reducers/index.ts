import { ActionReducerMap } from '@ngrx/store';
import {
    IVendorEntityState, IExpenseTypeEntityState, IVendorExpenseTypeEntityState, IIncomeEntityState,
    IExpenseEntityState, IMemberEntityState, IIgnoreTagsEntityState
} from 'src/app/common/interface';
import { ExpenseTypeReducer } from './expense/expense-type.reducer';
import { ExpenseReducer } from './expense/expense.reducer';
import { IncomeReducer } from './income/income.reducer';
import { MemberReducer } from './member/member.reducer';
import { IgnoreTagsReducer } from './tags/ignore-tags.reducer';
import { VendorExpenseTypeReducer } from './vendor-expense-type/vendor-expense-type.reducer';
import { VendorReducer } from './vendor/vendor.reducer';

export interface IStoreState {
    vendors: IVendorEntityState;
    expense: IExpenseTypeEntityState;
    vendorExpenseType: IVendorExpenseTypeEntityState;
    income: IIncomeEntityState;
    expenses: IExpenseEntityState;
    members: IMemberEntityState;
    ignoreTags: IIgnoreTagsEntityState;
}

export const storeState: ActionReducerMap<IStoreState> = {
    vendors: VendorReducer,
    expense: ExpenseTypeReducer,
    vendorExpenseType: VendorExpenseTypeReducer,
    income: IncomeReducer,
    expenses: ExpenseReducer,
    members: MemberReducer,
    ignoreTags: IgnoreTagsReducer
};
