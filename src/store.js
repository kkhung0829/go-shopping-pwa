import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import Immutable from 'immutable';

import rootReducer, {
    rootInitialState,
    shoppingInitialState,
    shoppingItem,
} from './redux/reducer';

if (process.env.NODE_ENV === 'development') {
    var installDevTools = require('immutable-devtools');
    installDevTools(Immutable);
}

export default function createReduxStore() {
    let middlewares = [];

    const persistConfig = {
        transforms: [immutableTransform({
            records: [
                shoppingInitialState,
                shoppingItem,
            ]})],
        key: 'shopping',
        storage: storage,
        stateReconciler: autoMergeLevel1,
    };
    const presistedReducer = persistReducer(persistConfig, rootReducer);

    let debuggWrapper = (data) => data;
    if (process.env.NODE_ENV === 'development') {
        const composeWithDevTools =
                window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ||  require('remote-redux-devtools').composeWithDevTools;        
        debuggWrapper = composeWithDevTools({ realtime: true });    
    }
    const store = createStore(
        presistedReducer,
        rootInitialState,
        debuggWrapper(
            applyMiddleware(...middlewares),
            // other store enhancers if any
        )
    );

    const persistor = persistStore(store, null, () => {
        // console.log('Persistor Callback: ' + JSON.stringify(store.getState()));
    });

    return { store, persistor };
}