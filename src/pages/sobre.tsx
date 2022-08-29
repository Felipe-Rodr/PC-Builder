import { getCookie, setCookie } from 'cookies-next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react'
import Header from '../components/Header';
import SobrePage from '../components/SobrePage';

const sobre = ({Session}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div 
            data-theme='night' 
            className='w-screen h-screen'
        >
            <Header Session={Session} isSobrePage={true}/>
            <SobrePage Session={Session}/>
        </div>
    );
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
        props:{
            Session: null
        }
    }
}

export default sobre;