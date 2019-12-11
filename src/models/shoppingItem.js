import { Record } from 'immutable';

export class shoppingItem extends Record({
    id: null,
    name: null,
    unitPrice: 0,
    numUnit: 1,
    imgURI: null,
}) {
    constructor(props) {
        super(Object.assign(
            {},
            props,
            {
                id: (props && props.id) || Math.random().toString()
            }
        ));
    }
}