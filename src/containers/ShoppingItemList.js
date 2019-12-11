import React, { useState, createRef } from 'react';
import { useSelector } from "react-redux";
import {
    Sticky,
    Button,
    Card,
} from 'semantic-ui-react';
import NumberFormat from 'react-number-format';

import { shopping as shoppingSelector } from '../redux/selectors';

import ShoppingItem from './ShoppingItem';
import ShoppingItemDetail from './ShoppingItemDetail';

export default function ShoppingItemList() {
    const items = useSelector(shoppingSelector.selectItems);
    const totalCost = useSelector(shoppingSelector.selectTotalCost);
    const [openAddItemModal, setOpenAddItemModal] = useState(false);

    const uiItems = items.map(item => {
        return (
            <ShoppingItem key={item.id} id={item.id} />
        );
    });

    const contextRef = createRef();
    return (
        <div ref={contextRef}>
            <Sticky context={contextRef}>
                <Card fluid>
                    <Card.Content>
                        <Button floated="right"
                            onClick={() => setOpenAddItemModal(true)}
                        >+</Button>
                        <Card.Header>
                            <NumberFormat
                                value={totalCost}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'Total: $'}
                                decimalScale={1}
                            />
                        </Card.Header>
                    </Card.Content>
                </Card>
            </Sticky>
            <div>
                <Card.Group centered>{uiItems}</Card.Group>
            </div>
            <ShoppingItemDetail
                open={openAddItemModal}
                onClose={() => setOpenAddItemModal(false)}/>
        </div>
    );
}