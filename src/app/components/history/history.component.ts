import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { History } from 'src/app/classes/history';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  hoursPerWeek!: number;
  totalHours!: number;
  weeks!: number;
  private openSubscriptions: Subscription[] = []

  constructor(private coursesService: CoursesService) { }
  history: History[] = [];

  ngOnInit(): void {
    this.coursesService.getHistory().subscribe(data => {
      this.history = data
    })
  };

  ngOnDestroy() {
    this.openSubscriptions.forEach((s) => s.unsubscribe())
    };

  onSubmit(form: History) {
    this.calculate(form);
    this.coursesService.addHistory(form).subscribe((data) => {
      this.history = [...this.history, data];
    });
  };

  calculate(form: History) {
    form.created = new Date;
    form.selectedCourses = (this.coursesService.selectedCourses.map(c => c.name)).toString();
    form.totalHours = this.coursesService.selectedCourses.map(c => c.hours).reduce((total, hours) => total + hours, 0);
    this.weeks = this.getWeeksDiff(form);
    form.hoursPerWeek = Math.floor((form.totalHours! / this.weeks) + 0.5);
    this.hoursPerWeek = form.hoursPerWeek;
    this.totalHours = form.totalHours;
  }

  getWeeksDiff(form: History) {
    const weekInMiliseconds = 1000 * 60 * 60 * 24 * 7;
    const startDate: number = (new Date(form.startDate)).getTime();
    const endDate: number = (new Date(form.endDate)).getTime();
    return Math.round(Math.abs(startDate - endDate) / weekInMiliseconds);
  }
}
