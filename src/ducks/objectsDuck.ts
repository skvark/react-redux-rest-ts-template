import createRestDuck from './restDuckGenerator';
import { RootState } from '../app/store';

export interface Data {
  color: string;
  capacity: string;
}

export interface Object {
  id: string;
  name: string;
  data: Data;
}

const { reducer, adapter, actions } = createRestDuck<Object>('objects');

export const {
  selectById: selectObjectById,
  selectIds: selectObjectIds,
  selectEntities: selectObjectEntities,
  selectAll: selectAllObjects,
  selectTotal: selectTotalObjects
} = adapter.getSelectors((state: RootState) => state.objects);

export { reducer, actions, adapter };
