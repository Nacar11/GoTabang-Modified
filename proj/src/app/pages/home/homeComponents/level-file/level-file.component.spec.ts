import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelFileComponent } from './level-file.component';

describe('LevelFileComponent', () => {
  let component: LevelFileComponent;
  let fixture: ComponentFixture<LevelFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
