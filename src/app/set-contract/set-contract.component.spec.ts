import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetContractComponent } from './set-contract.component';

describe('SetContractComponent', () => {
  let component: SetContractComponent;
  let fixture: ComponentFixture<SetContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
