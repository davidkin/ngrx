import { createAction, props } from '@ngrx/store';
import { Course } from '../model/course';
import { Update } from '@ngrx/entity';

export const loadAllCourses = createAction(
    '[Courses Resolver] Load All Courses',
);

export const allCoursesLoaded = createAction(
    '[Load Courses Effect] All Courses Loaded',
    props<{ payload: Course[] }>()
);

export const courseUpdated = createAction(
    '[Edit Course Dialog] Course Updated',
    props<{ payload: Update<Course> }>() // handle payload change by id in entity format
);
