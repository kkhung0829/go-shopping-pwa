const {
    SHOPPING_ITEM_ADD,
    SHOPPING_ITEM_DEL,
    SHOPPING_ITEM_UPDATE,
    SHOPPING_ITEM_INC_UNIT,
    SHOPPING_ITEM_DEC_UNIT,
    SHOPPING_ITEM_CLEAR,
} = require('../actionTypes').default;

export function shoppingItemAdd(name, unitPrice, numUnit, imgURI) {
    return {
        type: SHOPPING_ITEM_ADD,
        data: {
            name,
            unitPrice,
            numUnit,
            imgURI,
        },
    };
}

export function shoppingItemDel(id) {
    return {
        type: SHOPPING_ITEM_DEL,
        data: id,
    }
}

export function shoppingItemUpdate(id, name, unitPrice, numUnit, imgURI) {
    return {
        type: SHOPPING_ITEM_UPDATE,
        data: {
            id,
            name,
            unitPrice,
            numUnit,
            imgURI,
        },
    };
}

export function shoppingItemIncUnit(id) {
    return {
        type: SHOPPING_ITEM_INC_UNIT,
        data: id,
    };
}

export function shoppingItemDecUnit(id) {
    return {
        type: SHOPPING_ITEM_DEC_UNIT,
        data: id,
    };
}

export function shoppingItemClear() {
    return {
        type: SHOPPING_ITEM_CLEAR,
    };
}