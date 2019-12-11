import { Record, List } from 'immutable';
import { shoppingItem } from '../../models';

const InitialState = Record({
    items: List(),  // <shoppingItem>
}, 'ShoppingInitialState');

export { shoppingItem };
export default InitialState;