import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import SuspenseFallback from '../components/SuspenseFallback'

const UsersContainer = lazy(() => import("../containers/UsersContainer"));

const Routes: React.FC = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Switch>
        <Route path="/" component={UsersContainer} />
      </Switch>
    </Suspense>
  )
}

export default Routes;