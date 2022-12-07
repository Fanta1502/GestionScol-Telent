import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensualiteComponent } from './mensualite.component';

describe('MensualiteComponent', () => {
  let component: MensualiteComponent;
  let fixture: ComponentFixture<MensualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensualiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
