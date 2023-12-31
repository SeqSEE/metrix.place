import { NetworkType } from '@metrixcoin/metrilib';
import ABI from '@place/abi';
import { getMetrixPlaceAddress } from '@place/index';
import ContractFunctions from '@src/components/ContractFunctions';
import DebugContracts from '@src/components/DebugContracts';
import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';

interface DebugModalProps {
  trigger: JSX.Element;
  connected: boolean;
  network: NetworkType;
}

export default function DebugModal(props: DebugModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      closeIcon={true}
      closeOnEscape={true}
      closeOnDimmerClick={false}
      basic
      dimmer="blurring"
      onClose={() => {
        setOpen(false);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={props.trigger}
    >
      <Modal.Content>
        <DebugContracts
          connected={props.connected}
          debug={[
            <Segment inverted key={'SegmentMetrixPlace'}>
              <ContractFunctions
                network={props.network}
                contract={'MetrixPlace'}
                address={getMetrixPlaceAddress(props.network)}
                abi={ABI.MetrixPlace}
                key={0}
              />
            </Segment>
          ]}
        />
      </Modal.Content>
    </Modal>
  );
}
