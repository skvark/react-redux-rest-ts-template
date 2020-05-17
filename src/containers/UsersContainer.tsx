import React from "react";

import { useAppDispatch, useTypedSelector } from "../app/store";
import { actions as userActions } from "../ducks/usersDuck";

const UsersContainer: React.FC = () => {
  const { users } = useTypedSelector(state => state);
  const dispatch = useAppDispatch()

  return (
    <div>
      <button onClick={() => dispatch(userActions.get(""))}>
        Get users
      </button>
      <ul>
        {users.ids.map(id => 
          <li key={users.entities[id]?.id}>{users.entities[id]?.email}</li>
        )}
      </ul>
    </div>
  )
}

export default UsersContainer;
