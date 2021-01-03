import { createAction, props } from '@ngrx/store';
import { IIgnoreTags } from 'src/app/common/interface';

export enum IgnoreTagsActionTypes {
    IGNORE_TAG_LIST_SUCCESS = 'Ignore tags list SUCCESS',
    IGNORE_TAG_LIST_GET = 'Ignore tags list GET'
}

export const GetIgnoreTagsAction = createAction(
    IgnoreTagsActionTypes.IGNORE_TAG_LIST_GET
);

export const LoadIgnoreTagsAction = createAction(
    IgnoreTagsActionTypes.IGNORE_TAG_LIST_SUCCESS,
    props<{ tags: IIgnoreTags[] }>()
);
