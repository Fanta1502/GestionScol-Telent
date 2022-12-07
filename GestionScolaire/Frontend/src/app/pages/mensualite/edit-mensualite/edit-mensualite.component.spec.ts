import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMensualiteComponent } from './edit-mensualite.component';

describe('EditMensualiteComponent', () => {
  let component: EditMensualiteComponent;
  let fixture: ComponentFixture<EditMensualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMensualiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMensualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
