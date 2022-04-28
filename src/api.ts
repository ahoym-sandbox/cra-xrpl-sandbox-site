import { convertStringToHex } from 'xrpl';
import { DestinationFormInfo, SourceFormInfo } from './types';

/**
 * The account on the source chain that has a corresponding door account at the destination chain.
 *
 * For now, this is just a hardcoded account address for a generated account on TESTNET.
 */
const DOOR_ACCOUNT = 'rfZQn3mEcLbVT6z6kGuh5wYMBdU9xbof6a';

export async function sendXummPayment(
  payload: SourceFormInfo & DestinationFormInfo
) {
  const destinationNetworkAccountHex = convertStringToHex(
    payload.destinationAddress
  );

  try {
    const response = await fetch('/.netlify/functions/xummPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        txJson: {
          TransactionType: 'Payment',
          Destination: DOOR_ACCOUNT,
          Amount: payload.amount,
          Memos: [
            {
              Memo: {
                MemoData: destinationNetworkAccountHex,
              },
            },
          ],
        },
      }),
    });
    console.log('Received response from xumm', response);
    const responseJson = await response.json();
    console.log('Actual responseJson', responseJson);
    return responseJson;
  } catch (e: unknown) {
    console.log('SOMETHING WENT WRONG!', e);
    throw e;
  }
}
