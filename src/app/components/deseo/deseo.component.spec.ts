import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeseoComponent } from './deseo.component';

describe('DeseoComponent', () => {
  let component: DeseoComponent;
  let fixture: ComponentFixture<DeseoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeseoComponent]
    });
    fixture = TestBed.createComponent(DeseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
