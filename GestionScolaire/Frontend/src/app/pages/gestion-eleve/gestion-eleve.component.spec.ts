import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEleveComponent } from './gestion-eleve.component';

describe('GestionEleveComponent', () => {
  let component: GestionEleveComponent;
  let fixture: ComponentFixture<GestionEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
