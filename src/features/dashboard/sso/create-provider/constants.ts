export const codeForButton = () => `
<button onClick={handleLogin} className="w-72 h-12 px-4 py-2 bg-button-primary-bg-active rounded-2xl flex justify-center items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
    <path d="M19.5 2C20.6046 2 21.5 2.89543 21.5 4V20C21.5 21.1046 20.6046 22 19.5 22H5.5C4.39543 22 3.5 21.1046 3.5 20V4C3.5 2.89543 4.39543 2 5.5 2H19.5ZM12.5 8.20312C9.29897 8.20312 6.59816 10.7903 5.75293 11.6934C5.5888 11.8687 5.5888 12.1313 5.75293 12.3066C6.59816 13.2097 9.29897 15.7969 12.5 15.7969C15.701 15.7969 18.4019 13.2096 19.2471 12.3066C19.4112 12.1313 19.4112 11.8687 19.2471 11.6934C18.4019 10.7904 15.701 8.20314 12.5 8.20312ZM10.665 10.9404C11.3406 9.77038 12.7104 9.29588 13.7236 9.88086C14.7368 10.4659 15.0105 11.8895 14.335 13.0596C13.6594 14.2296 12.2896 14.7041 11.2764 14.1191C10.2632 13.5341 9.98948 12.1105 10.665 10.9404Z" fill="white"/>
  </svg>
  
  <div className="text-center justify-center text-text-primary text-base leading-snug">
    Sign-in with Alien ID
  </div>
</button>
`;

export const codeForServer = (
  provider_address: string,
  provider_private_key: string,
  ssoUrl: string,
) =>
  `import express from 'express';
import bodyParser from 'body-parser';
import { AlienSsoSdkServer } from '@alien_org/sso-sdk-core';

const app = express();
app.use(bodyParser.json());

const alienSsoSdkServer = new AlienSsoSdkServer({
  providerAddress: '${provider_address}',
  providerPrivateKey: '${provider_private_key}',
  ssoBaseUrl: '${ssoUrl}',
});

app.post('/authorize', async (req, res) => {
  try {
    const { code_challenge } = req.body;

    const authResponse = await alienSsoSdkServer.authorize(code_challenge);

    res.json(authResponse);
  } catch (error) {
    console.error('POST /authorize error:', error);
    res.status(400).send('Authorize error');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
`;

export const codeForClient = (providerAddress: string, ssoUrl: string) =>
  `import { AlienSsoSdkClient } from '@alien_org/sso-sdk-core'

const alienSsoSdkClient = new AlienSsoSdkClient({
  ssoBaseUrl: '${ssoUrl}',
  serverSdkBaseUrl: 'http://localhost:3000',
});

const handleLogin = async () => {
  try {
    const { deep_link, polling_code, expired_at } = await alienSsoSdkClient.getAuthDeeplink();
    console.log('Received deeplink for authorization:', { deep_link, polling_code, expired_at });

    const authCode = await alienSsoSdkClient.pollAuth(polling_code);
    console.log('Received auth code:', { authCode });

    const accessToken = await alienSsoSdkClient.exchangeToken(authCode);
    console.log('Receive access token:', { accessToken });

    const isValid = await alienSsoSdkClient.verifyAuth(${providerAddress});
    console.log('Is access token valid:', { isValid });
  } catch (error) {
    console.error('Authorization failed', error);
    throw error;
  }
}`;
