import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { tap, concatMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CoursesActions } from './courses-type.action';
import { CoursesHttpService } from '../services/courses-http.service';
import { ECoursesAction, LoadAllCourses, AllCoursesLoaded, CourseUpdated } from './course.action';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesHttpService
    ) {}

    @Effect()
    loadCourses$ = this.actions$
        .pipe(
            ofType<LoadAllCourses>(ECoursesAction.loadAllCourses),
            concatMap(() => this.coursesService.findAllCourses()),
            map(courses => new AllCoursesLoaded(courses) )
        );

    @Effect({ dispatch: false })
    saveCourse$ = this.actions$.pipe(
        ofType<CourseUpdated>(ECoursesAction.courseUpdated),
        concatMap(action =>
            this.coursesService.saveCourse(action.payload.id, action.payload.changes)
        ), // work if only previouse action was finished
    );
}
