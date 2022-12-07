import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMensualiteComponent } from './add-mensualite.component';

describe('AddMensualiteComponent', () => {
  let component: AddMensualiteComponent;
  let fixture: ComponentFixture<AddMensualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMensualiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMensualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
