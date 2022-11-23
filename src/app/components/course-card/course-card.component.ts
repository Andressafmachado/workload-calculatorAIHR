import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/classes/course';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  courses!: Course[];
  private openSubscriptions: Subscription[] = [];

  constructor(
    private coursesService: CoursesService,
  ) { }

  ngOnInit() {
    this.coursesService.getCourses().subscribe(data => {
      data.map((course: Course) => {
        course.selected = false;
      })
      this.courses = data;
    });
  }

  ngOnDestroy() {
    this.openSubscriptions.forEach((s) => s.unsubscribe())
    };

  manageSelectedCourses(course: Course):void {
    const index = this.coursesService.selectedCourses.map(c => c.id).indexOf(course.id);
    if (index >= 0) {
      this.coursesService.selectedCourses.splice(this.coursesService.selectedCourses.map(c => JSON.parse(JSON.stringify(c)).id).indexOf(course.id), 1);
      course.selected = false;
    } else {
      course.selected = true;
      this.coursesService.selectedCourses.push(course);
    }
  }
}
