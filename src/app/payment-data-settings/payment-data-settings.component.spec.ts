import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDataSettingsComponent } from './payment-data-settings.component';

describe('PaymentDataSettingsComponent', () => {
  let component: PaymentDataSettingsComponent;
  let fixture: ComponentFixture<PaymentDataSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDataSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentDataSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
