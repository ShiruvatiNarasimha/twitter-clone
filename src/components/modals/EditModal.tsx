import React, {useCallback, useEffect, useState} from 'react';
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import axios from "axios";
import {useRecoilState, useSetRecoilState} from "recoil";
import {editModalAtom} from "@/store/modalAtoms";
import toast from "react-hot-toast";
import Input from "@/components/Input";
import ImageUpload from "@/components/ImageUpload";
import Model from "@/components/Model";

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateCurrentUser } = useUser(currentUser?.id);
    const [isLoading, setIsLoading] = useState(false); 
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [openEditModal, setOpenEditModal] = useRecoilState(editModalAtom);
    
    useEffect(()=>{
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
    }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);

    const onSubmit = useCallback(async ()=>{
        try {
            setIsLoading(true);
            const updatedUser = await axios.patch("/api/edit", {
                name,
                username,
                bio,
                profileImage,
                coverImage
            });
            await mutateCurrentUser();
            toast.success("Updated!");
            setIsLoading(false);
            setOpenEditModal({isOpen: false});
        } catch (e) {
            console.log(e);
            toast.error("Something went wrong");
        }
        finally {
            setIsLoading(false);
            setOpenEditModal({isOpen: false});   
        }
    }, [bio, coverImage, mutateCurrentUser, name, profileImage, setOpenEditModal, username])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload onChange={(base64: string) => setProfileImage(base64)} label="Upload Profile Image"/>
            <ImageUpload onChange={(base64: string) => setCoverImage(base64)} label="Upload Cover Image"/>
            <Input
                onChange={(e)=> setName(e.target.value)}
                value={name}
                disabled={isLoading}
                placeholder="name"
            />
            <Input
                onChange={(e)=> setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
                placeholder="Username"
            />
            <Input
                onChange={(e)=> setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
                placeholder="Bio"
            />
        </div>
    );
    return (
        <Model
            disabled={isLoading}
            isOpen={openEditModal.isOpen}
            onClose={() => setOpenEditModal({isOpen: false})}
            title="Edit your profile"
            actionLabel="Save"
            body={bodyContent}
            onSubmit={onSubmit}
        />
    );
};

export default EditModal;