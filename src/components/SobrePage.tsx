import React from 'react'
import { trpc } from '../utils/trpc';

interface SobrePageProps {
    Session: string | null
}

const SobrePage = ({Session}:SobrePageProps) => {
    const Username = trpc.useQuery(['user.findUsername',{
        userId: Session ?? ''
    }],{
        staleTime: Infinity,
        enabled: !!Session
    })
    return (
        <article className='hero min-h-screen'>
            <div className='hero-content mx-6 flex-col lg:flex-row bg-base-200 rounded-box'>
                <h1 className='text-5xl font-bold'>Olá, {Username.data && (Username.data)}</h1>
                <h2 className='text-4xl font-bold'>Como vai?</h2>
                <p>
                    &emsp; PC Builder se trata de um "mock project". Isto é, seria um projeto feito para uma empresa fictícia que lidaria com a montagem de computadores,
                    logo este seria o pretexto para a criação deste website.
                </p>
                <p >
                    &emsp; Este projeto teve como intuito aprender e aprimorar minhas habilidades e conceitos 
                    sobre a criação de websites/webapps que se encontram integrados com bancos de dados,
                    assim como desenvolver meu entendimento sobre React e Typescript.
                </p>
                <p >
                    &emsp; No geral, foi uma boa experiência programar este projeto. Infelizmente não pude integrar também uma API
                    como fonte de dados para as peças de um computador pela falta de existir uma API pública para isso.
                </p>
                <p>
                    <img src='https://raw.githubusercontent.com/reactjs/reactjs.org/main/src/icons/logo.svg'></img>
                </p>
            </div>
        </article>
    );
}

export default SobrePage;