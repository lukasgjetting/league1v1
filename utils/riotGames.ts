import 'dotenv/config';
import { Server } from "./enums";

const apiKey = process.env.RIOT_GAMES_API_KEY;

console.log(apiKey)
const getBaseUrl = (server: Server) => `https://${server}.api.riotgames.com/lol`;

const sendRequest = async (server: Server, path: string) => {
    const result = await fetch(
        `${getBaseUrl(server)}${path}`,
        {
            headers: {
                'X-Riot-Token': apiKey,
            }
        }
    );
    const json = await result.json();

    return json;
};

export const getSummonerDetailsByName = (server: Server, summonerName: string) => sendRequest(
    server,
    `/summoner/v4/summoners/by-name/${summonerName}`,
);

export const getLatestThirdPartyCode = (server: Server, summonerId: string) => sendRequest(
    server,
    `/platform/v4/third-party-code/by-summoner/${summonerId}`
);