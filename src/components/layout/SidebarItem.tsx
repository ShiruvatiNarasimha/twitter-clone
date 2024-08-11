import React, {useCallback} from 'react';
import {IconType} from "react-icons";
import {useRouter} from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import {useSetRecoilState} from "recoil";
import {loginModalAtom} from "@/store/modalAtoms";
import {BsDot} from "react-icons/bs";

interface SidebarItemProps {
    label: string;
    href?: string;
    icon: IconType;
    onClick?: ()=>void;
    isProtected?: boolean;
    alert?: boolean
}
const SidebarItem: React.FC<SidebarItemProps> = ({
        label,
        href,
        icon: Icon,
        onClick,
        isProtected,
        alert
    }) => {
    const setIsLoginOpen = useSetRecoilState(loginModalAtom);
    const { data } = useCurrentUser();
    const router = useRouter();

    const handleClick = useCallback(()=>{
        if (onClick) {
            return onClick();
        }
        if (isProtected && !data) {
            setIsLoginOpen({isOpen: true});
        }
        else if (href) {
            router.push(href);
        }
    }, [data, href, isProtected, onClick, router, setIsLoginOpen])
    return (
        <div onClick={handleClick} className="flex flex-row items-center">
            <div className="relative rounded-full h-14 w-14 justify-center items-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
                <Icon size={28} color="white"/>
                {alert? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />: null}
            </div>
            <div className="relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 items-center hover:bg-opacity-10 cursor-pointer">
                <Icon size={28} color="white"></Icon>
                <p className="hidden lg:block text-white text-xl">
                    {label}
                </p>
                {alert? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />: null}
            </div>
        </div>
    );
};

export default SidebarItem;