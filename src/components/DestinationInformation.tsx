import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { DestinationFormInfo } from '../types';
import { Card } from './Card';
import { TextInput } from './forms/TextInput';
import { Flex } from './layouts/Flex';

// TODO: sub-optimal, try to get rowSpacing to work
const FieldRow = styled(Grid)`
  margin-bottom: 16px;
`;

interface DestinationInformationProps {
  token: string;
  amount: string;
  setDestinationInfo: (info: Partial<DestinationFormInfo>) => void;
}

export const DestinationInformation = (
  props: DestinationInformationProps & DestinationFormInfo
) => {
  const {
    amount,
    destinationAddress,
    destinationNetwork,
    setDestinationInfo,
    token,
  } = props;

  return (
    <Card>
      <FieldRow container spacing={2}>
        <Grid item>
          <TextInput
            placeholder="To Network"
            value={destinationNetwork}
            onChange={(event) => {
              setDestinationInfo({ destinationNetwork: event.target.value });
            }}
          />
        </Grid>
        <Grid item>
          <TextInput placeholder="Token" value={token} disabled />
        </Grid>
        <Grid item>
          <TextInput placeholder="Amount" value={amount} disabled />
        </Grid>
      </FieldRow>
      <Flex>
        <TextInput
          placeholder="To Address"
          value={destinationAddress}
          onChange={(event) => {
            setDestinationInfo({ destinationAddress: event.target.value });
          }}
        />
      </Flex>
    </Card>
  );
};
