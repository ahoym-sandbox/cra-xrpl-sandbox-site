import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { convertStringToHex } from 'xrpl';
import { DestinationInformation } from '../components/DestinationInformation';
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
  const [qrCode, setQrCode] = useState<string | void>();
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
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
          ...sourceInfo,
          ...destinationInfo,
        };
        console.log('Final payload', payload);

        const destinationAccountHex = convertStringToHex(
          destinationInfo.destinationAddress
        );

        try {
          const response = await fetch('/.netlify/functions/xummPayment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              txJson: {
                TransactionType: 'Payment',
                Destination: 'rfZQn3mEcLbVT6z6kGuh5wYMBdU9xbof6a', // Should be door account
                Amount: payload.amount,
                Memos: [
                  {
                    Memo: {
                      MemoData: destinationAccountHex,
                    },
                  },
                ],
              },
            }),
          });
          console.log('Received response from xumm', response);
          const responseJson = await response.json();
          console.log('Actual responseJson', responseJson);
          setQrCode(responseJson.refs.qr_png);
        } catch (e: unknown) {
          console.log('SOMETHING WENT WRONG!', e);
        }

        // do some sort of translatePayloadToPayment(payload);
        // use network to find out which door account to use

        // send payment through xumm APIs
      }}
    >
      <Grid
        container
        flexDirection="column"
        height="100%"
        justifyContent="space-evenly"
      >
        <SourceInformation setSourceInfo={partialSetSourceInfo} />
        <DestinationInformation
          amount={sourceInfo.amount}
          token={sourceInfo.token}
          setDestinationInfo={partialSetDestinationInfo}
        />

        <Grid container justifyContent="center">
          {qrCode && (
            <Grid item>
              <img alt="QR Code to sign transaction" src={qrCode} />
            </Grid>
          )}
          <Grid item>
            <Button variant="contained" type="submit" size="large">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </FormLayout>
  );
};
