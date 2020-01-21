import { createAction, props, Action } from '@ngrx/store';
import { Course } from '../model/course';
import { Update } from '@ngrx/entity';

export enum ECoursesAction {
    loadAllCourses = '[Courses Resolver] Load All Courses',
    allCoursesLoaded = '[Load Courses Effect] All Courses Loaded',
    courseUpdated = '[Edit Course Dialog] Course Updated',
}

export class LoadAllCourses implements Action {
    public readonly type = ECoursesAction.loadAllCourses;
}

export class AllCoursesLoaded implements Action {
    public readonly type = ECoursesAction.allCoursesLoaded;
    constructor(public payload: Course[]) {}
}

export class CourseUpdated implements Action {
    public readonly type = ECoursesAction.courseUpdated;
    constructor(public payload: Course) {}
}


// export const loadAllCourses = createAction(
//     '[Courses Resolver] Load All Courses',
// );

// export const allCoursesLoaded = createAction(
//     '[Load Courses Effect] All Courses Loaded',
//     props<{ payload: Course[] }>()
// );

// export const courseUpdated = createAction(
//     '[Edit Course Dialog] Course Updated',
//     props<{ payload: Update<Course> }>() // handle payload change by id in entity format
// );
