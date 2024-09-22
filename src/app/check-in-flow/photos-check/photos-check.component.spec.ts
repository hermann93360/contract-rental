import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosCheckComponent } from './photos-check.component';

describe('PhotosCheckComponent', () => {
  let component: PhotosCheckComponent;
  let fixture: ComponentFixture<PhotosCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotosCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
