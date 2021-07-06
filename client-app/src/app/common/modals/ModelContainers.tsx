import { observer } from "mobx-react-lite";
import React from "react";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../stores/Store";

export default observer( function ModelContainers(){

    const{modelstore}=useStore(); 
    return(
            <Modal open={modelstore.modal.open} onClose={modelstore.closeModal} size="mini" >
                    <Modal.Content>{modelstore.modal.body}</Modal.Content>
            </Modal>
    )
})