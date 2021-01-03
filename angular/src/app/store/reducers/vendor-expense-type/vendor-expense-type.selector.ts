import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IVendorExpenseType, IVendorExpenseTypeEntityState } from 'src/app/common/interface';
import { VendorExpenseTypeAdaptor } from './vendor-expense-type.reducer';

const {
    selectAll
} = VendorExpenseTypeAdaptor.getSelectors();

export const selectVendorExpenseTypeFromState = createFeatureSelector<IVendorExpenseTypeEntityState>('vendorExpenseType');

export const getAllVendorExpenseType = createSelector(selectVendorExpenseTypeFromState, selectAll);
export const getVenderExpenseTypesByVendorId = createSelector(getAllVendorExpenseType,
    (vendorExpenseType: IVendorExpenseType[], props: { vendorId: number }) =>
        vendorExpenseType.find((types) => types.vendor_id === props.vendorId));
