// hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../api/apiService';
import { postTypes } from '@/types/types';


const fetchPosts = async (): Promise<postTypes[]> => {
    return apiService<postTypes[]>('/posts', 'GET');
};

const createPost = async (newPost: postTypes): Promise<postTypes> => {
    return apiService<postTypes>('/posts', 'POST', newPost);
};

const deletePost = async (postId: number): Promise<void> => {
    return apiService<void>(`/posts/${postId}`, 'DELETE');
};

const updatePost = async (updatedPost: postTypes): Promise<postTypes> => {
    return apiService<postTypes>(`/posts/${updatedPost.id}`, 'PUT', updatedPost);
};

export const usePosts = () => {
    const queryClient = useQueryClient();

    const postsQuery = useQuery<postTypes[], Error>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    const createMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    return {
        posts: postsQuery.data,
        isLoading: postsQuery.isLoading,
        fetchError: postsQuery.error,
        createPost: createMutation.mutate,
        deletePost: deleteMutation.mutate,
        updatePost: updateMutation.mutate,
    };
};
