import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { sendXummPayment } from '../api';
import { DestinationInformation } from '../components/DestinationInformation';
import { SourceInformation } from '../components/SourceInformation';
import { DestinationFormInfo, SourceFormInfo } from '../types';

const QrCodeImg = styled.img`
  margin: 16px;
`;

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
  console.log('sourceInfo object', sourceInfo);

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
  console.log('destinationInfo', destinationInfo);

  return (
    <FormLayout
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = { ...sourceInfo, ...destinationInfo };
        console.log('Final payload', payload);
        const responseJson = await sendXummPayment(payload);
        setQrCode(responseJson.refs.qr_png);
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

        <Grid>
          {qrCode && (
            <Grid container justifyContent="center">
              <QrCodeImg alt="QR Code to sign transaction" src={qrCode} />
            </Grid>
          )}
          <Grid container justifyContent="center">
            <Button variant="contained" type="submit" size="large">
              Move Tokens
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </FormLayout>
  );
};
