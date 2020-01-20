import { Course, compareCourses } from '../../model/course';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../courses-type.action';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface CoursesState extends EntityState<Course> {
    areCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
}); // make easy to handle entity format

export const initialCOurseState = adapter.getInitialState({
    areCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialCOurseState,
    on(
        CourseActions.allCoursesLoaded,
        (state, action) => adapter.addAll(
            action.payload,
            { ...state, areCoursesLoaded: true }
        )
    ),

    on(
        CourseActions.courseUpdated,
        (state, action) => adapter.updateOne(action.payload, state)
    )
);

const selectors = adapter.getSelectors();

export const { selectAll } = selectors;
