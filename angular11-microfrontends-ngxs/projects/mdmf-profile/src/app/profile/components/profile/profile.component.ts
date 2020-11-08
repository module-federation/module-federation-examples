import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddUser } from 'projects/mdmf-shared/src/lib/app-state/actions/user.action';


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  angForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ]
   });
  }

  addUser(name, email) {
    this.store.dispatch(new AddUser({ name, email}));
  }

  ngOnInit(): void {}
}
