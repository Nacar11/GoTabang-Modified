import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDamageDialogComponent } from './upload-damage-dialog.component';

describe('UploadVerificationDialogComponent', () => {
  let component: UploadDamageDialogComponent;
  let fixture: ComponentFixture<UploadDamageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDamageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDamageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
