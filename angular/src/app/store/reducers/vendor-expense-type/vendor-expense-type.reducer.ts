import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IVendorExpenseType, IVendorExpenseTypeEntityState } from 'src/app/common/interface';
import { GetVendorExpenseTypeAction, SuccessVendorExpenseTypeAction } from '../../actions/vendor-expense-type.action';

export const VendorExpenseTypeAdaptor: EntityAdapter<IVendorExpenseType> = createEntityAdapter<IVendorExpenseType>();

const initialVendorExpenseTypeState: IVendorExpenseTypeEntityState = VendorExpenseTypeAdaptor.getInitialState();

const vendorExpenseTypeReducer = createReducer(
    initialVendorExpenseTypeState,
    on(GetVendorExpenseTypeAction),
    on(SuccessVendorExpenseTypeAction, (state, { vendorExpenseType }) =>
        VendorExpenseTypeAdaptor.addMany(vendorExpenseType, state)
    )
);

export function VendorExpenseTypeReducer(state: IVendorExpenseTypeEntityState | undefined, action: Action): IVendorExpenseTypeEntityState {
    return vendorExpenseTypeReducer(state, action);
}
