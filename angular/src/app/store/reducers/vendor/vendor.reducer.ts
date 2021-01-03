import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IVendor, IVendorEntityState } from 'src/app/common/interface';
import { GetVendorAction, LoadVendorAction } from '../../actions/vendor.action';

export const VendorAdaptor: EntityAdapter<IVendor> = createEntityAdapter<IVendor>();
const initialVendorState: IVendorEntityState = VendorAdaptor.getInitialState();

const vendorReducer = createReducer(
    initialVendorState,
    on(GetVendorAction),
    on(LoadVendorAction, (state, { vendors }) => VendorAdaptor.addMany(vendors, state))
);

export function VendorReducer(state: IVendorEntityState | undefined, action: Action): IVendorEntityState {
    return vendorReducer(state, action);
}
