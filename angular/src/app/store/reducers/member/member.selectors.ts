import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMember, IMemberEntityState } from 'src/app/common/interface';
import { MemberAdaptor } from './member.reducer';

// get the selectors
const {
    selectAll,
} = MemberAdaptor.getSelectors();


// select the array of users
const allMembers = selectAll;

export const selectMemberFromState = createFeatureSelector<IMemberEntityState>('members');
export const getAllMember = createSelector(selectMemberFromState, allMembers);

export const getMemberById = createSelector(getAllMember,
    (members: IMember[], props: { memberId: number }) => members.filter(member => member.id === props.memberId));
