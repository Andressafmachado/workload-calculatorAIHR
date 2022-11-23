import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Course } from 'src/app/classes/course';
import { History } from 'src/app/classes/history';
import { CoursesService } from 'src/app/services/courses.service';

import { HistoryComponent } from './history.component';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  const _courseServiceSpy = jasmine.createSpyObj<CoursesService>(
    'CoursesService',
    ['getCourses', 'addHistory', 'getHistory']
);

const mockHistory: History = {
  id: 1,
  created: new Date(),
  selectedCourses: 'Course Name',
  totalHours: 10,
  hoursPerWeek: 10,
  startDate: new Date('2022-11-11'),
  endDate: new Date('2023-11-11')
}

const mockCourse: Course = {
  id: 1,
  name: "Course Name",
  hours: 10,
  selected: true
}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryComponent ], providers:[{ provide: CoursesService, useValue: _courseServiceSpy },], imports:[AppModule]
    })
    .compileComponents();

    _courseServiceSpy.addHistory.and.returnValue(of(mockHistory));
    _courseServiceSpy.getHistory.and.returnValue(of([mockHistory]));
    _courseServiceSpy.selectedCourses = [mockCourse];
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('Should return an array of history objects', () => {
      //Arrange
      let form = new History();
      const expectResult = [mockHistory, mockHistory]

      //Act
      component.onSubmit(form);

      //Assert
      expect(component.history).toEqual(expectResult);
    });

});




