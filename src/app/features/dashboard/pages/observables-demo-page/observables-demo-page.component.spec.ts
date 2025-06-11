import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservablesDemoPageComponent } from './observables-demo-page.component';

describe('ObservablesDemoPageComponent', () => {
  let component: ObservablesDemoPageComponent;
  let fixture: ComponentFixture<ObservablesDemoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservablesDemoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservablesDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
