import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayementSalaireComponent } from './edit-payement-salaire.component';

describe('EditPayementSalaireComponent', () => {
  let component: EditPayementSalaireComponent;
  let fixture: ComponentFixture<EditPayementSalaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPayementSalaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPayementSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
