import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import SuspenseFallback from '../components/SuspenseFallback';

const UsersContainer = lazy(async () => await import('../containers/UsersContainer'));

const Router: React.FC = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Routes>
        <Route path="/" element={<UsersContainer />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
