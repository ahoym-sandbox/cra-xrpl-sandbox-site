import { Handler } from '@netlify/functions';
import { Context } from '@netlify/functions/dist/function/context';
import { Event } from '@netlify/functions/dist/function/event';
import { XummSdk } from 'xumm-sdk';

console.log('TEST LOG HERE', process.env);

const Sdk = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET);

const handler: Handler = async (event: Event, context: Context) => {
  console.log('Hit xummPayment handler');

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const txJson = JSON.parse(event.body).txJson;
  let response;

  try {
    console.log(
      'Attempting to create xumm payload with',
      JSON.stringify(txJson)
    );
    response = await Sdk.payload.create(txJson);
  } catch (e) {
    console.log('Error creating xumm payload', e);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to create Xumm payload',
      }),
    };
  }
  console.log('Successfully created xumm payload');

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export { handler };
