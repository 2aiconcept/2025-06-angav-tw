import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsDemoPageComponent } from './signals-demo-page.component';

describe('SignalsDemoPageComponent', () => {
  let component: SignalsDemoPageComponent;
  let fixture: ComponentFixture<SignalsDemoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsDemoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
