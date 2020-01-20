import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { tap, concatMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CourseActions } from './courses-type.action';
import { CoursesHttpService } from '../services/courses-http.service';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesHttpService
    ) {}

    @Effect()
    loadCourses$ = this.actions$
        .pipe(
            ofType(CourseActions.loadAllCourses),
            concatMap(action => this.coursesService.findAllCourses()),
            map(courses => CourseActions.allCoursesLoaded( { payload: courses } ))
        );

    @Effect({ dispatch: false })
    saveCourse$ = this.actions$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap(action =>
            this.coursesService.saveCourse(action.payload.id, action.payload.changes)
        ), // work if only previouse action was finished
    );
}
