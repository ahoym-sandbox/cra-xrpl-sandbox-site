import { convertStringToHex } from 'xrpl';
import { DestinationFormInfo, SourceFormInfo } from './types';

export async function sendXummPayment(
  payload: SourceFormInfo & DestinationFormInfo
) {
  const destinationAccountHex = convertStringToHex(payload.destinationAddress);

  try {
    const response = await fetch('/.netlify/functions/xummPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        txJson: {
          TransactionType: 'Payment',
          Destination: 'rfZQn3mEcLbVT6z6kGuh5wYMBdU9xbof6a', // Should be door account
          Amount: payload.amount,
          Memos: [
            {
              Memo: {
                MemoData: destinationAccountHex,
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
