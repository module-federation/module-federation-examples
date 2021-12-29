import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { User } from 'projects/mdmf-shared/src/lib/app-state/models/User';
import { MdmfSharedModule } from 'projects/mdmf-shared/src/lib/modules/mdmf-shared.module';
import { ProfileComponent } from './profile.component';
import { ROOT_REDUCERS, metaReducers } from 'projects/mdmf-shared/src/lib/app-state/reducer';
import { first } from 'rxjs/operators';
import { ListUserComponent } from '../list-user/list-user.component';
import { selectUsers } from 'projects/mdmf-shared/src/lib/app-state/reducer';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

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
      declarations: [ProfileComponent, ListUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render h2 element', () => {
    const element = fixture.debugElement.nativeElement.querySelector('h2');
    expect(element.textContent).toContain('Profile (Microfrontend)');
  });

  xit('should add an User into the store', async () => {
    const user: User = { name: 'Mr. A', email: 'a@company.com' };
    component.addUser(user.name, user.email);
    const usersAdded = await component.users.pipe(first()).toPromise();
    fixture.detectChanges();
    console.log('🚀 ~ file: profile.component.spec.ts ~ line 1 ~ it ~ usersAdded', usersAdded);
    expect(usersAdded.filter(u => u.name === user.name && u.email === user.email)[0]).toEqual(user);
  });
});
