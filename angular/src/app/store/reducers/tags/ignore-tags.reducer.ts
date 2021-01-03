import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IIgnoreTags, IIgnoreTagsEntityState } from 'src/app/common/interface';
import { GetIgnoreTagsAction, LoadIgnoreTagsAction } from '../../actions/ignore-tags.action';

export const IgnoreTagsAdaptor: EntityAdapter<IIgnoreTags> = createEntityAdapter<IIgnoreTags>();

const initialIgnoreTagsState: IIgnoreTagsEntityState = IgnoreTagsAdaptor.getInitialState();

const ignoreTagsReducer = createReducer(
    initialIgnoreTagsState,
    on(GetIgnoreTagsAction),
    on(LoadIgnoreTagsAction, (state, { tags }) =>
        IgnoreTagsAdaptor.addMany(tags, state)
    )
);

export function IgnoreTagsReducer(state: IIgnoreTagsEntityState | undefined, action: Action): IIgnoreTagsEntityState {
    return ignoreTagsReducer(state, action);
}
