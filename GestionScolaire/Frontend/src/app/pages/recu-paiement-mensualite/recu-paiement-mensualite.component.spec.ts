import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuPaiementMensualiteComponent } from './recu-paiement-mensualite.component';

describe('RecuPaiementMensualiteComponent', () => {
  let component: RecuPaiementMensualiteComponent;
  let fixture: ComponentFixture<RecuPaiementMensualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuPaiementMensualiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuPaiementMensualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
