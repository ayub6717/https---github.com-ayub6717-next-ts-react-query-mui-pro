// components/PostForm.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { postTypes } from '@/types/types';

interface PostFormProps {
    onSubmit: (post: postTypes) => void;
    initialPost?: postTypes | null;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialPost }) => {
    const [post, setPost] = useState<postTypes>({
        userId: Date.now(),
        id: Date.now(),
        title: '',
        body: '',
    });

    useEffect(() => {
        if (initialPost) {
            setPost(initialPost);
        }
    }, [initialPost]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(post);
         setPost({ userId: Date.now(), id: Date.now(), title: '', body: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box >
                <Box className="w-full max-w-sm min-w-[200px]">
                    <h1>Title</h1>
                    <input className="w-full mt-0.5 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..."
                        value={post.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                    />
                </Box>

                <Box className="w-96">
                    <Box className="relative w-full min-w-[200px]">
                        <h1>Body</h1>
                        <textarea
                            className="h-full mt-0.5 min-h-[100px] w-full resize-none rounded-[7px] border border-slate-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:bg-blue-gray-50"
                            placeholder=" "
                            value={post.body}
                            onChange={(e) => setPost({ ...post, body: e.target.value })}
                        />

                    </Box>
                </Box>

            </Box>
            <Button className='p-2 mt-1' type="submit" variant="contained" color="primary">
                {initialPost ? 'Update Post' : 'Create Post'}
            </Button>
        </form>


    );
};

export default PostForm;
