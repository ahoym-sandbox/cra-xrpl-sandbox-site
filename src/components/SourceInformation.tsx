import { SourceFormInfo } from '../BridgeForm/types';
import { Card } from './Card';
import { TextInput } from './forms/TextInput';
import { Flex } from './layouts/Flex';

interface SourceInformationProps {
  setSourceInfo: (info: Partial<SourceFormInfo>) => void;
}

export const SourceInformation = ({
  setSourceInfo,
}: SourceInformationProps) => {
  return (
    <Card>
      <Flex>
        <TextInput
          placeholder="From Network"
          onBlur={(event) => {
            setSourceInfo({ token: event.target.value });
          }}
        />
        <TextInput
          placeholder="Token"
          onBlur={(event) => {
            setSourceInfo({ token: event.target.value });
          }}
        />
        <TextInput
          placeholder="Amount"
          onBlur={(event) => {
            setSourceInfo({ amount: event.target.value });
          }}
        />
      </Flex>
      <Flex>
        <TextInput
          placeholder="From Address"
          onBlur={(event) => {
            setSourceInfo({ sourceAddress: event.target.value });
          }}
        />
      </Flex>
    </Card>
  );
};
