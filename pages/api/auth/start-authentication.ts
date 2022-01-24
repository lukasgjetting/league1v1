import { NextApiRequest, NextApiResponse } from "next";
import { escape } from "promise-mysql";
import shortUUID from "short-uuid";
import { getUserBySummonerName, query } from "../../../utils/db";

const runePageNameTranslator = shortUUID('123456789');

const createToken = async (
  req: NextApiRequest,
  res: NextApiResponse<string>
) => {
  const { summonerName } = req.body;

  let user = await getUserBySummonerName(summonerName);

  if (user == null) {
    await query(`
      INSERT INTO users
      (summonerName)
      VALUES (${escape(summonerName)})
    `)

    user = await getUserBySummonerName(req.body.summonerName);
  }
  
  const runePageName = `L-${runePageNameTranslator.new().substring(0, 5)}`;
  const token = shortUUID.uuid();

    await query(`
        INSERT INTO user_tokens
        (userId, runePageName, token)
        VALUES (${user.id}, '${runePageName}', '${token}')
    `);

    res.send(JSON.stringify(runePageName));
};

export default createToken;