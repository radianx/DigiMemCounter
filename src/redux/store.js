import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import settingsReducer from "./settingsReducer";

// Persist configuration
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["settings"], // Only persist settings
};

const persistedReducer = persistReducer(persistConfig, settingsReducer);

const store = configureStore({
    reducer: {
        settings: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
