import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IVendor, IVendorEntityState } from 'src/app/common/interface';
import { VendorAdaptor } from './vendor.reducer';

// get the selectors
const {
    selectAll,
} = VendorAdaptor.getSelectors();


export const selectVendorsFromState = createFeatureSelector<IVendorEntityState>('vendors');
export const getAllVendors = createSelector(selectVendorsFromState, selectAll);

export const getVendorById = createSelector(getAllVendors,
    (vendors: IVendor[], props: { vendorId: number }) => vendors.find(vendor => vendor.id === props.vendorId));
