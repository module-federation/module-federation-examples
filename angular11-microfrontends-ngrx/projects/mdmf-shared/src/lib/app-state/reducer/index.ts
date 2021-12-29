import {
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
  Action,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { InjectionToken } from '@angular/core';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromUser from './user.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  [fromUser.userFeatureKey]: fromUser.UserStateModel;
  router: fromRouter.RouterReducerState<any>;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>(
  'Root reducers token',
  {
    factory: () => ({
      [fromUser.userFeatureKey]: fromUser.reducer,
      router: fromRouter.routerReducer,
    }),
  },
);

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

const isProd = false; // environment.production cannot be shared with multiple apps there, a injection token is required?

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !isProd ? [logger] : [];

/**
 * User Selectors
 */
export const selectUserState = createFeatureSelector<State, fromUser.UserStateModel>(
  fromUser.userFeatureKey,
);

export const selectUsers = createSelector(selectUserState, fromUser.selectUsers);

/**
 * Router Selectors
 */
export const selectRouter = createFeatureSelector<State, fromRouter.RouterReducerState>('router');

export const { selectRouteData } = fromRouter.getSelectors(selectRouter);
