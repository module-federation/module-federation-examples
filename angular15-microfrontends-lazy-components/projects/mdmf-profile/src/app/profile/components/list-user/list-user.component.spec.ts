import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { ProfileComponent } from 'projects/mdmf-profile/src/app/profile/components/profile/profile.component';
import { User } from 'projects/mdmf-shared/src/lib/app-state/models/User';
import { UserState } from 'projects/mdmf-shared/src/lib/app-state/state/user.state';
import { MdmfSharedModule } from 'projects/mdmf-shared/src/lib/modules/mdmf-shared.module';
import { ListUserComponent } from './list-user.component';

describe('ListUserShellComponent', () => {
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MdmfSharedModule,
        NgxsModule.forRoot([UserState]),
      ],
      declarations: [ListUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render h2 element', () => {
    const element = fixture.debugElement.nativeElement.querySelector('h2');
    expect(element.textContent).toContain('List users from the shared application state');
  });

  it('should remove an User from the store', () => {
    const user: User = { name: 'Mr. A', email: 'a@company.com' };

    // add User into the store
    const profileComponent = TestBed.createComponent(ProfileComponent).componentInstance;
    profileComponent.addUser(user.name, user.email);
    expect(
      component.getUsers().filter(u => u.name === user.name && u.email === user.email)[0],
    ).toEqual(user);

    // remove the User from the store
    component.removeUser(user);
    expect(component.getUsers().length).toEqual(0);
  });
});
