import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Tipos from '.././utils/Tipos';
import { trpc } from "../utils/trpc";
import AutoComplete from "./subcomponents/AutoComplete";
import Buttons from "./subcomponents/Buttons";
import Info from "./subcomponents/Info";

interface PCBuilderProps {
    Dados: {
        cpu: Tipos['cpu'],
        internal_hard_drive: Tipos['internal_hard_drive'],
        memory: Tipos['memory'],
        motherboard: Tipos['motherboard'],
        power_supply: Tipos['power_supply'],
        video_card: Tipos['video_card']
    },
    Session: string
}

const PCBuilder = ({Dados, Session}:PCBuilderProps) => {
    const [Clicked, setClicked] = useState(false);
    const [Parte, setParte] = useState<Tipos['parte']>('motherboard');
    const [Montagem, setMontagem] = useState<string[]>([]);
    const [MontagemPartes, setMontagemPartes] = useState<Tipos['parte'][]>([]);
    const [PCSelecionadoIndex, setPCSelecionadoIndex] = useState(Infinity);
    const [NomePC, setNomePC] = useState('');
    const [PCMessage, setPCMessage] = useState('');
    const [PCMessageClass, setPCMessageClass] = useState(['','']);
    const AutoCompleteRef = useRef<HTMLInputElement>(null);
    let UserPCsNomes:string[] = []
    const CriarPc = trpc.useMutation(['pc.criarPc']);
    const AtualizarPc = trpc.useMutation(['pc.atualizarPc']);
    const DeletarPc = trpc.useMutation(['pc.deletarPc']);
    const UserPCs = trpc.useQuery(['user.findUserPCs',{
        userId: Session,
    }],{
        staleTime: Infinity,
        enabled: !!Session,
    });
    if(UserPCs.data){
        UserPCsNomes = UserPCs.data.pcs.map((PC) => PC.nome)
    }
    let SuggestionsArray: string[] = GetSuggestionsArray({Dados,Session}, Parte);
    if(MontagemPartes.includes('motherboard')){
        if(Parte === 'cpu'){
            let Index = MontagemPartes.findIndex((Parte) => Parte === 'motherboard');
            if(Montagem[Index].includes('AM4')){
                SuggestionsArray = SuggestionsArray.filter((Suggestion) => Suggestion.includes('AMD'));
            } else if(Montagem[Index].includes('LGA')){
                SuggestionsArray = SuggestionsArray.filter((Suggestion) => Suggestion.includes('Intel'))
                if(Montagem[Index].includes('1200')){
                    SuggestionsArray = SuggestionsArray.filter((Suggestion) => Suggestion.includes('-10') || Suggestion.includes('-11'))
                } else if(Montagem[Index].includes('1151')){
                    SuggestionsArray = SuggestionsArray.filter((Suggestion) => Suggestion.includes('-6') || Suggestion.includes('-7') || Suggestion.includes('-8') || Suggestion.includes('-9'))
                }
            }
        }
    }
    useEffect(() => {
        if(Clicked){
            AutoCompleteRef.current?.focus();
        } 
    }, [Clicked])
    const handleChange = {
        handleNomePC: (e:React.ChangeEvent<HTMLInputElement>) => {
            setNomePC(e.currentTarget.value);
            if(UserPCsNomes.includes(e.currentTarget.value)){
                const Index = UserPCsNomes.findIndex((Nome) => Nome === e.currentTarget.value)
                setPCSelecionadoIndex(Index)
            }
        },
        handlePCSelecionado: (e:React.ChangeEvent<HTMLSelectElement>) => {
            if(UserPCs.data){
                const Index = Number(e.target.value);
                const NomePCSelecionado = e.target.options[Index+1].innerText;
                setPCSelecionadoIndex(Index);
                setNomePC(NomePCSelecionado);
                setMontagem(UserPCs.data.pcs[Index].partes);
                setMontagemPartes(UserPCs.data.pcs[Index].partesTipos as unknown as Tipos['parte'][]);
                setTimeout(() => {
                    setPCMessageClass(['',''])
                    setPCMessage('');
                },5000)
                setPCMessageClass(['alert alert-success shadow-lg', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z']);
                setPCMessage('Configuração carregada com sucesso.');
            }
        }
    }
    const handleKeydown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            handleClickButton.CriarPc()
        }
    }
    const handleSubmit = (e:React.FormEvent, Input:string) => {
        e.preventDefault();
        if(Input !== '' && SuggestionsArray.find((Suggestion) => Suggestion === Input ? true : false)){
            setMontagemPartes([...MontagemPartes, Parte]);
            setMontagem([...Montagem, Input]);
            setClicked(false);
        } else {
            setTimeout(() => {
                setPCMessageClass(['',''])
                setPCMessage('');
            },5000)
            setPCMessageClass(['alert alert-error shadow-lg', 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z']);
            setPCMessage('Input inválido');
        }
    }
    const handleClickButton = {
        ColocarParte : (Parte:Tipos['parte']) => {
            setClicked(Clicked ? false : true);
            if(!Clicked){
                setParte(Parte);
            } 
        },
        RetirarParte : (Parte:Tipos['parte']) => {
            if(Parte === 'motherboard'){
                let Index = MontagemPartes.findIndex((Partes) => Partes === 'power_supply');
                setMontagemPartes(MontagemPartes.filter((Partes) => Partes === 'power_supply'));
                setMontagem(Montagem.filter((Partes) => Montagem.indexOf(Partes) === Index));
            } else {
                let Index = MontagemPartes.findIndex((Partes) => Partes === Parte);
                setMontagemPartes(MontagemPartes.filter((Partes) => Partes !== Parte));
                setMontagem(Montagem.filter((Partes) => Montagem.indexOf(Partes) !== Index));
            }
        },
        CriarPc : () => {
            if(NomePC !== ''){
                CriarPc.mutate({
                    userId: Session,
                    nome: NomePC.trim(),
                    partes: Montagem,
                    partesTipos: MontagemPartes
                },{
                   onError: (error) => {
                        setTimeout(() => {
                            setPCMessageClass(['',''])
                            setPCMessage('');
                        },10000)
                        setPCMessageClass(['alert alert-error shadow-lg', 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z']);
                        setPCMessage(error.message);
                    },
                    onSuccess: (data) => {
                        UserPCs.refetch();
                        setTimeout(() => {
                            setPCMessageClass(['',''])
                            setPCMessage('');
                        },10000)
                        setPCMessageClass(['alert alert-success shadow-lg', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z']);
                        setPCMessage(data);
                        setPCSelecionadoIndex(Infinity);
                        setNomePC('');
                        setClicked(false);
                        setParte('motherboard');
                        setMontagem([]);
                        setMontagemPartes([]);
                    }
                }) 
            } else {
                setTimeout(() => {
                    setPCMessageClass(['',''])
                    setPCMessage('');
                },3000)
                setPCMessageClass(['alert alert-error shadow-lg', 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z']);
                setPCMessage('Preencha o nome, por favor.');
            }
        },
        AtualizarPc: () => {
            AtualizarPc.mutate({
                userId: Session,
                nome: NomePC,
                partes: Montagem,
                partesTipos: MontagemPartes
            },{
                onError: (error) => {
                    setTimeout(() => {
                        setPCMessageClass(['',''])
                        setPCMessage('');
                    },10000)
                    setPCMessageClass(['alert alert-error shadow-lg', 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z']);
                    setPCMessage(error.message);
                },
                onSuccess: (data) => {
                    UserPCs.refetch();
                    setTimeout(() => {
                        setPCMessageClass(['','']);
                        setPCMessage('');
                    },10000)
                    setPCSelecionadoIndex(Infinity);
                    setNomePC('');
                    setPCMessageClass(['alert alert-success shadow-lg', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z']);
                    setPCMessage(data);
                    setClicked(false);
                    setParte('motherboard');
                    setMontagem([]);
                    setMontagemPartes([]);
                }
            });
        },
        DeletarPc: () => {
            DeletarPc.mutate({
                userId: Session,
                nome: NomePC
            },{
                onError: (error) => {
                    setTimeout(() => {
                        setPCMessageClass(['',''])
                        setPCMessage('');
                    },10000)
                    setPCMessageClass(['alert alert-error shadow-lg', 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z']);
                    setPCMessage(error.message);
                },
                onSuccess: (data) => {
                    UserPCs.refetch();
                    setTimeout(() => {
                        setPCMessageClass(['','']);
                        setPCMessage('');
                    },10000)
                    setPCSelecionadoIndex(Infinity);
                    setNomePC('');
                    setPCMessageClass(['alert alert-success shadow-lg', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z']);
                    setPCMessage(data);
                    setClicked(false);
                    setParte('motherboard');
                    setMontagem([]);
                    setMontagemPartes([]);
                }
            });
        }
    }
    return (
        <div className="relative flex flex-col pt-16 w-auto h-screen overflow-y-auto">
            <AutoComplete
                ref={AutoCompleteRef}
                className="form-control max-w-lg bg-base-200 p-1 pb-3 pl-2 pr-2 rounded-box ml-7 mt-4 text-blue-500 italic"
                Label={TraduzirParte(Parte)}
                handleSubmit={handleSubmit} 
                Clicked={Clicked}
                Suggestions={SuggestionsArray}
            />
            <select 
                value={PCSelecionadoIndex} 
                className="absolute left-[550px] top-[112px] bg-white text-neutral select select-bordered w-full max-w-xs"
                onChange={(e) => handleChange.handlePCSelecionado(e)}
            >
                <option hidden value={Infinity}>Ou selecione um PC já salvo</option>
                {UserPCs.data?.pcs.map((PC, Index) => 
                    <option key={Index} value={Index}>{PC.nome}</option>
                )}
            </select>
            <div className="relative">
                <div className="absolute bg-base-200 rounded-box ml-5 mt-5 h-fit w-fit">
                    <img className="m-5 w-96 z-0" src="/Computador_case.png" alt="gabineteImg" />
                    <Buttons
                        Clicked={Clicked}
                        MontagemPartes={MontagemPartes}
                        handleClickButton={handleClickButton}
                        TraduzirParte={TraduzirParte}
                    />
                </div>
                <div className="absolute left-[450px] pt-5 flex flex-row flex-wrap">
                    {Montagem.map((Parte, Index) => 
                        <Info
                            key={Index}
                            Dados={Dados}
                            Input={Parte}
                            Parte={MontagemPartes[Index]}
                            TraduzirParte={TraduzirParte}
                        />)
                    }
                </div>
                <input 
                    className="input input-bordered input-info absolute top-[462px] left-[75px] w-full max-w-xs"
                    placeholder="Nome da configuração"
                    disabled={MontagemPartes.length !== 6 ? true : false}
                    value={NomePC}
                    onChange={(e) => handleChange.handleNomePC(e)}
                    onKeyDown={(e) => handleKeydown(e)}
                >
                </input>
                {!UserPCsNomes.includes(NomePC) && (
                    <button 
                        className="btn btn-primary absolute top-[525px] left-[125px]"
                        disabled={MontagemPartes.length !== 6 ? true : false}
                        onClick={(e) => handleClickButton.CriarPc()}
                    >
                    Salvar configuração
                    </button>
                )}
                {UserPCsNomes.includes(NomePC) && (
                    <>
                        <button 
                            className="btn btn-success absolute top-[525px] left-[125px]"
                            disabled={MontagemPartes.length !== 6 ? true : false}
                            onClick={(e) => handleClickButton.AtualizarPc()}
                        >
                        Atualizar
                        </button>
                            <button 
                            className="btn btn-error absolute top-[525px] left-[250px]"
                            disabled={MontagemPartes.length !== 6 ? true : false}
                            onClick={(e) => handleClickButton.DeletarPc()}
                        >
                        Deletar
                        </button>
                    </>
                )}
                <div className={PCMessageClass[0] +' absolute max-w-xs top-[600px] left-[75px]'}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={PCMessageClass[1]} /></svg>
                        <span>{PCMessage}</span>
                    </div>
                </div>
            </div> 
        </div>
    )
}

const TraduzirParte = (Parte:Tipos['parte']) => {
    return (
        Parte === 'video_card' ? 'Placa de video':
        Parte === 'memory' ? 'Memoria':
        Parte === 'internal_hard_drive' ? 'HDD/SSD':
        Parte === 'power_supply' ? 'Fonte de energia':
        Parte === 'motherboard' ? 'Placa-mae':
        'Processador'
    )
}

const GetSuggestionsArray = ({Dados}:PCBuilderProps, Parte:Tipos['parte']) => {
    let SuggestionsArray:string[] = []
    Parte === 'video_card' ? Dados[Parte].forEach((Dado) => SuggestionsArray.push(Dado.name + ' ' + Dado.chipset)) :
    Parte === 'memory' ? Dados[Parte].forEach((Dado) => SuggestionsArray.push(Dado.name + ' ' + Dado.speed)) :
    Parte === 'internal_hard_drive' ? Dados[Parte].forEach((Dado) => SuggestionsArray.push(Dado.name + ' ' + Dado.capacity + ' ' + Dado.type)) :
    Parte === 'power_supply' ? Dados[Parte].forEach((Dado) => SuggestionsArray.push(Dado.name + ' ' + Dado.wattage + ' ' + (typeof Dado.modular === 'string' ? Dado.modular + ' Modular' : ''))) :
    Parte === 'motherboard' ? Dados[Parte].forEach((Dado) => SuggestionsArray.push(Dado.name + ' ' + Dado.socket_cpu)) :
    Dados[Parte].forEach((Dado) => SuggestionsArray.push(Dado.name));
    const SuggestionsSet = new Set(SuggestionsArray);
    SuggestionsArray = Array.from(SuggestionsSet);
    return SuggestionsArray; 
}

export default PCBuilder;