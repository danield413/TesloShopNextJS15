'use client'

import { logout } from "@/actions"
import { useUIStore } from "@/store"
import clsx from "clsx"
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShareOutline, IoTicketOutline } from "react-icons/io5"
import { signOut, useSession } from "next-auth/react"
import { Session } from "next-auth"

interface Props {
    userSession: Session;
}

export const Sidebar = ({ userSession }: Props) => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeSideMenu = useUIStore(state => state.closeSideMenu);

    console.log("User Session: ", userSession);
    const isAuthenticated = !!userSession?.user;

    const role = userSession?.user?.role;

    // const { data: session } = useSession();
    // const isAuthenticated = !!session?.user;

    // console.log("Session: ", session);


    return (
        <div>

            {/* BG black */}
            {
                isSideMenuOpen && (
                    <div
                        className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30">
                    </div>
                )
            }


            {/* BG blur */}
            {
                isSideMenuOpen && (
                    <div
                        onClick={closeSideMenu}
                        className="fixed-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"></div>
                )
            }

            {/* SideMenu */}
            <nav
                // todo: efecto de slide
                className={clsx("fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300", {
                    "translate-x-full": !isSideMenuOpen,
                })}>


                <IoCloseOutline
                    className="absolute top-5 right-5 cursor-pointer"
                    size={50}
                    onClick={() => closeSideMenu()}
                />

                {/* Input */}
                <div className="relative mt-14">
                    <IoSearchOutline size={20} className="absolute top-2 left-2" />
                    <input type="text" placeholder="Buscar"
                        className="w-full bg-gray-50 pl-10 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                </div>



                {
                    isAuthenticated && (
                        <>
                            <Link href="/profile"
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                                onClick={() => closeSideMenu()}

                            >
                                <IoPersonOutline size={30} />
                                <span className="ml-3 text-xl">Perfil</span>
                            </Link>

                            <Link href="/orders"
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                                onClick={() => closeSideMenu()}
                            >
                                <IoTicketOutline size={30} />
                                <span className="ml-3 text-xl">Ordenes</span>
                            </Link>

                            <button
                                className=" w-full flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                                onClick={() => signOut()}
                            >
                                <IoLogOutOutline size={30} />
                                <span className="ml-3 text-xl">Salir</span>
                            </button>
                        </>


                    )
                }

                {
                    !isAuthenticated && (
                        <Link href="/auth/login"
                            className=" w-full flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                            onClick={() => closeSideMenu()}
                        >
                            <IoLogInOutline size={30} />
                            <span className="ml-3 text-xl">Ingresar</span>
                        </Link>
                    )
                }

                {
                    role === 'admin' && (
                        <>
                            <div className="w-full h-px bg-gray-200 my-10" />

                            <Link href="/"
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                            >
                                <IoShareOutline size={30} />
                                <span className="ml-3 text-xl">Productos</span>
                            </Link>

                            <Link href="/"
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                            >
                                <IoTicketOutline size={30} />
                                <span className="ml-3 text-xl">Ordenes</span>
                            </Link>

                            <Link href="/"
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                            >
                                <IoPeopleOutline size={30} />
                                <span className="ml-3 text-xl">Usuarios</span>
                            </Link>
                        </>
                    )
                }



            </nav>


        </div>
    )
}
