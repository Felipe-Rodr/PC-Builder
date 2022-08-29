import { CookieValueTypes } from "cookies-next";
import Link from "next/link";
import React from "react";
import { trpc } from "../utils/trpc";

interface HeaderProps {
    Session: CookieValueTypes | null,
    isSobrePage?: boolean,
    isLoginPage?: boolean,
    isRegistrarPage?: boolean,
    isHomePage?: boolean,
    isMontarPcPage?: boolean,
}

const Header = ({Session, isLoginPage, isRegistrarPage, isSobrePage, isHomePage, isMontarPcPage}:HeaderProps) => {
    const DesconectarUsuario = trpc.useMutation(['user.desconectarUser']);
    const handleClick = {
        Reload: () => {
            window.location.reload();
        },
        DesconectarUsuario: (e:React.MouseEvent<HTMLButtonElement>) => {
            DesconectarUsuario.mutate(undefined,{
                onSuccess: () => {
                    window.location.reload();
                }
            })
        }
    }   
    return(
        <header className="fixed top-0 w-full z-50">
            <nav className="navbar bg-base-300 text-primary-focus">
                <div className="flex-none">
                    <button className="btn btn-square ml-2 bg-transparent border-0 rounded-[10px] hover:scale-105" onClick={() => handleClick.Reload()}>
                        <img 
                            className="mask mask-circle" 
                            src="Build-Computer-Icon.png"
                        />
                    </button>
                </div>
                <div className="flex-1">
                    <a href='/' className="btn btn-ghost ml-1 p-2 normal-case text-lg">PC Builder</a>
                </div>
                {!Session && (
                    <div className="flex-none">
                        <ul className="menu menu-horizontal p-0">
                            {!isSobrePage && (
                                <li><Link href='/sobre'>Sobre</Link></li>
                            )}
                            {!isLoginPage && (
                                <li><Link href='/login'>Login</Link></li>
                            )}
                            {!isRegistrarPage && (
                                <li><Link href='/registrar'>Registrar</Link></li>
                            )}
                        </ul>
                    </div>
                )}
                {Session && (
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-circle btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </label>
                            <ul tabIndex={0} className='menu menu-compact dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52'>
                                {!isHomePage && (
                                    <li><a href='/'>Home</a></li>
                                )}
                                {!isMontarPcPage && (
                                    <li><Link href='/montarPc'>Montar computador</Link></li>
                                )}
                                {!isSobrePage && (
                                    <li><Link href='/sobre'>Sobre</Link></li>
                                )}
                                <li><button onClick={(e) => handleClick.DesconectarUsuario(e)}>Desconectar</button></li>
                            </ul>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header;