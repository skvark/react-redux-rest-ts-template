# React / Redux / Typescript / REST Template

Project template for React projects which interact with RESTful APIs. The template includes basic setup for Webpack, TypeScript and Redux. There are also some helper functions to reduce boilerplate code to minimum.

## Getting started

Local development can be started with:

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

## Project template structure

```
src
 ├── index.tsx                 -> entry point of the app
 ├── declarations.d.ts         -> some TS declarations
 ├─> api                       -> API related utilities
 │   └── api.ts                -> simple fetch wrapper functions for API calls
 ├─> app                       -> High level components & configs
 │   ├── App.tsx               -> Main component, renders Routes
 │   ├── rootReducer.ts        -> Reducers are combined here
 │   ├── Routes.tsx            -> Routes
 │   └── store.ts              -> Redux store configurations
 ├─> components                -> "Dumb" components
 │   └── SuspenseFallback.tsx  -> Fallback component for lazy routes
 ├─> containers                -> Smart components, routes usually point to these
 │   └── UsersContainer.tsx    -> Example container
 ├─> ducks                     -> Ducks reducer bundles
 │   └── usersDuck.ts          -> Example of a autogenerated REST "users" duck
 ├─> templates                 -> Templates, usually there is just one
 │   └── index.html            -> The template where the app is rendered
 └─> utils                     -> Utilities
     └── restDuckGenerator.ts  -> Duck generator function for REST resources
```

## Utilities

The template is heavily targeted towards projects which use RESTful APIs as their backends. Due to this, there is a generic reducer generator which is able to generate Redux recucer bundles, [Ducks](https://github.com/erikras/ducks-modular-redux), automatically for given endpoint. This reduces the usual Redux boilerplate code to absolute minimum. 

For example, the Redux config for "users" endpoint for the https://reqres.in/ API looks like this when utilizing the generator:

```Typescript
import createRestDuck from "../utils/restDuckGenerator";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const { reducer, actions } = createRestDuck<User>("users");

export { reducer, actions };
```

This will create a state structure for users:

```TypeScript
{
  ids: (number | string)[] // id's of the users in the entities dictionary
  entities: Dictionary<User>, // actual User entities
  // status flags for async actions
  isFetchingOne: boolean,
  isFetchingMany: boolean,
  isUpdating: boolean,
  isDeleting: boolean,
  isCreating: boolean
}
```

Using the autogenerated async actions creators:

```Typescript
import { actions as userActions } from "../ducks/usersDuck";

dispatch(userActions.get()) // or with params dispatch(userActions.get("queryParam=value"))
dispatch(userActions.getOne(1))
dispatch(userActions.create(User))
dispatch(userActions.update(1, User))
dispatch(userActions.remove(1))
```

This template user Redux Toolkit. You make your own reducers etc. with it if needed, see https://redux-toolkit.js.org/ for docs.