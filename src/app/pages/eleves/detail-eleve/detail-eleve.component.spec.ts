import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEleveComponent } from './detail-eleve.component';

describe('DetailEleveComponent', () => {
  let component: DetailEleveComponent;
  let fixture: ComponentFixture<DetailEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
