import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentEleveComponent } from './parent-eleve.component';

describe('ParentEleveComponent', () => {
  let component: ParentEleveComponent;
  let fixture: ComponentFixture<ParentEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentEleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
