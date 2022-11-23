import type { NextApiRequest, NextApiResponse } from 'next';
import spotifyWebApi from 'spotify-web-api-node';

type Data = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const code = req.body.code;

  const spotifyAPI = new spotifyWebApi({
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  try {
    spotifyAPI
      .authorizationCodeGrant(code)
      .then((data) => {
        res.status(200).json({
          access_token: data.body.access_token,
          refresh_token: data.body.refresh_token,
          expires_in: data.body.expires_in,
        });
      })
      .catch(() => {
        res.status(400);
      });
  } catch (err) {
    res.status(400).json({ error: 'failed to login' });
  }
}
