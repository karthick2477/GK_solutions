import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDesignPageComponent } from './admin-design-page.component';

describe('AdminDesignPageComponent', () => {
  let component: AdminDesignPageComponent;
  let fixture: ComponentFixture<AdminDesignPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDesignPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDesignPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
