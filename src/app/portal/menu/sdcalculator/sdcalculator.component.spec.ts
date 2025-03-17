import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdcalculatorComponent } from './sdcalculator.component';

describe('SdcalculatorComponent', () => {
  let component: SdcalculatorComponent;
  let fixture: ComponentFixture<SdcalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdcalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SdcalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
