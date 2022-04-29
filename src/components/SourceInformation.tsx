import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { SourceFormInfo } from '../types';
import { Card } from './Card';
import { TextInput } from './forms/TextInput';

// TODO: sub-optimal, try to get rowSpacing to work
const FieldRow = styled(Grid)`
  margin-bottom: 16px;
`;

interface SourceInformationProps {
  setSourceInfo: (info: Partial<SourceFormInfo>) => void;
}

export const SourceInformation = (
  props: SourceInformationProps & SourceFormInfo
) => {
  const { amount, setSourceInfo, sourceAddress, sourceNetwork, token } = props;

  return (
    <Card>
      <FieldRow container spacing={2}>
        <Grid item>
          <TextInput
            placeholder="From Network"
            value={sourceNetwork}
            onChange={(event) => {
              setSourceInfo({ sourceNetwork: event.target.value });
            }}
          />
        </Grid>
        <Grid item>
          <TextInput
            placeholder="Token"
            value={token}
            onChange={(event) => {
              setSourceInfo({ token: event.target.value });
            }}
          />
        </Grid>
        <Grid item>
          <TextInput
            placeholder="Amount"
            value={amount}
            onChange={(event) => {
              setSourceInfo({ amount: event.target.value });
            }}
          />
        </Grid>
      </FieldRow>

      <Grid container>
        <Grid item xs={12}>
          <TextInput
            placeholder="From Address"
            value={sourceAddress}
            onChange={(event) => {
              setSourceInfo({ sourceAddress: event.target.value });
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
