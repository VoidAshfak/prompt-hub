"use client"

import React, { useState, useEffect } from 'react'
import PromptCard from '@/components/PromptCard'
import PromptCardList from '@/components/PromptCardList';

const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState('')

    const handleSearch = (e) => {

    }

    const fetchPosts = async () => {
        const response = await fetch("/api/prompt");
        const data = await response.json();

        setAllPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    className='search_input peer'
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearch}
                    required
                />
            </form>
            <PromptCardList
                data={allPosts}
                handleTagClick={() => { }}
            />
        </section>
    )
}

export default Feed