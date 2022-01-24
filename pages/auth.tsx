import { useState } from "react";
import { Server } from "../utils/enums";
import sendApiRequest from "../utils/sendApiRequest";

export const getServerideProps = async () => {
    return {
        props: {},
    };
};

const AuthScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const [server, setServer] = useState(Object.values(Server)[0]);
    const [summonerName, setSummonerName] = useState('');

    const [thirdPartyCode, setthirdPartyCode] = useState<string>();
    const [token, setToken] = useState<string>();

    const startAuthentication = async () => {
        setLoading(true);
        setError(undefined);

        try {
            const result = await sendApiRequest<{
                token: string;
                thirdPartyCode: string;
            }>('/api/auth/start-authentication', {
                method: 'post',
                body: {
                    server,
                    summonerName,  
                },
            });

            setthirdPartyCode(result.thirdPartyCode);
            setToken(result.token);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    const verifyRunePage = async () => {
        setLoading(true);
        setError(undefined);

        try {
            await sendApiRequest<string>('/api/auth/activate-token', {
                method: 'post',
                body: { token },
            });

            localStorage.setItem('token', token!);
            alert('ur rdy!');
            window.location.href = 'https://legoland.dk';
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-4">
            {loading && (
                <span>loading</span>
            )}
            {error && (
                <span>error: {error}</span>
            )}
            {thirdPartyCode == null ? (
                <>
                <select value={server} onChange={(e) => setServer(e.target.value as Server)}>
                    {Object.entries(Server).map(([label, value]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                <input
                    placeholder="sum name plz"
                    value={summonerName}
                    onChange={(e) => setSummonerName(e.target.value)}
                />
                <br/>
                <button className="bg-slate-300" type="button" onClick={startAuthentication}>submit</button>
                </>
            ) : (
                <>
                    Enter third party code 
                    {' '}
                    <span className="bg-slate-900 rounded-sm px-2 py-0.5 text-white">{thirdPartyCode}</span>
                    <br/>
                    <button className="bg-slate-300" type="button" onClick={verifyRunePage}>ok ready</button>
                </>
            )}
        </div>
    );
};

export default AuthScreen;