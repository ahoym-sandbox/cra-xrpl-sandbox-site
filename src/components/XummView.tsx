import { Button } from './Button';
import { Card } from './Card';
import { Flex } from './layouts/Flex';

export const XummView = () => {
  return (
    <Card borderRadius="16px">
      <Flex justifyContent="space-between">
        <div>Not Connected</div>
        <Button>Connect Your Wallet</Button>
      </Flex>
    </Card>
  );
};
