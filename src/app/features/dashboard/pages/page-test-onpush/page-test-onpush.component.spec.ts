import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTestOnpushComponent } from './page-test-onpush.component';

describe('PageTestOnpushComponent', () => {
  let component: PageTestOnpushComponent;
  let fixture: ComponentFixture<PageTestOnpushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTestOnpushComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTestOnpushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
