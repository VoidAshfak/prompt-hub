"use client"

import React, { useState, useEffect } from 'react'
import PromptCard from '@/components/PromptCard'
import PromptCardList from '@/components/PromptCardList';

const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState('')
    const [searchedResults, setSearchedResults] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(null)

    const filterPrompts = (text) => {
        const regex = new RegExp(text, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    };

    const handleSearch = (e) => {
        clearTimeout(searchTimeout)
        setSearchText(e.target.value)

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value)
                setSearchedResults(searchResult)
            }, 500)
        )

    }


    const handleTagClick = (tag) => {
        // console.log("tag", tag);
        
        setSearchText(tag);
        const searchResult = filterPrompts(tag);
        setSearchedResults(searchResult);
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
                data={searchedResults.length > 0 ? searchedResults : allPosts}
                handleTagClick={handleTagClick}
            />
        </section>
    )
}

export default Feed