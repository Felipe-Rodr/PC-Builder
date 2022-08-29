import React from "react";
import Tipos from "../.././utils/Tipos";

interface InfoProps{
    Dados: {
        cpu: Tipos['cpu'],
        internal_hard_drive: Tipos['internal_hard_drive'],
        memory: Tipos['memory'],
        motherboard: Tipos['motherboard'],
        power_supply: Tipos['power_supply'],
        video_card: Tipos['video_card']
    },
    Input: string,
    Parte: Tipos['parte']
    TraduzirParte: (Parte:Tipos['parte']) => string
}

const Info = ({Dados, Input, Parte, TraduzirParte}:InfoProps) => {
    let Info:JSX.Element = <div></div>
    if(Input){
        const Dado = GetParte(Dados, Input, Parte)
        if(Dado){
            const PropertyArray = Object.entries(Dado)
            Info = (
                <ul className="ml-7 mt-4 p-2 rounded-box text-blue-500 italic bg-base-200">
                    {TraduzirParte(Parte)}:
                    {PropertyArray.map((Property,Index) => {
                        return(
                            <li key={Index} className="ml-5 mt-0">
                                {Property[0]}: {Property[1]}
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }
    return Info;
}

const GetParte = (Dados:InfoProps['Dados'], Input:string, Parte:Tipos['parte']) => {
    return (
        Parte === 'video_card' ? Dados[Parte].find((Dado) => Dado.name + ' ' + Dado.chipset === Input) :
        Parte === 'memory' ? Dados[Parte].find((Dado) => Dado.name + ' ' + Dado.speed === Input) :
        Parte === 'internal_hard_drive' ? Dados[Parte].find((Dado) => Dado.name + ' ' + Dado.capacity + ' ' + Dado.type === Input) :
        Parte === 'power_supply' ? Dados[Parte].find((Dado) => Dado.name + ' ' + Dado.wattage + ' ' + (typeof Dado.modular === 'string' ? Dado.modular + ' Modular' : '') === Input) :
        Parte === 'motherboard' ? Dados[Parte].find((Dado) => Dado.name + ' ' + Dado.socket_cpu === Input) :
        Dados[Parte].find((Dado) => Dado.name === Input)
    );
}

export default Info;