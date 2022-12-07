import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeriodeComponent } from './add-periode.component';

describe('AddPeriodeComponent', () => {
  let component: AddPeriodeComponent;
  let fixture: ComponentFixture<AddPeriodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPeriodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
