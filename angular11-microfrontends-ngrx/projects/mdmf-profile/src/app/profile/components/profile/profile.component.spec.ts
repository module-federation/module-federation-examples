import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { User } from 'projects/mdmf-shared/src/lib/app-state/models/User';
import { MdmfSharedModule } from 'projects/mdmf-shared/src/lib/modules/mdmf-shared.module';
import { ProfileComponent } from './profile.component';
import { ROOT_REDUCERS, metaReducers } from 'projects/mdmf-shared/src/lib/app-state/reducer';


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
          runtimeChecks: {
            // strictStateImmutability and strictActionImmutability are enabled by default
            strictStateSerializability: true,
            strictActionSerializability: true,
            strictActionWithinNgZone: true,
            strictActionTypeUniqueness: true,
          },
        }),
      ],
      declarations: [ProfileComponent],
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
    expect(element.textContent).toContain(
      'Profile (Microfrontend)'
    );
  });

  it('should add an User into the store', () => {
    const user: User = {name: 'Mr. A', email: 'a@company.com'};
    component.addUser(user.name, user.email);
    const users: User[] = component.getUsers();
    expect(users.filter(u => u.name === user.name && u.email === user.email)[0]).toEqual(user);
  });

});
