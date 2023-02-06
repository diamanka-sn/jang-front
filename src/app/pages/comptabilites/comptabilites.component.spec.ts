import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptabilitesComponent } from './comptabilites.component';

describe('ComptabilitesComponent', () => {
  let component: ComptabilitesComponent;
  let fixture: ComponentFixture<ComptabilitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptabilitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptabilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
