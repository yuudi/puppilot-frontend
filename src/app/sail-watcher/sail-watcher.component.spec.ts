import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SailWatcherComponent } from './sail-watcher.component';

describe('SailWatcherComponent', () => {
  let component: SailWatcherComponent;
  let fixture: ComponentFixture<SailWatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SailWatcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SailWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
