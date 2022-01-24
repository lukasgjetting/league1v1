import { useState } from "react";

export const getServerSideProps = async () => {
    return {
        props: {},
    };
};

const AuthScreen = () => {
    const [username, setUsername] = useState('');

    return (
        <div>Please enter your League of Legends summoner name</div>
    );
};

export default AuthScreen;