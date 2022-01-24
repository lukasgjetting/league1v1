import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Player from '../components/player'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

    const [button, setButton] = useState(true);
    const [matchFinding, setMatchFinding] = useState(false);
    const [matchFound, setMatchFound] = useState(true);

    const findMatch = () => {
        setButton(false);
        setMatchFinding(true);
    }

    if (matchFound) {
        return (
            <div className="bg-slate-800 h-screen flex justify-between flex-row items-center relative"> 
                <div className='border-yellow-600 rounded-sm border-solid border-2 ml-40 p-5 h-10'>
                    <Player playerName='AlexCE' elo={1200} />
                </div>
                <div className='border-yellow-300 rounded-full border-dashed animate-spin border-2 w-80 h-80'>
                </div>
                <div className='border-yellow-600 rounded-sm border-solid border-2 mr-40 p-5 h-10'>
                    <Player playerName='statuest' elo={1000} />
                </div>
                <div className='border-yellow-600 rounded-sm border-solid border-2 mr-40 p-5 h-10 absolute bottom-0 right-0 '>
                    chat
                </div>
            </div>
            
        )
    }

    return (
    <div className="bg-slate-800 h-screen items-center justify-center flex"> 
        {button && <button onClick={findMatch} className="bg-red-600 hover:bg-red-700 text-grey font-bold py-2 px-4 rounded">Find Match</button>}
        {matchFinding && (
        <div className='relative'>
            <span className='top-36 left-28 z-2 absolute text-white'>Finding match...</span>    
            <div className='border-yellow-300 rounded-full border-dashed animate-spin border-2 w-80 h-80'>
            </div>
        </div>
        )}
    </div>
    )
}

export default Home
