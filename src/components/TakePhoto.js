import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {
    Modal,
} from 'semantic-ui-react'

export default function TakePhoto(props) {
    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
        >
            <Camera
                onTakePhotoAnimationDone={(dataUri) => {
                    props.onTakePhoto(dataUri);
                    props.onClose();
                }}
            />
        </Modal>
    );
}