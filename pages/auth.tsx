import { useState } from "react";
import sendApiRequest from "../utils/sendApiRequest";

export const getServerSideProps = async () => {
    return {
        props: {},
    };
};

const AuthScreen = () => {
    const [summonerName, setSummonerName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const [runePageName, setRunePageName] = useState<string>();

    const startAuthentication = async () => {
        setLoading(true);
        setError(undefined);

        try {
            const newRunePageName = await sendApiRequest<string>('/api/auth/start-authentication', {
                method: 'post',
                body: {
                    summonerName,  
                },
            });

            setRunePageName(newRunePageName);
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
            const token = await sendApiRequest<string>('/api/auth/activate-token', { method: 'post' });

            localStorage.setItem('token', token);
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
            {runePageName == null ? (
                <>
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
                    Rename your first rune page to
                    {' '}
                    <span className="bg-slate-900 rounded-sm px-2 py-0.5 text-white">{runePageName}</span>
                    <br/>
                    <button className="bg-slate-300" type="button" onClick={verifyRunePage}>ok ready</button>
                </>
            )}
        </div>
    );
};

export default AuthScreen;