import React, {useCallback, useState} from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import {loginModalAtom, registerModalAtom} from "@/store/modalAtoms";
import Input from "@/components/Input";
import Model from "@/components/Model";
import {signIn} from "next-auth/react";

const LoginModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginIsOpen, setLoginIsOpen] = useRecoilState(loginModalAtom);
    const setRegisterIsOpen = useSetRecoilState(registerModalAtom);
    
    const onSubmit = useCallback(()=>{
        try {
            setIsLoading(true);
            signIn("credentials", {
                email,
                password
            })
            setLoginIsOpen({isOpen: false})
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsLoading(false);
        }
    },[email, password, setLoginIsOpen]);

    const onToggle = useCallback(()=>{
        if (isLoading) {
            return;
        }
        setLoginIsOpen({isOpen: false});
        setRegisterIsOpen({isOpen: true});
    }, [setLoginIsOpen, setRegisterIsOpen]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                onChange={(e) => {setEmail(e.target.value)}}
                placeholder="Email"
                value={email}
                disabled={isLoading}
            />
            <Input
                onChange={(e) => {setPassword(e.target.value)}}
                placeholder="Password"
                type="password"
                value={password}
                disabled={isLoading}
            />
        </div>
    )
    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>First time using Twitter?
                <span
                    onClick={onToggle}
                    className="text-white cursor-pointer hover:underline"
                > Create an Account</span>
            </p>
        </div>
    )
    return (
        <Model onSubmit={onSubmit}
               disabled={isLoading}
               isOpen={loginIsOpen.isOpen}
               actionLabel="Sign In"
               onClose={() => {
                    setLoginIsOpen({isOpen: false})
               }}
               body={bodyContent}
               footer={footerContent}
               title="Login"
        />
    );
};

export default LoginModal;