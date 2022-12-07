import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementSalaireComponent } from './payement-salaire.component';

describe('PayementSalaireComponent', () => {
  let component: PayementSalaireComponent;
  let fixture: ComponentFixture<PayementSalaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayementSalaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayementSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
