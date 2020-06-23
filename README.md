# React / Redux / Typescript / REST Template

Project template for React projects which interact with RESTful APIs. The template includes basic setup for Webpack, TypeScript and Redux. There are also some helper functions to reduce boilerplate code to minimum.

This is work in progress and there are lots of things which could be added or changed.

## Getting started

Local development environment can be started with:

1. Fork, copy or clone this repo
2. Run `npm install`
3. Run `npm start`

A basic example should start at http://localhost:3000.

## Configs and bundling

Webpack configurations can be found from the `webpack.*` files in the root of the project. There is a common config which is merged either with development config (local development) or with production config (other environments).

You can define environment related variables in the `config.json` file. Currently, environment specific API urls are defined there.

Babel is configured via the `.babelrc` file.

Typescript config and linter configs are in the `tsconfig.json` and `tslint.json` files.

Test / production builds:

- Development: `npm run build:dev`
- QA: `npm run build:qa`
- Production: `npm run build:prod`

The difference between these builds is currently only the API endpoint defined in `config.json`.

## Template structure

```
src
 ├── index.tsx                 -> Entry point of the app
 ├── declarations.d.ts         -> TS declarations
 ├─> api                       -> API related utilities
 │   └── api.ts                -> Simple fetch wrapper functions for API calls
 ├─> app                       -> High level components & configs
 │   ├── App.tsx               -> Main component, renders Routes
 │   ├── rootReducer.ts        -> Reducers are combined here
 │   ├── Routes.tsx            -> Routes
 │   └── store.ts              -> Redux store configurations
 ├─> components                -> "Dumb" components, do not usually subscribe to state
 │   └── SuspenseFallback.tsx  -> Fallback component for lazy routes
 ├─> containers                -> Smart components (containers, views, screens...), routes usually point to these, subscribed to state
 │   └── UsersContainer.tsx    -> Example container
 ├─> ducks                     -> Ducks reducer bundles
 │   └── usersDuck.ts          -> Example of a autogenerated REST "users" duck
 ├─> templates                 -> Templates, usually there is just one
 │   └── index.html            -> The template where the app is rendered
 └─> utils                     -> Utilities
     └── restDuckGenerator.ts  -> Duck generator function for REST resources
```

## Utilities

The template is heavily targeted towards projects which use RESTful APIs as their backends. Due to this, there is a generic reducer / action generator which is able to generate Redux reducer bundles, [Ducks](https://github.com/erikras/ducks-modular-redux), automatically for given endpoint. This reduces the usual heavy Redux boilerplate code to minimum. The generator utilizes [Redux Toolkit](https://redux-toolkit.js.org/). 

For example, the Redux config (including basic selectors) for "users" endpoint for the https://reqres.in/ API looks like this when utilizing the generator:

```Typescript
import createRestDuck from "../utils/restDuckGenerator";
import { RootState } from "../app/store";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const { reducer, adapter, actions } = createRestDuck<User>("users");

export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = adapter.getSelectors((state: RootState) => state.users);

export { reducer, actions, adapter };

```

This will create the state structure for users:

```Typescript
{
  ids: (number | string)[], // id's of the users in the entities dictionary
  entities: Dictionary<User>, // actual User entities
  // status flags for async actions
  isFetchingOne: boolean,
  isFetchingMany: boolean,
  isUpdating: boolean,
  isDeleting: boolean,
  isCreating: boolean
}
```

The state shape is normalized. Without normalization the state would be very complex and unmanageable. Normalized state is also highly recommended by official [Redux docs](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape). The `ids` list and `entities` dictionary come from Redux Toolkit's [createEntityAdapter](https://redux-toolkit.js.org/api/createEntityAdapter).

Using the autogenerated async action creators:

```Typescript
import { actions as userActions } from "../ducks/usersDuck";

dispatch(userActions.get()) // or with params dispatch(userActions.get("queryParam=value"))
dispatch(userActions.getOne(1))
dispatch(userActions.create(User))
dispatch(userActions.update(1, User))
dispatch(userActions.remove(1))
```

If custom reducers and actions are needed for some additional global state, it's recommended to follow the Ducks-pattern to add some custom reducers and actions with the help of the Redux Toolkit.

## REST API structure

This project expects that the REST API follows certain structure which is often considered as best practices. In the following examples you can replace "resources" with any possible entity you can come up with (users, cars, vehicles, devices etc.). 

The top level of the returned JSON payload should have following structure (you can extend or change this, just edit `api.ts` according to your API payload structure):

```Typescript
{
  message: string, // optional message for example if the endpoint fails
  data: Array<Resource> | Resource // list of resources or single resource depending on the endpoint
}
```

The endpoints should be built like this:

```
- GET /resources -> returns a list of resources in the data property
- GET /resources/{id} -> returns the resource which matches the id in the data property
- POST /resources -> creates a new resource based on the supplied payload, returns the new resource in the data property
- PUT /resources/{id} -> updates the resource which matches the id with the new values given in the payload, returns the updated resource in the data property
- DELETE /resources/{id} -> deletes the resource which matches the id
```