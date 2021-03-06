import { Course, compareCourses } from '../../model/course';
import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { CoursesActions } from '../courses-type.action';
import { ECoursesAction } from '../course.action';

export interface CoursesState extends EntityState<Course>  {
    areCoursesLoaded: boolean;
    courses: Course[];
}

export const adapter = createEntityAdapter<Course>();

export const initialCourseState = adapter.getInitialState({
    areCoursesLoaded: false,
    courses: undefined
});

export const coursesReducer = (
    state = initialCourseState,
    action: CoursesActions
): CoursesState => {

    switch (action.type) {
        case ECoursesAction.allCoursesLoaded: {
            return adapter.addAll(
                action.payload,
                { ...state, areCoursesLoaded: true }
            );
        }

        case ECoursesAction.courseUpdated: {
            return adapter.updateOne(action.payload, state);
            // return {
            //     ...state,

                 // courses: state.courses.map((value, i) => value.id === action.payload.id ? action.payload : value)
            // };
        }

        default:
            return state;
    }

};

// export interface CoursesState extends EntityState<Course> {
//     areCoursesLoaded: boolean;
// }
//
// export const coursesReducer = (
//     state = initialCourseState,
//     action: CoursesActions
// );
// export const adapter = createEntityAdapter<Course>({
//     sortComparer: compareCourses
// }); // make easy to handle entity format

// export const initialCourseState = adapter.getInitialState({
//     areCoursesLoaded: false
// });

// export const coursesReducer = createReducer(
//     initialCourseState,
//     on(
//         CourseActions.allCoursesLoaded,
//         (state, action) => adapter.addAll(
//             action.payload,
//             { ...state, areCoursesLoaded: true }
//         )
//     ),

//     on(
//         CourseActions.courseUpdated,
//         (state, action) => adapter.updateOne(action.payload, state)
//     )
// );

const selectors = adapter.getSelectors();

export const { selectAll } = selectors;
