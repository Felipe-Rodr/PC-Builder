import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import React from 'react'
import Header from '../components/Header';
import RegistrarPage from '../components/RegistrarPage';

interface loginProps {

}

const login = ({}:loginProps) => {
    return (
        <div 
            data-theme='night' 
            className='w-screen h-screen flex flex-col' 
            style={{
                backgroundImage: "url(/PC-Builder-Bg5.png)", 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: '100% auto',
                backgroundPositionY: 'center',
            }}
        >
            <Header Session={null} isRegistrarPage={true}/>
            <RegistrarPage/>
        </div>
    );
}


export const getServerSideProps:GetServerSideProps = async ({req,res}) => {
    const Session = getCookie('sessionPCBuilder',{
        req:req,
        res:res
    });
    if(Session){
       return {
            redirect: {
                destination: '/',
                permanent: false
            }
       } 
    }
    return {
        props: {},
    }
}

export default login;