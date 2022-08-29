import React, { useState } from 'react'
import Tipos from '../.././utils/Tipos'

interface ButtonProps {
    classNameButton: string,
    classNameText: string
    Parte: Tipos['parte'],
    Clicked: boolean,
    hasMotherboard: boolean,
    hasParte: boolean,
    handleClickButton: {
        ColocarParte: (Parte:Tipos['parte']) => void,
        RetirarParte: (Parte:Tipos['parte']) => void
    },
    TraduzirParte: (Parte:Tipos['parte']) => string
}

const Button = ({classNameButton, classNameText, Parte, Clicked, hasMotherboard, hasParte, handleClickButton, TraduzirParte}:ButtonProps) => {
    const [MouseHover, setMouseHover] = useState(false);
    const handleMouseHover = () => {
        setMouseHover(true);
    }
    const handleMouseLeave = () => {
        setMouseHover(false);
    }
    return (
        <>
            <button 
                className={classNameButton} 
                onMouseEnter={handleMouseHover} 
                onMouseLeave={handleMouseLeave} 
                disabled={hasParte || !hasMotherboard} 
                hidden={hasParte || !hasMotherboard} 
                onClick={() => handleClickButton.ColocarParte(Parte)}
            />
            <div className={classNameText} hidden={MouseHover && !hasParte ? false : true}>
                {MouseHover && !Clicked ? 'Colocar ' + TraduzirParte(Parte) : MouseHover && Clicked ? 'Cancelar' : ''}
            </div>
            <button 
                className={classNameButton + ' pb-1 leading-none text-sm text-blue-500'} 
                onMouseEnter={handleMouseHover} 
                onMouseLeave={handleMouseLeave} 
                disabled={!hasParte || Clicked} 
                hidden={!hasParte || Clicked} 
                onClick={() => handleClickButton.RetirarParte(Parte)}
            >
                x
            </button>
            <div className={classNameText} hidden={MouseHover && hasParte? false : true}>
                {MouseHover && !Clicked ? 'Retirar ' + TraduzirParte(Parte) : ''}
            </div>
        </>
    );
}

export default Button;