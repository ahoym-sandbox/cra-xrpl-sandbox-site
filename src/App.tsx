import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { BridgeForm } from './BridgeForm/BridgeForm';
import { XummView } from './components/XummView';
import { xrplClient1 } from './XrplSandbox/createClients';

(window as any).xrplClient1 = xrplClient1.generateWallet();

const Background = styled(Grid)`
  background-color: #e8ecf0;
  height: 100vh;
`;

function App() {
  return (
    <Background container justifyContent="center">
      <Grid container alignItems="center" justifyContent="space-around">
        <Grid item xs={12} lg={3} />
        <Grid container item xs={6} justifyContent="center">
          <Grid item justifyContent="flex-end">
            <Typography variant="h2">XRPL Bridge</Typography>
            <Typography variant="subtitle1">
              Move and transfer tokens from one chain to another
            </Typography>
          </Grid>
        </Grid>

        <Grid container item xs={12} lg={3} justifyContent="center">
          <Grid item />
          <Grid item>
            <XummView />
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <BridgeForm />
      </Grid>
    </Background>
  );
}

export default App;
