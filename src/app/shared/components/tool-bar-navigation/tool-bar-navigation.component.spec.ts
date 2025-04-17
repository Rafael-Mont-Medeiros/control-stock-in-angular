import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarNavigationComponent } from './tool-bar-navigation.component';

describe('ToolBarNavigationComponent', () => {
  let component: ToolBarNavigationComponent;
  let fixture: ComponentFixture<ToolBarNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolBarNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolBarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
