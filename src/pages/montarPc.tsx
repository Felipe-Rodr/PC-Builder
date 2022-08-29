import { getCookie, setCookie } from 'cookies-next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react'
import Header from '../components/Header';
import PCBuilder from '../components/PCBuilder';
import Tipos from '../utils/Tipos';

const montarPc = ({Session}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const Dados = GetDados();
  return (
    <div 
      data-theme='night' 
      className='w-screen flex flex-col'
    >
      <Header Session={Session} isMontarPcPage={true}/>
      <PCBuilder 
        Dados={Dados}
        Session={Session}
      />
    </div>
  );
}

const GetDados = () => {
  const Dados = {
    cpu: require('.././data/raw/cpu.json') as Tipos['cpu'],
    internal_hard_drive: require('.././data/raw/internal-hard-drive.json') as Tipos['internal_hard_drive'],
    memory: require('.././data/raw/memory.json') as Tipos['memory'],
    motherboard: require('.././data/raw/motherboard.json') as Tipos['motherboard'],
    power_supply: require('.././data/raw/power-supply.json') as Tipos['power_supply'],
    video_card: require('.././data/raw/video-card.json') as Tipos['video_card']
  }
  return Dados;
}

export const getServerSideProps:GetServerSideProps = async ({req,res}) => {
  let Session = getCookie('sessionPCBuilder',{
    req:req,
    res:res
  });
  if(Session){
    setCookie(
      'sessionPCBuilder',
      encodeURIComponent(Session),
      {
        req: req,
        res: res,
        maxAge: 60*10*6,
        sameSite: 'none',
        secure: true,
      }
    );
    Session = getCookie('sessionPCBuilder',{
      req:req,
      res:res
    })
    return {
      props: {
        Session: Session
      },
    }
  }
  return {
    redirect: {
      destination:'/login',
      permanent: false
    }
  }
}

export default montarPc;