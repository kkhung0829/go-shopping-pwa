import React, {useState, useMemo} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    Card,
    Button,
    Image,
    Icon,
} from 'semantic-ui-react';
import NumberFormat from 'react-number-format';

import { shopping as shoppingSelector } from '../redux/selectors';
import { shopping as shoppingAction } from '../redux/actions';

import ShoppingItemDetail from './ShoppingItemDetail';

export default function ShoppingItem(props) {
    const selectItemById = useMemo(shoppingSelector.makeSelectItemById, []);
    const item = useSelector(state => selectItemById(state, props.id));
    const dispatch = useDispatch();
    const [openEditItemModal, setOpenEditItemModal] = useState(false);

    return (
        <Card key={item.id}>
            <Card.Content onClick={() => setOpenEditItemModal(true)}>
                {
                    item.imgURI ?
                        (<Image floated="left" size="mini"
                            src={item.imgURI}
                        />) :
                        (
                            <Image floated="left">
                                <Icon name="photo" />
                            </Image>
                        ) 
                }
                
                <Button floated="right" icon='trash' circular
                    onClick={() => dispatch(shoppingAction.shoppingItemDel(item.id))}
                />
                
                <Card.Header>
                    <NumberFormat
                        value={item.unitPrice * item.numUnit}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        decimalScale={1}
                    />
                </Card.Header>
                <Card.Meta>@ ${item.unitPrice} X {item.numUnit}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'
                        onClick={() => dispatch(shoppingAction.shoppingItemIncUnit(item.id))}
                    >+</Button>
                    <Button basic color='red'
                        onClick={() => dispatch(shoppingAction.shoppingItemDecUnit(item.id))}
                    >-</Button>
                </div>
            </Card.Content>
            <ShoppingItemDetail
                id={item.id}
                open={openEditItemModal}
                onClose={() => {
                    setTimeout(() => {
                        setOpenEditItemModal(false);
                    }, 0);
                }}
            />
        </Card>
    );
}