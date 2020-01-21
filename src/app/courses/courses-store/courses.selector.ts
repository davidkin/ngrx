import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './reducer';
import * as fromCourses from './reducer/index';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
    selectCoursesState,
    state => state.courses
);

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.promo).length
);

export const areCoursesLoadedSelector = createSelector(
    selectCoursesState,
    state => state.areCoursesLoaded
);
