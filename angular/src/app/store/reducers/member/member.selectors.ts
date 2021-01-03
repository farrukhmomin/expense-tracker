import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMember, IMemberEntityState } from 'src/app/common/interface';
import { MemberAdaptor } from './member.reducer';

// get the selectors
const {
    selectAll,
} = MemberAdaptor.getSelectors();


export const selectMemberFromState = createFeatureSelector<IMemberEntityState>('members');
export const getAllMember = createSelector(selectMemberFromState, selectAll);

export const getMemberById = createSelector(getAllMember,
    (members: IMember[], props: { memberId: number }) => members.find(member => member.id === props.memberId));
