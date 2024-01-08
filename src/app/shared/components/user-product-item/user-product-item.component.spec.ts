import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductItemComponent } from './user-product-item.component';

describe('UserProductItemComponent', () => {
  let component: UserProductItemComponent;
  let fixture: ComponentFixture<UserProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProductItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
