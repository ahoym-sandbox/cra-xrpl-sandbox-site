import { Handler } from '@netlify/functions';
import { Context } from '@netlify/functions/dist/function/context';
import { Event } from '@netlify/functions/dist/function/event';
import { XummSdk } from 'xumm-sdk';

console.log('TEST LOG HERE', process.env);

const Sdk = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET);

const handler: Handler = async (event: Event, context: Context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const pong = await Sdk.ping();

  return {
    statusCode: 200,
    body: JSON.stringify({
      response: event.body,
      pong,
    }),
  };
};

export { handler };
