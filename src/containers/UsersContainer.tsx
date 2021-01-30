import React, { useEffect } from 'react';

import { useAppDispatch, useTypedSelector } from '../app/store';
import { actions as userActions, selectAllUsers } from '../ducks/usersDuck';

const UsersContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useTypedSelector(selectAllUsers);

  useEffect(() => {
    const promise = dispatch(userActions.get());
    return () => {
      promise.abort();
    };
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersContainer;
