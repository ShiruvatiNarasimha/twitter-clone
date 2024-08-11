import React, {useCallback} from 'react';
import {useRouter} from "next/router";
import {BiArrowBack} from "react-icons/bi";

interface headerProps {
    label: string;
    showBackArrow?: boolean;
}
const Header: React.FC<headerProps> = ({ label, showBackArrow }) => {
    const router = useRouter();
    const handleBack = useCallback(()=>{
        router.back();
    },[router])
    return (
        <div className="border-b border-neutral-800 p-5">
            <div className="flex flex-row items-center gap-2">
                {showBackArrow && (
                        <BiArrowBack className="cursor-pointer hover:opacity-70 transition" onClick={handleBack} color="white" size={20}/>
                )}
                <h1 className="text-white text-xl font-semibold">
                    {label}
                </h1>
            </div>
        </div>
    );
};

export default Header;