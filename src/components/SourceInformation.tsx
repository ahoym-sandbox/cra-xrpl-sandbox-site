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

export const SourceInformation = ({
  setSourceInfo,
}: SourceInformationProps) => {
  return (
    <Card>
      <FieldRow container spacing={2}>
        <Grid item>
          <TextInput
            placeholder="From Network"
            onBlur={(event) => {
              setSourceInfo({ token: event.target.value });
            }}
          />
        </Grid>
        <Grid item>
          <TextInput
            placeholder="Token"
            onBlur={(event) => {
              setSourceInfo({ token: event.target.value });
            }}
          />
        </Grid>
        <Grid item>
          <TextInput
            placeholder="Amount"
            onBlur={(event) => {
              setSourceInfo({ amount: event.target.value });
            }}
          />
        </Grid>
      </FieldRow>

      <Grid container>
        <Grid item xs={12}>
          <TextInput
            placeholder="From Address"
            onBlur={(event) => {
              setSourceInfo({ sourceAddress: event.target.value });
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
