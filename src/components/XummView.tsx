import { Button, Grid, Typography } from '@mui/material';
import { Card } from './Card';

export const XummView = () => {
  return (
    <Card borderRadius="16px">
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="body1">Not Connected</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained">Connect Your Wallet</Button>
        </Grid>
      </Grid>
    </Card>
  );
};
