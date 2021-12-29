import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { ProfileComponent } from 'projects/mdmf-profile/src/app/profile/components/profile/profile.component';
import { User } from 'projects/mdmf-shared/src/lib/app-state/models/User';
import { MdmfSharedModule } from 'projects/mdmf-shared/src/lib/modules/mdmf-shared.module';
import { ListUserComponent } from './list-user.component';
import { ROOT_REDUCERS, metaReducers } from 'projects/mdmf-shared/src/lib/app-state/reducer';

describe('ListUserShellComponent', () => {
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;

  const initialState = { users: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MdmfSharedModule,
        StoreModule.forRoot(ROOT_REDUCERS, {
          metaReducers,
        }),
      ],
      providers: [],
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

  xit('should remove an User from the store', async () => {
    const user: User = { name: 'Mr. A', email: 'a@company.com' };

    // add User into the store
    const profileComponent = TestBed.createComponent(ProfileComponent).componentInstance;
    profileComponent.addUser(user.name, user.email);
    // fixture.detectChanges();
    const usersAdded = await component.users.pipe(take(1)).toPromise();
    expect(usersAdded.filter(u => u.name === user.name && u.email === user.email)[0]).toEqual(user);

    // remove the User from the store
    component.removeUser(user);
    // fixture.detectChanges();
    const usersRemoved = await component.users.pipe(take(1)).toPromise();
    expect(usersRemoved.length).toEqual(0);
  });
});
