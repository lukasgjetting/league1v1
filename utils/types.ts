import { Server } from "./enums";

export type User = {
    id: number;
    server: Server;
    summonerName: string;
    leagueSummonerId: string;
    leagueAccountId: string;
    leaguePuuid: string;
    verified: boolean;
    createdAt: Date;
};

export type UserToken = {
    id: number;
    userId: string;
    token: string;
    thirdPartyCode: string;
    active: boolean;
    createdAt: Date;
    lastUsed: Date;
};
