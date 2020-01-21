import {Component, OnInit} from '@angular/core';
import {compareCourses, Course} from '../model/course';
import {Observable} from 'rxjs';
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import {MatDialog} from '@angular/material';
import {map, shareReplay} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import { AppState } from '../../reducers';
import { Store, select } from '@ngrx/store';
import {
  selectBeginnerCourses,
  selectAdvancedCourses,
  selectPromoTotal,
  selectAllCourses
 } from '../courses-store/courses.selector';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  promoTotal$: Observable<number>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.store.pipe(
      select(selectBeginnerCourses),
      map(courses => courses.sort((c1, c2) => c1.seqNo - c2.seqNo))
    );

    this.advancedCourses$ = this.store.pipe(
      select(selectAdvancedCourses),
      map(courses => courses.sort((c1, c2) => c1.seqNo - c2.seqNo))
    );

    this.promoTotal$ = this.store.pipe(
      select(selectPromoTotal)
    );
  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }

}
