import { createRoutesFromElements, Route } from 'react-router-dom';
import { ComponentType, lazy, LazyExoticComponent, PropsWithoutRef, Suspense } from 'react';

import SuspenseFallback from '../components/SuspenseFallback';

type ComponentWithDisplayName = {
  displayName?: string;
};

const suspensed = <P extends object>(Component: LazyExoticComponent<ComponentType<P>> & ComponentWithDisplayName) => {
  const SuspensedComponent = (props: PropsWithoutRef<P>) => (
    <Suspense fallback={<SuspenseFallback />}>
      <Component {...props} />
    </Suspense>
  );

  // Safely set the display name
  SuspensedComponent.displayName = `Suspensed(${Component.displayName || Component.name || 'Component'})`;

  return SuspensedComponent;
};

const UsersContainer = suspensed(lazy(() => import('#/containers/ObjectsContainer')));

export default createRoutesFromElements(
  <>
    <Route path="/" element={<UsersContainer />} />
  </>
);
