import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListUserProfileComponent } from './list-user-profile.component';



describe("HomeComponent", () => {
  let component: ListUserProfileComponent;
  let fixture: ComponentFixture<ListUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUserProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
