import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PageOne from './PageOne';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ApplicantModal = (props) => {
    const {
      className
    } = props;
  
    const [modal, setModal] = useState(true);
  
    const toggle = () => {
        setModal(!modal);
        props.handler();
    }
  
    return (
      <div>
        <Modal size="lg" isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
            <ModalBody>
                <span className="text-danger mx-auto my-3" style={{fontSize: '12px'}}>
                    <FontAwesomeIcon icon={faInfoCircle} /> Because of the number of form fields <b>453</b> and time constraint you can only fill the first page.
                </span>
                <br/>
                <br/>
                <PageOne user_id={props.user_id}/>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
      </div>
    );
}
  
export default ApplicantModal;