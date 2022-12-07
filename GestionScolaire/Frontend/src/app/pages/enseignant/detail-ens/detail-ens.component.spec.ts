import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEnsComponent } from './detail-ens.component';

describe('DetailEnsComponent', () => {
  let component: DetailEnsComponent;
  let fixture: ComponentFixture<DetailEnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
