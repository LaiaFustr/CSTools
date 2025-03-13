import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmdistancesComponent } from './kmdistances.component';

describe('KmdistancesComponent', () => {
  let component: KmdistancesComponent;
  let fixture: ComponentFixture<KmdistancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KmdistancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KmdistancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
