import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    Modal,
    Form,
    Button,
    Input,
    Image,
} from 'semantic-ui-react';

import TakePhoto from '../components/TakePhoto';

import { shopping as shoppingSelector } from '../redux/selectors';
import { shopping as shoppingAction } from '../redux/actions';

function isDefinedAndNotNull(val) {
    return val !== undefined && val !== null;
}

export default function ShoppingItemDetail(props) {
    const selectItemById = useMemo(shoppingSelector.makeSelectItemById, []);
    const item = useSelector(state => selectItemById(state, props.id));
    const dispatch = useDispatch();

    let [name, setName] = useState('');
    let [unitPrice, setUnitPrice] = useState(0.0);
    let [numUnit, setNumUnit] = useState(1);
    let [imgURI, setImgURI] = useState(null);
    let [openTakePhoto, setOpenTakePhoto] = useState(false);
    let [isEdit, setIsEdit] = useState(false);

    function initState(item) {
        if (isDefinedAndNotNull(item)) {
            setName(item.name ? item.name : '');
            setUnitPrice(item.unitPrice);
            setNumUnit(item.numUnit);
            setImgURI(item.imgURI);
            setIsEdit(true);
        } else {
            setName('');
            setUnitPrice(0.0);
            setNumUnit(1);
            setImgURI(null);
            setIsEdit(false);
        }
    }

    useEffect(() => {
        initState(item);
    }, [
        item,
        props.id,
    ]);

    return (
        <Modal
            open={props.open}
            onClose={() => {
                initState(null);
                props.onClose();
            }}
            size='small'
            dimmer='inverted'
        >
            <Modal.Header>{isEdit ? 'Edit' : 'Add'}</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <Input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Unit Price</label>
                        <Input type="number"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(Number(e.target.value))}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Num Unit</label>
                        <Input type="number"
                            value={numUnit}
                            onChange={(e) => setNumUnit(Number(e.target.value))}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Photo</label>
                        <Button icon='camera' fluid
                            onClick={() => setOpenTakePhoto(true)}
                        />
                        <Image src={imgURI}/>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button floated='left' icon='save'
                    onClick={() => {
                        if (isEdit) {
                            dispatch(shoppingAction.shoppingItemUpdate(
                                item.id,
                                name,
                                unitPrice,
                                numUnit,
                                imgURI
                            ));
                        } else {
                            dispatch(shoppingAction.shoppingItemAdd(
                                name,
                                unitPrice,
                                numUnit,
                                imgURI
                            ));
                        }
                        initState(null);
                        props.onClose();
                    }}
                />
                <Button floated='right' icon='cancel'
                    onClick={() => {
                        initState(null);
                        props.onClose();
                    }}
                />
            </Modal.Actions>
            <TakePhoto
                open={openTakePhoto}
                onClose={() => {
                    setTimeout(() => {
                        setOpenTakePhoto(false);
                    }, 0);
                }}
                onTakePhoto={(dataUri) => {
                    setImgURI(dataUri);
                }}
            />
        </Modal>
    );
}