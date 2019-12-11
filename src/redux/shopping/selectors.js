import { createSelector } from 'reselect';
import { selectShoppingState } from '../reducer';

const selectItems = createSelector(
    selectShoppingState,
    (shopping) => shopping.getIn(['items'])
);

const makeSelectItemById = () => createSelector(
    selectItems,
    (_, id) => id,
    (items, id) => items.find(
        (item) => item.id === id
    )
);

const selectTotalCost = createSelector(
    [selectItems],
    (items) => items.reduce(
        (total, item) => (total + item.unitPrice * item.numUnit),
        0
    )
);

export { selectItems, makeSelectItemById, selectTotalCost };