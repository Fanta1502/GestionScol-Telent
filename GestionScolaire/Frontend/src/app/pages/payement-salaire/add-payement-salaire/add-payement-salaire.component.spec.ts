import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayementSalaireComponent } from './add-payement-salaire.component';

describe('AddPayementSalaireComponent', () => {
  let component: AddPayementSalaireComponent;
  let fixture: ComponentFixture<AddPayementSalaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPayementSalaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayementSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
