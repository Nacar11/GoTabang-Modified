import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadVerificationDialogComponent } from './upload-verification-dialog.component';

describe('UploadVerificationDialogComponent', () => {
  let component: UploadVerificationDialogComponent;
  let fixture: ComponentFixture<UploadVerificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadVerificationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadVerificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
