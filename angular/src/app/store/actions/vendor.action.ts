import { createAction, props } from '@ngrx/store';
import { IVendor } from 'src/app/common/interface';

export enum VendorActionTypes {
    VENDOR_LIST_SUCCESS = 'Vendor list SUCCESS',
    VENDOR_LIST_GET = 'Vendor list GET'
}

export const GetVendorAction = createAction(
    VendorActionTypes.VENDOR_LIST_GET
);

export const LoadVendorAction = createAction(
    VendorActionTypes.VENDOR_LIST_SUCCESS,
    props<{ vendors: IVendor[] }>()
);
