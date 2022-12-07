import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnneeScolaireComponent } from './edit-annee-scolaire.component';

describe('EditAnneeScolaireComponent', () => {
  let component: EditAnneeScolaireComponent;
  let fixture: ComponentFixture<EditAnneeScolaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnneeScolaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnneeScolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
