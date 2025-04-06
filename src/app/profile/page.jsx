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
        router.push(`/update-prompt?id=${post._id}`);
        
    }
    const handleDelete = (post) => { 
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
        if(hasConfirmed) { 
            try { 
                fetch(`/api/prompt/${post._id.toString()}`, {method: "DELETE"})
                const filteredPosts = allPosts.filter((p) => p._id !== post._id)
                setAllPosts(filteredPosts)
            } catch (error) { 
                console.log(error)
            }
        }
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