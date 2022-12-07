import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPerComponent } from './detail-per.component';

describe('DetailPerComponent', () => {
  let component: DetailPerComponent;
  let fixture: ComponentFixture<DetailPerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
