"use client"

import { useEffect, useState } from "react"
import Profile from "@/components/Profile"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


const ProfileDashboard = () => {

    const router = useRouter();
    const { data: session } = useSession();
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            console.log(response);

            const data = await response.json();
            setAllPosts(data);
        };

        if (session?.user.id) fetchPosts();
    }, []);

    const handleEdit = (post) => {
        console.log(post);
        
    }
    const handleDelete = (post) => { 
        console.log(post);
    }



    return (
        <Profile
            name="My"
            desc="Welcome to your profile page"
            data={allPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default ProfileDashboard