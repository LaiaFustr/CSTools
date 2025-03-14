import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DscalculatorComponent } from './dscalculator.component';

describe('DscalculatorComponent', () => {
  let component: DscalculatorComponent;
  let fixture: ComponentFixture<DscalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DscalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DscalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
