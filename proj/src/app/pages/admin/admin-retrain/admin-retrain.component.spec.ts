import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRetrainComponent } from './admin-retrain.component';

describe('AdminRetrainComponent', () => {
  let component: AdminRetrainComponent;
  let fixture: ComponentFixture<AdminRetrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRetrainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRetrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
