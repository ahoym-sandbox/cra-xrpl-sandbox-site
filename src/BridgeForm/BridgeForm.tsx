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

const BodyRow = styled(Grid)({
  item: true,
  marginBottom: '32px',
});

const DEFAULT_SOURCE_INFO = {
  token: '',
  amount: '0',
  sourceAddress: '',
  sourceNetwork: '',
};
const DEFAULT_DESTINATION_INFO = {
  destinationNetwork: '',
  destinationAddress: '',
};

export const BridgeForm = () => {
  const { isLoading, error, data, mutate } = useMutation(
    (payload: SourceFormInfo & DestinationFormInfo) => sendXummPayment(payload)
  );
  const [sourceInfo, setSourceInfo] =
    useState<SourceFormInfo>(DEFAULT_SOURCE_INFO);
  const partialSetSourceInfo = useCallback(
    (newState: Partial<SourceFormInfo>) => {
      setSourceInfo((oldState) => ({ ...oldState, ...newState }));
    },
    [setSourceInfo]
  );
  console.log('sourceInfo object', sourceInfo);

  const [destinationInfo, setDestinationInfo] = useState<DestinationFormInfo>(
    DEFAULT_DESTINATION_INFO
  );
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
        <BodyRow>
          <SourceInformation
            {...sourceInfo}
            setSourceInfo={partialSetSourceInfo}
          />
        </BodyRow>
        <BodyRow>
          <DestinationInformation
            {...destinationInfo}
            amount={sourceInfo.amount}
            token={sourceInfo.token}
            setDestinationInfo={partialSetDestinationInfo}
          />
        </BodyRow>

        <Grid item container flexDirection="column" alignItems="center">
          {data?.refs.qr_png && (
            <BodyRow>
              <QrCodeImg
                alt="QR Code to sign transaction"
                src={data.refs.qr_png}
              />
            </BodyRow>
          )}
          {error && (
            <BodyRow>
              <Typography variant="body1">
                An error occurred when creating the transaction for signing.
              </Typography>
            </BodyRow>
          )}

          <BodyRow container justifyContent="space-between">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  disabled={!!data?.refs.qr_png}
                >
                  Move Tokens
                </Button>
                <Button
                  variant="outlined"
                  type="button"
                  size="large"
                  onClick={() => {
                    setSourceInfo(DEFAULT_SOURCE_INFO);
                    setDestinationInfo(DEFAULT_DESTINATION_INFO);
                  }}
                >
                  Reset Form
                </Button>
              </>
            )}
          </BodyRow>
        </Grid>
      </Grid>
    </form>
  );
};
