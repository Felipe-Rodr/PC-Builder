import React from 'react'
import Tipos from '../.././utils/Tipos'
import Button from './Button'

interface ButtonsProps {
    Clicked: boolean,
    MontagemPartes: string[],
    handleClickButton: {
        ColocarParte: (Parte:Tipos['parte']) => void,
        RetirarParte: (Parte:Tipos['parte']) => void
    },
    TraduzirParte: (Parte:Tipos['parte']) => string
}

const Buttons = ({Clicked, MontagemPartes, handleClickButton, TraduzirParte}:ButtonsProps) => {
    return (
        <>
            <Button
                classNameButton="absolute left-32 bottom-64 w-5 h-5 bg-transparent border-solid rounded border-2 border-blue-500 hover:bg-indigo-400"
                classNameText="absolute left-32 bottom-56 text-blue-500 bg-white rounded italic"
                Parte="motherboard"
                Clicked={Clicked}
                hasMotherboard={!MontagemPartes.includes('motherboard') ? true : false}
                hasParte={MontagemPartes.includes('motherboard') ? true : false}
                handleClickButton={handleClickButton}
                TraduzirParte={TraduzirParte} 
            />
            <Button
                classNameButton="absolute left-32 bottom-48 w-5 h-5 bg-transparent border-solid rounded border-2 border-blue-500 hover:bg-indigo-400"
                classNameText="absolute left-32 bottom-40 text-blue-500 bg-white rounded italic z-10"
                Parte="video_card"
                Clicked={Clicked}
                hasMotherboard={MontagemPartes.includes('motherboard') ? true : false}
                hasParte={MontagemPartes.includes('video_card') ? true : false}
                handleClickButton={handleClickButton} 
                TraduzirParte={TraduzirParte} 
            />
            <Button
                classNameButton="absolute left-44 bottom-72 w-5 h-5 bg-transparent border-solid rounded border-2 border-blue-500 hover:bg-indigo-400"
                classNameText="absolute left-44 bottom-64 text-blue-500 bg-white rounded italic"
                Parte="memory"
                Clicked={Clicked}
                hasMotherboard={MontagemPartes.includes('motherboard') ? true : false}
                hasParte={MontagemPartes.includes('memory') ? true : false}
                handleClickButton={handleClickButton} 
                TraduzirParte={TraduzirParte} 
            />
            <Button
                classNameButton="absolute left-32 bottom-72 w-5 h-5 bg-transparent border-solid rounded border-2 border-blue-500 hover:bg-indigo-400"
                classNameText="absolute left-32 bottom-64 text-blue-500 bg-white rounded italic"
                Parte="cpu"
                Clicked={Clicked}
                hasMotherboard={MontagemPartes.includes('motherboard') ? true : false}
                hasParte={MontagemPartes.includes('cpu') ? true : false}
                handleClickButton={handleClickButton} 
                TraduzirParte={TraduzirParte} 
            />
            <Button
                classNameButton="absolute left-24 bottom-16 w-5 h-5 bg-transparent border-solid rounded border-2 border-blue-500 hover:bg-indigo-400"
                classNameText="absolute left-24 bottom-8 text-blue-500 bg-white rounded italic"
                Parte="power_supply"
                Clicked={Clicked}
                hasMotherboard={true}
                hasParte={MontagemPartes.includes('power_supply') ? true : false}
                handleClickButton={handleClickButton} 
                TraduzirParte={TraduzirParte} 
            />
            <Button
                classNameButton="absolute left-32 bottom-40 w-5 h-5 bg-transparent border-solid rounded border-2 border-blue-500 hover:bg-indigo-400"
                classNameText="absolute left-32 bottom-32 text-blue-500 bg-white rounded italic"
                Parte="internal_hard_drive"
                Clicked={Clicked}
                hasMotherboard={MontagemPartes.includes('motherboard') ? true : false}
                hasParte={MontagemPartes.includes('internal_hard_drive') ? true : false}
                handleClickButton={handleClickButton} 
                TraduzirParte={TraduzirParte} 
            />
        </>
    )
}

export default Buttons;