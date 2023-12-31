import React from 'react';
import { Modal, Image } from 'semantic-ui-react';

interface PlaceViewModalProps {
  trigger: JSX.Element;
}

export default function PlaceViewModal(props: PlaceViewModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      closeIcon={true}
      closeOnEscape={true}
      basic
      dimmer="blurring"
      onClose={() => {
        setOpen(false);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={props.trigger}
      style={{ width: 'fit-content' }}
    >
      <Modal.Content className="place-view-image">
        <Image className="mon" src="/plc/latest.png" alt="logo" />
      </Modal.Content>
    </Modal>
  );
}
