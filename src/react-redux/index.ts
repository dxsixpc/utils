import { createStore, compose } from "redux";
import type { Store, Reducer } from "redux";
// import { configureStore } from '@reduxjs/toolkit';
import { mapValues } from "lodash";
import * as subReducers from "./state-bundle";
import { emptyAppState } from "./type";
import type { StateType } from "./type";

// * ---------------------------------------------------------------- type calculation

export type SubReducer<T = any> = (s: StateType, a: T) => StateType;

type ReducerMap = typeof subReducers;

type PayloadMap = {
  [K in keyof ReducerMap]: ReducerMap[K] extends SubReducer<infer P> ? P : never;
};

type ActionMap = {
  [K in keyof PayloadMap]: { type: K; payload: PayloadMap[K] };
};

type SubDispatcher<T> = (payload: T) => void;

type DispatcherMap = {
  [K in keyof PayloadMap]: SubDispatcher<PayloadMap[K]>;
};

type ActionList = ActionMap[keyof ActionMap];

// * ---------------------------------------------------------------- create store
const centerReducer: Reducer<StateType | undefined, ActionList> = (state, action) => {
  const { type, payload } = action;
  const subReducer = subReducers[type];
  // @ts-ignore
  return subReducer ? subReducer(state!, payload) : state;
};

export type StoreType = Store<StateType>;

const enhancer =
  ((window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()) ||
  compose;

export const store = createStore(centerReducer, emptyAppState, enhancer) as StoreType;

export const storeActions: DispatcherMap = mapValues(
  subReducers,
  (_value, key) => (payload: any) => store.dispatch({ type: key, payload })
);

// 监听store
// appStore.subscribe(() => {
//   const state = pipe(() => appStore.getState())(null);
//   console.log(state);
// });
