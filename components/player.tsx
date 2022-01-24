import { FC, useState } from 'react'

type Props = {
    playerName: string;
    elo: number;
}

const Player: FC<Props> = ({playerName, elo}) => {

    return (
    <div className=""> 
        {playerName + elo}
    </div>
    )
}

export default Player
