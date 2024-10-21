// "use client";
// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { Card, CardContent, Typography, CircularProgress, Button, TextField, Box, Input } from '@mui/material';

// export interface Post {
//     userId: number;
//     id?: number;
//     title: string;
//     body: string;
// }

// // Fetching posts
// const fetchPosts = async (): Promise<Post[]> => {
//     const response = await fetch('https://6716427b33bc2bfe40bd2321.mockapi.io/api/posts');
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// };

// // Creating a new post
// const createPost = async (newPost: Post): Promise<Post> => {
//     const response = await fetch('https://6716427b33bc2bfe40bd2321.mockapi.io/api/posts', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newPost),
//     });
//     if (!response.ok) {
//         throw new Error('Failed to create new post');
//     }
//     return response.json();
// };

// // Deleting a post
// const deletePost = async (postId: number): Promise<void> => {
//     const response = await fetch(`https://6716427b33bc2bfe40bd2321.mockapi.io/api/posts/${postId}`, {
//         method: 'DELETE',
//     });
//     if (!response.ok) {
//         throw new Error('Failed to delete post');
//     }
// };

// // Updating a post
// const updatePost = async (updatedPost: Post): Promise<Post> => {
//     const response = await fetch(`https://6716427b33bc2bfe40bd2321.mockapi.io/api/posts/${updatedPost.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedPost),
//     });
//     if (!response.ok) {
//         throw new Error('Failed to update post');
//     }
//     return response.json();
// };

// const Posts: React.FC = () => {
//     const queryClient = useQueryClient();

//     // State for new post form
//     const [newPost, setNewPost] = useState<Post>({
//         userId: Date.now(),
//         id: Date.now(),
//         title: '',
//         body: '',
//     });

//     // State for tracking the post being edited
//     const [editingPost, setEditingPost] = useState<Post | null>(null);

//     // Fetching posts
//     const { data: posts, isLoading: isFetchingPosts, error: fetchError } = useQuery<Post[], Error>({
//         queryKey: ['posts'],
//         queryFn: fetchPosts,
//     });

//     // Mutation for creating a post
//     const { mutate: createNewPost, isPending: isPosting } = useMutation({
//         mutationFn: createPost,
//         onMutate: async (newPost) => {
//             await queryClient.cancelQueries({ queryKey: ['posts'] });

//             const previousPosts = queryClient.getQueryData<Post[]>(['posts']);
//             queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => [
//                 ...(oldPosts || []),
//                 { ...newPost, id: Date.now() },
//             ]);
//             return { previousPosts };
//         },
//         onError: (err, newPost, context) => {
//             queryClient.setQueryData(['posts'], context?.previousPosts);
//         },
//         onSettled: () => {
//             queryClient.invalidateQueries({ queryKey: ['posts'] });
//         },
//     });

//     // Mutation for deleting a post
//     const { mutate: deleteExistingPost } = useMutation({
//         mutationFn: deletePost,
//         onMutate: async (postId) => {
//             await queryClient.cancelQueries({ queryKey: ['posts'] });

//             const previousPosts = queryClient.getQueryData<Post[]>(['posts']);
//             queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) =>
//                 oldPosts?.filter((post) => post.id !== postId)
//             );
//             return { previousPosts };
//         },
//         onError: (err, postId, context) => {
//             queryClient.setQueryData(['posts'], context?.previousPosts);
//         },
//         onSettled: () => {
//             queryClient.invalidateQueries({ queryKey: ['posts'] });
//         },
//     });

//     // Mutation for updating a post
//     const { mutate: updateExistingPost } = useMutation({
//         mutationFn: updatePost,
//         onMutate: async (updatedPost) => {
//             await queryClient.cancelQueries({ queryKey: ['posts'] });

//             const previousPosts = queryClient.getQueryData<Post[]>(['posts']);
//             queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) =>
//                 oldPosts?.map((post) => (post.id === updatedPost.id ? updatedPost : post))
//             );
//             return { previousPosts };
//         },
//         onError: (err, updatedPost, context) => {
//             queryClient.setQueryData(['posts'], context?.previousPosts);
//         },
//         onSettled: () => {
//             queryClient.invalidateQueries({ queryKey: ['posts'] });
//         },
//     });

//     // Handle form submission for creating a post
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (editingPost) {
//             // Update the post if editing
//             updateExistingPost(editingPost);
//             setEditingPost(null);
//         } else {
//             // Create a new post if not editing
//             createNewPost(newPost);
//         }
//         setNewPost({ userId: Date.now(), id: Date.now(), title: '', body: '' });
//     };

//     // Handle editing a post
//     const handleEdit = (post: Post) => {
//         setEditingPost(post);
//     };

//     // Show loading state
//     if (isFetchingPosts) {
//         return <CircularProgress />;
//     }

//     // Show error state
//     if (fetchError) {
//         return <Box>Error fetching posts: {fetchError.message}</Box>;
//     }

//     return (
//         <Box className="p-4">
//             <Box className="mb-8">
//                 <Typography variant="h5" className="font-bold mb-4">
//                     {editingPost ? 'Edit Post' : 'Create a New Post'}
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <Box >
//                         <Box className="w-full max-w-sm min-w-[200px]">
//                             <h1>Title</h1>
//                             <input className="w-full mt-0.5 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..."
//                                 value={editingPost ? editingPost.title : newPost.title}
//                                 onChange={(e) =>
//                                     editingPost
//                                         ? setEditingPost({ ...editingPost, title: e.target.value })
//                                         : setNewPost({ ...newPost, title: e.target.value })
//                                 }
//                             />
//                         </Box>

//                         <Box className="w-96">
//                             <Box className="relative w-full min-w-[200px]">
//                                 <h1>Body</h1>
//                                 <textarea
//                                     className="h-full mt-0.5 min-h-[100px] w-full resize-none rounded-[7px] border border-slate-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:bg-blue-gray-50"
//                                     placeholder=" "
//                                     value={editingPost ? editingPost.body : newPost.body}
//                                     onChange={(e) =>
//                                         editingPost
//                                             ? setEditingPost({ ...editingPost, body: e.target.value })
//                                             : setNewPost({ ...newPost, body: e.target.value })
//                                     }
//                                 />

//                             </Box>
//                         </Box>

//                     </Box>
//                     <Button type="submit" variant="contained" color="primary" disabled={isPosting}>
//                         {isPosting ? (editingPost ? 'Updating...' : 'Creating...') : editingPost ? 'Update Post' : 'Create Post'}
//                     </Button>
//                 </form>
//             </Box>

//             <Box className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 {posts?.map((post) => (
//                     <Card key={post.id} className="shadow-lg">
//                         <CardContent>
//                             <Typography variant="h6" className="font-bold">
//                                 {post.title}
//                             </Typography>
//                             <Typography variant="body2">{post.body}</Typography>
//                             <Button
//                                 variant="contained"
//                                 color="secondary"
//                                 onClick={() => deleteExistingPost(post.id!)}
//                                 className="mt-4"
//                             >
//                                 Delete
//                             </Button>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={() => handleEdit(post)}
//                                 className="mt-4 ml-4"
//                             >
//                                 Edit
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </Box>
//         </Box>
//     );
// };

// export default Posts;

// components/Posts.tsx
"use client";
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import PostForm from './PostForm';
import { Post } from '../types/types';
import { usePosts } from '@/app/hooks/usePosts';

const Posts: React.FC = () => {
    const { posts, isLoading, fetchError, createPost, deletePost, updatePost } = usePosts();
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const handleCreateOrUpdatePost = (post: Post) => {
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
