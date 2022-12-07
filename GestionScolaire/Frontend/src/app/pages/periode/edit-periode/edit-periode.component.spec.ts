import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPeriodeComponent } from './edit-periode.component';

describe('EditPeriodeComponent', () => {
  let component: EditPeriodeComponent;
  let fixture: ComponentFixture<EditPeriodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPeriodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
