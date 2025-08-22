import { configureStore } from "@reduxjs/toolkit";
import { baseUrlApi } from "./api/baseUrlApi";
import subscriptionDataReducer from "./features/Subscription/subscriptionDataSlice";
import authReducer from "./features/auth/authSlice";
import searchReducer from "./features/search/searchSlice";

// const persistMiddleware = (store) => (next) => (action) => {
//   const result = next(action);

//   if (typeof window !== 'undefined' && action.type.startsWith('resume/')) {
//     const state = store.getState();
//     const { files, ...stateWithoutFiles } = state.resume;

//     sessionStorage.setItem('resumeFormData', JSON.stringify(stateWithoutFiles));
//   }

//   return result;
// };

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      subscriptionData: subscriptionDataReducer,
      [baseUrlApi.reducerPath]: baseUrlApi.reducer,
      search: searchReducer
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseUrlApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
