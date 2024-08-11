import React, {useCallback, useState} from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import {loginModalAtom, registerModalAtom} from "@/store/modalAtoms";
import Input from "@/components/Input";
import Model from "@/components/Model";
import axios from "axios";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";

const RegisterModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [registerIsOpen, setRegisterIsOpen] = useRecoilState(registerModalAtom);
    const setLoginIsOpen = useSetRecoilState(loginModalAtom);

    const onSubmit = useCallback(async ()=>{
        try {
            setIsLoading(true);
            await axios.post('/api/register', {
                email,
                password,
                name,
                username
            })
            toast.success("Account Created");
            await signIn("credentials", {
                email,
                password
            })
            setRegisterIsOpen({isOpen: false});
        }
        catch (e) {
            console.log(e);
            toast.error("Something went wrong");
        }
        finally {
            setIsLoading(false);
        }
    },[email, name, password, setRegisterIsOpen, username]);

    const onToggle = useCallback(()=>{
        if (isLoading) {
            return;
        }
        setRegisterIsOpen({isOpen: false});
        setLoginIsOpen({isOpen: true});
    }, [setLoginIsOpen, setRegisterIsOpen, isLoading]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                onChange={(e) => {setEmail(e.target.value)}}
                placeholder="Email"
                value={email}
                disabled={isLoading}
            />
            <Input
                onChange={(e) => {setName(e.target.value)}}
                placeholder="Name"
                value={name}
                disabled={isLoading}
            />
            <Input
                onChange={(e) => {setUsername(e.target.value)}}
                placeholder="Username"
                value={username}
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
            <p>Already have an Account?
                <span
                    onClick={onToggle}
                    className="text-white cursor-pointer hover:underline"
                > Sign In</span>
            </p>
        </div>
    )

    return (
        <Model
            onClose={() => {
                setLoginIsOpen({isOpen: false})
            }}
            isOpen={registerIsOpen.isOpen}
            onSubmit={onSubmit}
            actionLabel="Sign Up"
            disabled={isLoading}
            body={bodyContent}
            footer={footerContent}
            title="Create an Account"
        />
    );
};

export default RegisterModal;