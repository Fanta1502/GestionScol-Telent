import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDepComponent } from './detail-dep.component';

describe('DetailDepComponent', () => {
  let component: DetailDepComponent;
  let fixture: ComponentFixture<DetailDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
