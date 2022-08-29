import { getCookie, setCookie } from 'cookies-next'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Header from '../components/Header'
import HomePage from '../components/HomePage'

const Home = ({Session}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div 
      data-theme='night' 
      className='w-screen flex flex-col'
    >
      <Header Session={Session} isHomePage={true}/>
      <HomePage Session={Session}/>
    </div>
  )
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

    }
  } 
}

export default Home