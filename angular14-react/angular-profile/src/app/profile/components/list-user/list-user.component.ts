import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RemoveUser } from '../../user-state/actions/user.action';
import { IUser } from '../../user-state/models/User';

const containerElementName = 'customReactComponentContainer';

@Component({
  selector: 'app-list-user',
  template: ` <h2 style="color: cadetblue">User List (React Microfrontend)</h2>
    <div style="font-family: Inter, sans-serif; color: rgb(140, 137, 137, 1); font-size: 13px">
      This user list component is being remotely loaded into the application from React App using
      Webpack Module Federation
    </div>
    <span #${containerElementName}></span>`,
  encapsulation: ViewEncapsulation.None,
})
export class ListUserComponent {
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;
  root!: any;

  constructor(private store: Store) {
    this.handleClicked = this.handleClicked.bind(this);
  }

  handleClicked(user: IUser) {
    this.removeUser(user.name, user.email);
  }

  removeUser(name: string, email: string): void {
    this.store.dispatch(new RemoveUser({ name, email } as IUser));
  }

  ngAfterViewInit() {
    this.root = createRoot(this.containerRef.nativeElement);
    this.root.render('Loading script...');
    try {
      import('list_user/ListUserReactComponent').then(val => {
        this.store
          .select<IUser[]>(state => state.users.users)
          .subscribe(users => {
            this.root.render(
              React.createElement(val.ListUserReactComponent, {
                users,
                onClick: this.handleClicked,
              }),
            );
          });
      });
    } catch (error) {
      console.log('Erorr', error);
    }
  }

  ngOnDestroy() {
    this.root.unmountComponentAtNode(this.containerRef.nativeElement);
  }
}
