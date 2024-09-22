import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlemishesComponent } from './blemishes.component';

describe('BlemishesComponent', () => {
  let component: BlemishesComponent;
  let fixture: ComponentFixture<BlemishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlemishesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlemishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
