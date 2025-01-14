import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from '#/app/store';

import routes from '#/app/Routes';

const router = createBrowserRouter(routes);
const root = createRoot(document.getElementById('root')!);

root.render(
  <ReduxProvider store={store}>
    <RouterProvider router={router} />
  </ReduxProvider>
);
