import React from 'react';
import { Button, Card, CardBody } from 'reactstrap';

const basicModal = `function basicModalExample () {
    const [collapseOne, collapseOneOpen] = useState(false);
    return (
      <>
        <Button color="primary" onClick={() => collapseOneOpen(!collapseOne)}>
          Launch demo modal
        </Button>
        <Modal isOpen={collapseOne} toggle={() => collapseOneOpen(!collapseOne)}>
          <ModalHeader>Modal title</ModalHeader>
          <ModalBody>
           Woohoo, you're reading this text in a modal!
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => collapseOneOpen(!collapseOne)}>
              Close
            </Button>
            <Button color="primary">Save changes</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }`;
