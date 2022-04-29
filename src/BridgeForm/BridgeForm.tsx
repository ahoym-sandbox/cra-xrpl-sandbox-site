import styled from '@emotion/styled';
import { Button, Grid, Typography } from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { sendXummPayment } from '../api';
import { DestinationInformation } from '../components/DestinationInformation';
import { Loading } from '../components/Loading';
import { SourceInformation } from '../components/SourceInformation';
import { DestinationFormInfo, SourceFormInfo } from '../types';

const QrCodeImg = styled.img`
  margin: 16px;
`;

export const BridgeForm = () => {
  const { isLoading, error, data, mutate } = useMutation(
    (payload: SourceFormInfo & DestinationFormInfo) => sendXummPayment(payload)
  );
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
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = { ...sourceInfo, ...destinationInfo };
        console.log('Final payload', payload);
        mutate(payload);
      }}
    >
      <Grid container flexDirection="column" height="100%">
        <Grid item marginBottom="32px">
          <SourceInformation setSourceInfo={partialSetSourceInfo} />
        </Grid>
        <Grid item marginBottom="32px">
          <DestinationInformation
            amount={sourceInfo.amount}
            token={sourceInfo.token}
            setDestinationInfo={partialSetDestinationInfo}
          />
        </Grid>

        <Grid item>
          {data?.refs.qr_png && (
            <Grid container justifyContent="center" marginBottom="32px">
              <QrCodeImg
                alt="QR Code to sign transaction"
                src={data.refs.qr_png}
              />
            </Grid>
          )}
          {error && (
            <Grid container justifyContent="center" marginBottom="32px">
              <Typography variant="body1">
                An error occurred when creating the transaction for signing.
              </Typography>
            </Grid>
          )}

          <Grid container justifyContent="center">
            {isLoading ? (
              <Loading />
            ) : (
              <Button variant="contained" type="submit" size="large">
                Move Tokens
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
