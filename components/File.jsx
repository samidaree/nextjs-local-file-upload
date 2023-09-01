import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function File() {
    const [file, setFile] = useState();
    const [imageUrl, setImageUrl] = useState(null);

    async function handleChange(e) {
        const selectedFile = e.target.files[0];
        setFile(e.target.files[0]);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('/api/upload', formData);
            console.log(response.data); // Handle the response from the API
            setImageUrl(response.data.imageUrl); // Set the URL returned by the server
        } catch (error) {
            console.error(error);
        }
    }

    async function uploadFile() {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/upload', formData);
            console.log(response.data); // Handle the response from the API
            setImageUrl(response.data.imageUrl); // Set the URL returned by the server
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <label className="flex flex-col items-center justify-center w-24 h-24 gap-1 text-sm text-center bg-white border rounded-sm shadow-sm cursor-pointer text-primary border-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <div>
                    Add image
                </div>
                <input onChange={(e) => handleChange(e)} type="file" className="hidden" />
            </label>
            {imageUrl && <img src={imageUrl} width="100" height="100" alt="Uploaded Image" />}
        </div>
    );
}