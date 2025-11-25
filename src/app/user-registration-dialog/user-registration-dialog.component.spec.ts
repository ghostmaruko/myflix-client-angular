import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationDialogComponent } from './user-registration-dialog.component';

describe('UserRegistrationDialogComponent', () => {
  let component: UserRegistrationDialogComponent;
  let fixture: ComponentFixture<UserRegistrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRegistrationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
