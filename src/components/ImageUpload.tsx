import React, {useCallback, useState} from 'react';
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface imgUploadProps {
    disabled?: boolean;
    onChange: (base64: string) => void;
    value?: string;
    label: string;
}

const ImageUpload: React.FC<imgUploadProps> = ({ disabled, label, value, onChange }) => {
    const [base64, setBase64] = useState("");
    const handleChange = useCallback((base64: string)=>{
        onChange(base64);
    },[onChange]);
    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
            setBase64(event.target.result);
            handleChange(event.target.result);
        }
    }, [handleChange]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1,
        disabled,
        onDrop: handleDrop,
        accept: {
            "image/jpg" : [],
            "image/png" : [],
        }
    });
    return (
        <div {...getRootProps({className: `w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 hover:cursor-pointer ${isDragActive ? `bg-neutral-500`: 'bg-transparent'} `})}>
            <input {...getInputProps()}/>
            {base64 ? (
                <Image src={base64} alt="Uploaded Image" height="100" width="100"/>
            ) : (
                <p className="text-white">{label}</p>
            )}
        </div>
    );
};

export default ImageUpload;