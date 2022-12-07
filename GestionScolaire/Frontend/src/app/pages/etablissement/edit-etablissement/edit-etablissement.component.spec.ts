import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEtablissementComponent } from './edit-etablissement.component';

describe('EditEtablissementComponent', () => {
  let component: EditEtablissementComponent;
  let fixture: ComponentFixture<EditEtablissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEtablissementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
