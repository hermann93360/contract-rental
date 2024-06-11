import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPickerComponent } from './car-picker.component';

describe('CarPickerComponent', () => {
  let component: CarPickerComponent;
  let fixture: ComponentFixture<CarPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
