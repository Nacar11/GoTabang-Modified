import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDisasterComponent } from './post-disaster.component';

describe('PostDisasterComponent', () => {
  let component: PostDisasterComponent;
  let fixture: ComponentFixture<PostDisasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDisasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDisasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
