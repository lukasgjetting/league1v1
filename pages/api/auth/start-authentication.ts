import { NextApiRequest, NextApiResponse } from "next";
import { escape } from "promise-mysql";
import shortUUID from "short-uuid";
import { getUserBySummonerName, query } from "../../../utils/db";
import { getSummonerDetailsByName } from "../../../utils/riotGames";

const thirdPartyCodeTranslator = shortUUID('123456789');

const startAuthentication = async (
  req: NextApiRequest,
  res: NextApiResponse<string>
) => {
  const { summonerName, server } = req.body;

  let user = await getUserBySummonerName(summonerName);

  if (user == null) {
    const details = await getSummonerDetailsByName(server, summonerName);

    await query(`
      INSERT INTO users
      (summonerName, server, leaguePuuid, leagueAccountId, leagueSummonerId)
      VALUES (
        ${escape(summonerName)},
        ${escape(server)},
        ${escape(details.puuid)},
        ${escape(details.accountId)},
        ${escape(details.id)}
      )
    `)

    user = await getUserBySummonerName(req.body.summonerName);
  }
  
  const thirdPartyCode = `L-${thirdPartyCodeTranslator.new().substring(0, 5)}`;
  const token = shortUUID.uuid();

    await query(`
        INSERT INTO user_tokens
        (userId, thirdPartyCode, token)
        VALUES (${user.id}, '${thirdPartyCode}', '${token}')
    `);

    res.send(JSON.stringify({ token, thirdPartyCode }));
};

export default startAuthentication;