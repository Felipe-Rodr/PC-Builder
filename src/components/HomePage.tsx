import { CookieValueTypes } from 'cookies-next';
import React from 'react'

interface HomePageProps {
  Session: CookieValueTypes | null
}

const HomePage = ({Session}:HomePageProps) => {
  return (
    <div 
      className='hero min-h-screen z-10' 
      style={{
        backgroundImage: "url(/PC-Builder-Bg4.png)", 
        backgroundRepeat: 'no-repeat', 
        backgroundSize: '100% auto',
        backgroundPositionY: 'top',
      }}
    >
    <div className='hero-overlay bg-opacity-60'/>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold'>PC Builder:</h1>
          <p className='mb-5'>
            Plataforma para a montagem de computadores com a segurança e o suporte que você precisa para adquirir o PC dos seus sonhos!
          </p>
          <a href={Session ? '/montarPc' : '/login'} className='btn btn-primary'>Começar</a>
        </div>
      </div>   
    </div>
  );
}

export default HomePage;