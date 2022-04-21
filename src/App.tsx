import styled from '@emotion/styled';
import { BridgeForm } from './BridgeForm/BridgeForm';
import { Flex } from './components/layouts/Flex';
import { XummView } from './components/XummView';
import { xrplClient1 } from './XrplSandbox/createClients';

(window as any).xrplClient1 = xrplClient1.generateWallet();

const Background = styled.div`
  background-color: #e8ecf0;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-areas:
    '. header header header actions'
    '. main main main .';
  padding: 1rem;
`;

const HeaderArea = styled.div`
  grid-area: header;
`;
const ActionsArea = styled.div`
  grid-area: actions;
`;
const MainArea = styled.div`
  grid-area: main;
`;

function App() {
  return (
    <Background>
      <HeaderArea>
        <Flex flexDirection="column">
          <h1>XRPL Bridge</h1>
          <p>Move and transfer tokens from one chain to another</p>
        </Flex>
      </HeaderArea>
      <ActionsArea>
        <XummView />
      </ActionsArea>

      <MainArea>
        <BridgeForm />
      </MainArea>
    </Background>
  );
}

export default App;
