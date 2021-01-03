import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IIgnoreTagsEntityState } from 'src/app/common/interface';
import { IgnoreTagsAdaptor } from './ignore-tags.reducer';

// get the selectors
const {
    selectAll,
} = IgnoreTagsAdaptor.getSelectors();


export const selectIgnoreTagsFromState = createFeatureSelector<IIgnoreTagsEntityState>('ignoreTags');
export const getAllIgnoreTags = createSelector(selectIgnoreTagsFromState, selectAll);

