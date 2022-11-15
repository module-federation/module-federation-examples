import * as React from 'react';
import { FunctionComponent } from 'react';

import './list-user-style.css';

export interface IUser { 
  name: string,
  email: string
}

export interface IListUserProps {
  users: Array<IUser>;
  onClick: (IUser) => void;
}

export const ListUserReactComponent: FunctionComponent<IListUserProps> = (props: IListUserProps) => {

  const removeUser = (userToRemove: IUser) => {
    props.onClick(userToRemove);
  };


  return (
    <div className="container">
      {
       props.users.length ? (<table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {props.users.map((user, i) =>
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => removeUser(user)}>Remove User</button>
                  </td>
                </tr>)}
            </tbody>
          </table>): <h3 className='empty-list-message'>----- Create user to see data here -----</h3> 
      } </div>);
}
