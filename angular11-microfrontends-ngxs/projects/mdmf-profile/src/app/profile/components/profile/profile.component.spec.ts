import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule, Store } from '@ngxs/store';
import { User } from 'projects/mdmf-shared/src/lib/app-state/models/User';
import { UserState } from 'projects/mdmf-shared/src/lib/app-state/state/user.state';
import { MdmfSharedModule } from 'projects/mdmf-shared/src/lib/mdmf-shared.module';
import { ProfileComponent } from './profile.component';

describe("ProfileComponent", () => {

  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MdmfSharedModule,
        NgxsModule.forRoot([UserState])
      ],
      declarations: [ProfileComponent],      
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should render h2 element", () => {
    const element = fixture.debugElement.nativeElement.querySelector("h2");
    expect(element.textContent).toContain(
      "Profile (Microfrontend)"
    );
  });

  it("should add an User into the store", () => {
    const user: User = {name: 'Mr. A', email: 'a@company.com'};
    component.addUser(user.name, user.email);
    const users: User[] = component.getUsers();    
    expect(users.filter(u => u.name === user.name && u.email === user.email)[0]).toEqual(user);
  });  

  // it("should add to the store", () => {
  //   const store = TestBed.inject(Store);
  //   // const store = TestBed.inject(UserState);
  //   // @Inject('elementId') private elementId: string
  //   // @Inject userState: UserState;
  //   // const store = TestBed.get(Store);
  //   const fixture = TestBed.createComponent(ProfileComponent);
    
  //   const component = fixture.componentInstance;
  //   component.angForm.controls['name'].setValue('Mr. A');
  //   component.angForm.controls['email'].setValue('a@company.com');
  //   fixture.detectChanges();
  //   const submitButton = fixture.debugElement.query(By.css("button")).nativeElement;
  //   console.log("store before: ", store);
  //   submitButton.click();

  //   // ofActionDispatched();
  //   // console.log("store : ", store);
    
  //   const user: User = {name: 'Mr. A', email: 'a@company.com'};
  //   // store.add(new AddUser(user));

  //   console.log("store : ", store);

  //   // const users: User[] = store.selectSnapshot<User []>(state => state.users.users);

    
  //   // expect(users.includes(user)).toBeTruthy();

    
  //   // btn btn-primary
  //   // angForm
  //   // el.querySelector('button').click();
  //   // component.createForm();
  //   // component.addUser()
  //   // expect(element.textContent).toContain(
  //   //   "Profile (Microfrontend)"
  //   // );
  // });

});

