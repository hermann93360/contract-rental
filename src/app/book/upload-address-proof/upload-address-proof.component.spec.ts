import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAddressProofComponent } from './upload-address-proof.component';

describe('UploadAddressProofComponent', () => {
  let component: UploadAddressProofComponent;
  let fixture: ComponentFixture<UploadAddressProofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadAddressProofComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadAddressProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
