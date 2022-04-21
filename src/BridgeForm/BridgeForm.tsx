import styled from '@emotion/styled';
import { FormEvent, useCallback, useState } from 'react';
import { DestinationInformation } from '../components/DestinationInformation';
import { Flex } from '../components/layouts/Flex';
import { SourceInformation } from '../components/SourceInformation';
import { DestinationFormInfo, SourceFormInfo } from './types';

const FormLayout = styled.form`
  height: 100%;
`;

export const BridgeForm = () => {
  const [sourceInfo, setSourceInfo] = useState<SourceFormInfo>({
    token: '',
    amount: '0',
    sourceAddress: '',
  });
  const partialSetSourceInfo = useCallback(
    (newState: Partial<SourceFormInfo>) => {
      setSourceInfo((oldState) => ({ ...oldState, ...newState }));
    },
    [setSourceInfo]
  );
  console.log('TEST LOG HERE', sourceInfo);

  const [destinationInfo, setDestinationInfo] = useState<DestinationFormInfo>({
    destinationNetwork: '',
    destinationAddress: '',
  });
  const partialSetDestinationInfo = useCallback(
    (newState: Partial<DestinationFormInfo>) => {
      setDestinationInfo((oldState) => ({ ...oldState, ...newState }));
    },
    [setDestinationInfo]
  );
  console.log('TEST LOG HERE', destinationInfo);

  return (
    <FormLayout
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
          ...sourceInfo,
          ...destinationInfo,
        };
        console.log('Final payload', payload);

        fetch('/.netlify/functions/xummPayment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log('TEST LOG HERE', typeof response, response);
            // console.log('TEST LOG HERE', typeof response, JSON.parse(response));
          })
          .catch((err) => console.log(err));

        // do some sort of translatePayloadToPayment(payload);
        // use network to find out which door account to use

        // send payment through xumm APIs
      }}
    >
      <Flex flexDirection="column" height="100%" justifyContent="space-evenly">
        <SourceInformation setSourceInfo={partialSetSourceInfo} />
        <DestinationInformation
          amount={sourceInfo.amount}
          token={sourceInfo.token}
          setDestinationInfo={partialSetDestinationInfo}
        />
        <button type="submit">Submit</button>
      </Flex>
    </FormLayout>
  );
};
