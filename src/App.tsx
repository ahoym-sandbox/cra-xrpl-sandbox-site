import styled from '@emotion/styled';
import { Container, Grid, Typography } from '@mui/material';
import { BridgeForm } from './BridgeForm/BridgeForm';
import { XummView } from './components/XummView';
import { xrplClient1 } from './XrplSandbox/createClients';

(window as any).xrplClient1 = xrplClient1.generateWallet();

const Background = styled(Container)`
  height: 100vh;
`;
const HeaderSection = styled(Grid)`
  height: 30vh;
`;
const BodySection = styled(Grid)`
  height: 70vh;
`;

function App() {
  return (
    <Background maxWidth="xl">
      <HeaderSection
        container
        alignItems="center"
        justifyContent="space-around"
      >
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
      </HeaderSection>

      <BodySection container justifyContent="center">
        <BridgeForm />
      </BodySection>
    </Background>
  );
}

export default App;
