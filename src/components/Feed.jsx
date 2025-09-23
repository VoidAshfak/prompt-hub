"use client"

import React, { useState, useEffect } from 'react'
import PromptCard from '@/components/PromptCard'
import PromptCardList from '@/components/PromptCardList';

const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedResults, setSearchedResults] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [loading, setLoading] = useState(true);

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
        setLoading(true);
        try {
            const response = await fetch("/api/prompt");
            const data = await response.json();
            setAllPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false); // Stop loading when fetch is complete
        }
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
            {loading ? (
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div>
            ) : (
                <PromptCardList
                    data={searchedResults.length > 0 ? searchedResults : allPosts}
                    handleTagClick={handleTagClick}
                />
            )}
        </section>
    )
}

export default Feed