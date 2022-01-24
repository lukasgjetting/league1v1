import { NextApiRequest, NextApiResponse } from "next";
import { getUserByToken, getUserTokenByToken, query } from "../../../utils/db";
import { getLatestThirdPartyCode } from "../../../utils/riotGames";

const activateToken = async (
  req: NextApiRequest,
  res: NextApiResponse<string>
) => {
    const token = req.body.token;

    const userToken = await getUserTokenByToken(token);
    const user = await getUserByToken(token);

    const latestCode = await getLatestThirdPartyCode(user.server, user.leagueSummonerId)


    if (latestCode !== userToken.thirdPartyCode) {
      res.status(400).send('wrong code :(');

      return;
    }

    await query(`
      UPDATE users
      SET verified = 1
      WHERE id = ${user.id}
    `);

    res.send(JSON.stringify(null));
};

export default activateToken;