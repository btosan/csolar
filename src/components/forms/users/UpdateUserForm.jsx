"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { baseURL } from "@/utils/baseurl";
import toast from "react-hot-toast";
import { CameraIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from 'next-cloudinary';

// removed revalidate path
function shortenImageUrl(url) {
    let parsedUrl;
    if (typeof URL === 'function') {
        parsedUrl = new URL(url);
    } else { 
        const a = document.createElement('a');
        a.href = url;
        parsedUrl = a;
    }
    const pathSegments = parsedUrl.pathname.split('/')
    return '/' + pathSegments.pop();
}

const URL = baseURL;

const UpdateUserForm = ({ profile }) => {

    const ref = useRef();
    const router = useRouter();

    const [username, setUsername] = useState(profile?.username);
    // const [email, setEmail] = useState(profile?.email);
    const [firstName, setFirstName] = useState(profile?.firstName || "");
    const [lastName, setLastName] = useState(profile?.lastName || "");
    const [bio, setBio] = useState(profile?.bio || "");
    const [image, setImage] = useState(profile?.image || "");

    const [publicId, setPublicId] = useState("");

    const [info, updateInfo] = useState();
    const [error, updateError] = useState();
    const [pending, setPending] = useState(false);
    const [errors, setErrors] = useState("");


      const removeImage = async (e) => {
        e.preventDefault();
        setImage("");
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          setPending(true);
      
          const response = await fetch(`/api/users/${profile.email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              firstName,
              lastName,
              image,
              bio,
            }),
          });
      
          if (response.ok) {
            setPending(false);
            toast.success("Profile updated successfully");
            router.push('/profile');
            router.refresh();
          } else {
            const errorData = await response.json();
            setErrors(errorData.message || 'Something went wrong');
            console.error('Error updating profile:', errorData);
            setPending(false);
          }
        } catch (error) {
          setPending(false);
          toast.error("Something went wrong");
          console.error('Error updating profile:', error);
        }
      };

    const originalUrl = image;
    const shortenedUrl = shortenImageUrl(originalUrl);


    return (
        <form ref={ref} onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-8 bg-secondary3 dark:bg-primary5 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6">Update Profile</h2>

            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium ">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="mt-1 flex w-full p-2 text-primary2 dark:text-white bg-secondary2 dark:bg-primary6 border border-white dark:border-primary5 focus:border-lightblue2 focus:ring-lightblue dark:focus:border-primary5 dark:focus:ring-primary5 focus:outline-none focus:ring focus:ring-opacity-40 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium ">
                    First Name
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 flex w-full p-2 text-primary2 dark:text-white bg-secondary2 dark:bg-primary6 border border-white dark:border-primary5 focus:border-lightblue2 focus:ring-lightblue dark:focus:border-primary5 dark:focus:ring-primary5 focus:outline-none focus:ring focus:ring-opacity-40 rounded-md"
                    placeholder="Enter your first name"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium ">
                    Last Name
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 flex w-full p-2 text-primary2 dark:text-white bg-secondary2 dark:bg-primary6 border border-white dark:border-primary5 focus:border-lightblue2 focus:ring-lightblue dark:focus:border-primary5 dark:focus:ring-primary5 focus:outline-none focus:ring focus:ring-opacity-40 rounded-md"
                    placeholder="Enter your last name"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium  mb-1">
                    Profile Picture
                </label>
                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    className={`h-48 border-2 mt-4 border-dotted grid place-items-center bg-slate-100 rounded-md relative`}
                    onSuccess={(result, { widget }) => {
                        setImage(result?.info?.secure_url);
                        widget.close();
                    }}
                    >
                    {({ open }) => {

                        function handleOnClick(e) {
                            e.preventDefault();
                            // setImage(image);
                            open();
                        }
                        return (
                            <>
                                <button onClick={handleOnClick} className="flex gap-2 p-2 bg-secondary2 dark:bg-primary6 rounded-lg">
                                    <span className="text-sm mb-1">Upload</span>
                                    <CameraIcon className='w-5 h-5'/>
                                    
                                </button>
                                {image && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col text-xs">
                                            <Image 
                                                src={image} 
                                                alt={firstName+" "+lastName || username || "name"} 
                                                className="h-16 w-16"
                                                unoptimized
                                                height={100}
                                                width={100}
                                            />
                                            <span className="text-xs mt-1">{image.slice(-10)} </span>
                                        </div>
                                        

                                        <div className=" text-sm mr-4">
                                            <button onClick={removeImage} className="flex items-center justify-center gap-2">
                                                Remove
                                                <TrashIcon className="w-4 h-4 text-danger"/>
                                            </button>
                                        </div>
                                        
                                    </div>
                                )}
                            </>  
                        );
                    }}

              

                </CldUploadWidget >
               
            </div> 


            <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium ">
                    Bio
                </label>
                <textarea
                    type="text"
                    id="bio"
                    name="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-1 flex w-full p-2 text-primary2 dark:text-white bg-secondary2 dark:bg-primary6 border border-white dark:border-primary5 focus:border-lightblue2 focus:ring-lightblue dark:focus:border-primary5 dark:focus:ring-primary5 focus:outline-none focus:ring focus:ring-opacity-40 rounded-md"
                    placeholder="About you..."
                />
            </div>

            <div className="flex items-center justify-between w-full mx-auto">
            {errors && <span className="text-red-600 mx-2 px-2">{errors}</span>}
               <button
                    disabled={pending === true}
                    className="bg-primary5 dark:bg-primary hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-xl focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                   {pending ? 'Updating' : 'Update'}
                </button>
                <Link href='/profile' className="flex items-center gap-3 font-bold ">
                    <span>Profile</span> 
                    <ArrowRightIcon className="w-4 h-4"/>
                </Link>
            </div>

        </form>
    )
}

export default UpdateUserForm