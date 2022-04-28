import styled from '@emotion/styled';
import { Button, Card, Grid, Typography } from '@mui/material';

const XummViewCard = styled(Card)`
  padding: 16px;
`;

export const XummView = () => {
  return (
    <XummViewCard>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="body1">Not Connected</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained">Connect Your Wallet</Button>
        </Grid>
      </Grid>
    </XummViewCard>
  );
};
