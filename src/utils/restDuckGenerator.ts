import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  EntityState
} from "@reduxjs/toolkit";

import * as Api from "../api/api";

// Please refer to https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk
// for more information about the typing of createAsyncThunk & other parts of RTK

// expect that the REST API returns "id" field for every entity
export interface BaseEntity {
  id: string | number;
}

// common properties for each REST resource root state
export interface BaseState {
  isFetchingOne: boolean;
  isFetchingMany: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isCreating: boolean;
}

export type RestState<T> = EntityState<T> & BaseState;

function createRestActions<T extends BaseEntity>(entityNamePlural: string) {
  return {
    get: createAsyncThunk<Array<T>, string | undefined>(
      `${entityNamePlural}/getAll`,
      async (queryParams) => {
        let query = "";
        if (queryParams !== "") {
          query = `?${queryParams}`;
        }
        return (await Api.get<T>(`${entityNamePlural}${query}`)) as Array<T>;
      }
    ),

    getOne: createAsyncThunk<T, string | number>(
      `${entityNamePlural}/getOne`,
      async (id) => {
        return (await Api.get<T>(`${entityNamePlural}/${id}`)) as T;
      }
    ),

    create: createAsyncThunk<T, T>(
      `${entityNamePlural}/create`,
      async (data) => {
        return (await Api.post(entityNamePlural, data)) as T;
      }
    ),

    update: createAsyncThunk<T, T>(
      `${entityNamePlural}/update`,
      async (data) => {
        return (await Api.put(`${entityNamePlural}/${data.id}`, data)) as T;
      }
    ),

    remove: createAsyncThunk<string | number, string | number>(
      `${entityNamePlural}/remove`,
      async (id) => {
        await Api.remove<T>(`${entityNamePlural}/${id}`);
        return id;
      }
    ),
  };
}

export default function createRestDuck<T extends BaseEntity>(
  entityNamePlural: string
) {
  const adapter = createEntityAdapter<T>();

  const initialState = adapter.getInitialState({
    isFetchingOne: false,
    isFetchingMany: false,
    isUpdating: false,
    isDeleting: false,
    isCreating: false,
  });

  const restActions = createRestActions<T>(entityNamePlural);

  const slice = createSlice({
    name: entityNamePlural,
    initialState: initialState as RestState<T>,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(restActions.get.pending, (state, _) => {
        state.isFetchingMany = true;
      });
      builder.addCase(restActions.get.fulfilled, (state, action) => {
        state.isFetchingMany = false;
        // using only "state" here leads to TypeScript error
        adapter.setAll(state as RestState<T>, action.payload);
      });
      builder.addCase(restActions.get.rejected, (state, _) => {
        state.isFetchingMany = false;
      });

      builder.addCase(restActions.getOne.pending, (state, _) => {
        state.isFetchingOne = true;
      });
      builder.addCase(restActions.getOne.fulfilled, (state, action) => {
        state.isFetchingOne = false;
        adapter.upsertOne(state as RestState<T>, action.payload);
      });
      builder.addCase(restActions.getOne.rejected, (state, _) => {
        state.isFetchingOne = false;
      });

      builder.addCase(restActions.create.pending, (state, _) => {
        state.isCreating = true;
      });
      builder.addCase(restActions.create.fulfilled, (state, action) => {
        state.isCreating = false;
        adapter.upsertOne(state as RestState<T>, action.payload);
      });
      builder.addCase(restActions.create.rejected, (state, _) => {
        state.isCreating = false;
      });

      builder.addCase(restActions.update.pending, (state, _) => {
        state.isUpdating = true;
      });
      builder.addCase(restActions.update.fulfilled, (state, action) => {
        state.isUpdating = false;
        adapter.upsertOne(state as RestState<T>, action.payload);
      });
      builder.addCase(restActions.update.rejected, (state, _) => {
        state.isUpdating = false;
      });

      builder.addCase(restActions.remove.pending, (state, _) => {
        state.isDeleting = true;
      });
      builder.addCase(restActions.remove.fulfilled, (state, action) => {
        state.isDeleting = false;
        adapter.removeOne(state as RestState<T>, action.payload);
      });
      builder.addCase(restActions.remove.rejected, (state, _) => {
        state.isDeleting = false;
      });
    },
  });

  return {
    reducer: slice.reducer,
    actions: { ...slice.actions, ...restActions }
  };
}
