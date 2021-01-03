import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IMember, IMemberEntityState } from 'src/app/common/interface';
import { GetMemberAction, LoadMemberAction } from '../../actions/member.action';

export const MemberAdaptor: EntityAdapter<IMember> = createEntityAdapter<IMember>();

const initialMemberState: IMemberEntityState = MemberAdaptor.getInitialState();

const memberReducer = createReducer(
    initialMemberState,
    on(GetMemberAction),
    on(LoadMemberAction, (state, { members }) =>
        MemberAdaptor.addMany(members, state)
    )
);

export function MemberReducer(state: IMemberEntityState | undefined, action: Action): IMemberEntityState {
    return memberReducer(state, action);
}
