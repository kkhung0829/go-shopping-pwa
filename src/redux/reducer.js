// import { combineReducers } from 'redux-immutable';
import { combineReducers } from 'redux';

import shoppingReducer from './shopping/reducer';
import shoppingInitialState, { shoppingItem } from './shopping/initialState';

const rootInitialState = {
    shopping: new shoppingInitialState(),
};

const reducer = combineReducers({
    shopping: shoppingReducer,
});

const selectShoppingState = state => state.shopping;

export { rootInitialState, shoppingInitialState, shoppingItem, selectShoppingState};
export default reducer;