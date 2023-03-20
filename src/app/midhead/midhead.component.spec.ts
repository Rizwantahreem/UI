import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidheadComponent } from './midhead.component';

describe('MidheadComponent', () => {
  let component: MidheadComponent;
  let fixture: ComponentFixture<MidheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
