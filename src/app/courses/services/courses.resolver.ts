import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../../reducers';
import { Store, select } from '@ngrx/store';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { CourseActions } from '../courses-store/courses-type.action';
import { areCoursesLoadedSelector } from '../courses-store/courses.selector';

@Injectable()
export class CoursesResolver implements Resolve<any> {
    loading = false;

    constructor(
        private store: Store<AppState>
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store
            .pipe(
                select(areCoursesLoadedSelector),
                tap(areCoursesLoaded => {
                    if (!this.loading && !areCoursesLoaded) {
                        this.loading = true; // for avoiding two times call loadAllCourses action
                        this.store.dispatch(CourseActions.loadAllCourses());
                    }
                }),
                filter(coursesLoaded => coursesLoaded),
                first(), // will work only if Observable will have status complete
                finalize(() => this.loading = false)
            );
    }
}
