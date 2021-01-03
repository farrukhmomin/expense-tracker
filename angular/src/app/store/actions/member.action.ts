import { createAction, props } from '@ngrx/store';
import { IMember } from 'src/app/common/interface';

export enum MemberActionTypes {
    MEMBER_LIST_SUCCESS = 'Member list SUCCESS',
    MEMBER_LIST_GET = 'Member list GET'
}

export const GetMemberAction = createAction(
    MemberActionTypes.MEMBER_LIST_GET
);

export const LoadMemberAction = createAction(
    MemberActionTypes.MEMBER_LIST_SUCCESS,
    props<{ members: IMember[] }>()
);
