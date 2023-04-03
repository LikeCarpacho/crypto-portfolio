import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHoldingComponent } from './update-holding.component';

describe('UpdateHoldingComponent', () => {
  let component: UpdateHoldingComponent;
  let fixture: ComponentFixture<UpdateHoldingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHoldingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
