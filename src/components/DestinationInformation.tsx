import { Card } from './Card';
import { Flex } from './layouts/Flex';
import { TextInput } from './forms/TextInput';
import { DestinationFormInfo } from '../BridgeForm/types';

interface DestinationInformationProps {
  token: string;
  amount: string;
  setDestinationInfo: (info: Partial<DestinationFormInfo>) => void;
}

export const DestinationInformation = (props: DestinationInformationProps) => {
  const { amount, setDestinationInfo, token } = props;

  return (
    <Card>
      <Flex>
        <TextInput
          placeholder="To Network"
          onBlur={(event) => {
            setDestinationInfo({ destinationNetwork: event.target.value });
          }}
        />
        <TextInput placeholder="Token" value={token} disabled />
        <TextInput placeholder="Amount" value={amount} disabled />
      </Flex>
      <Flex>
        <TextInput
          placeholder="To Address"
          onBlur={(event) => {
            setDestinationInfo({ destinationAddress: event.target.value });
          }}
        />
      </Flex>
    </Card>
  );
};
