import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../app/store';
import { actions as objectActions, selectAllObjects } from '../ducks/objectsDuck';

const ObjectsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const objects = useAppSelector(selectAllObjects);

  useEffect(() => {
    const promise = dispatch(objectActions.get());
    return () => {
      promise.abort();
    };
  });

  return (
    <div>
      <ul>
        {objects.map((object) => (
          <li key={object.id}>{object.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ObjectsContainer;
