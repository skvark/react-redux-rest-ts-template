import createRestDuck from '../utils/restDuckGenerator';
import { RootState } from '../app/store';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const { reducer, adapter, actions } = createRestDuck<User>('users');

export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers
} = adapter.getSelectors((state: RootState) => state.users);

export { reducer, actions, adapter };
