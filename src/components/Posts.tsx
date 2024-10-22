// components/Posts.tsx
"use client";
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import PostForm from './PostForm';
import { usePosts } from '@/app/hooks/usePosts';
import { postTypes } from '@/types/types';

const Posts: React.FC = () => {
    const { posts, isLoading, fetchError, createPost, deletePost, updatePost } = usePosts();
    const [editingPost, setEditingPost] = useState<postTypes | null>(null);

    const handleCreateOrUpdatePost = (post: postTypes) => {
        if (editingPost) {
            updatePost(post);
            setEditingPost(null);
        } else {
            createPost(post);
        }
    };

    if (isLoading) return <CircularProgress />;
    if (fetchError) return <Alert severity="error">Error fetching posts: {fetchError.message}</Alert>;

    return (
        <Box className="p-4">
            <PostForm onSubmit={handleCreateOrUpdatePost} initialPost={editingPost} />
            <Typography variant="h5" className="font-bold mb-2 mt-8">
                Posts
            </Typography>
            <Box className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {posts?.map((post) => (
                    <Card key={post.id} className="mb-2">
                        <CardContent>
                            <Typography variant="h6" className="font-bold">
                                {post.title}
                            </Typography>
                            <Typography variant="body2">{post.body}</Typography>
                            <Button variant="outlined" color="primary" onClick={() => setEditingPost(post)}>
                                Edit
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => deletePost(post.id!)}>
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Posts;
