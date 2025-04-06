"use client"

import React, { useEffect, useState } from "react"
import Profile from "@/components/Profile"



const ProfileDashboard =  ({params}) => {
    const { profileId } = React.use(params);
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${profileId}/posts`);
            console.log(response);
            const data = await response.json();
            setAllPosts(data);
        };
        fetchPosts();
    }, []);

    return (
        <Profile
            name={`${allPosts[0]?.creator.username}'s` || "User's"}
            desc="Welcome to your profile page"
            data={allPosts}
        />
    )
}

export default ProfileDashboard