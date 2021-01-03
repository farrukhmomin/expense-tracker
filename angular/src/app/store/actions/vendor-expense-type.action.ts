import { createAction, props } from '@ngrx/store';
import { IVendorExpenseType } from 'src/app/common/interface';

export enum VendorExpenseTypeActionTypes {
    VENDOR_EXPENSE_TYPE_LIST_SUCCESS = 'Vendor Expense Type list SUCCESS',
    VENDOR_EXPENSE_TYPE_LIST_GET = 'Vendor Expense Type list GET'
}

export const GetVendorExpenseTypeAction = createAction(
    VendorExpenseTypeActionTypes.VENDOR_EXPENSE_TYPE_LIST_GET
);

export const SuccessVendorExpenseTypeAction = createAction(
    VendorExpenseTypeActionTypes.VENDOR_EXPENSE_TYPE_LIST_SUCCESS,
    props<{ vendorExpenseType: IVendorExpenseType[] }>()
);
