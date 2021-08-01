import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDesignComponent } from './products-design.component';

describe('ProductsDesignComponent', () => {
  let component: ProductsDesignComponent;
  let fixture: ComponentFixture<ProductsDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
