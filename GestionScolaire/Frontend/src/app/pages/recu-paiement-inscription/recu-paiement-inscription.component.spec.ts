import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuPaiementInscriptionComponent } from './recu-paiement-inscription.component';

describe('RecuPaiementInscriptionComponent', () => {
  let component: RecuPaiementInscriptionComponent;
  let fixture: ComponentFixture<RecuPaiementInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuPaiementInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuPaiementInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
