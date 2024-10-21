// hooks/usePosts.ts
import { Post } from '@/types/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../api/apiService';


const fetchPosts = async (): Promise<Post[]> => {
    return apiService<Post[]>('/posts', 'GET');
};

const createPost = async (newPost: Post): Promise<Post> => {
    return apiService<Post>('/posts', 'POST', newPost);
};

const deletePost = async (postId: number): Promise<void> => {
    return apiService<void>(`/posts/${postId}`, 'DELETE');
};

const updatePost = async (updatedPost: Post): Promise<Post> => {
    return apiService<Post>(`/posts/${updatedPost.id}`, 'PUT', updatedPost);
};

export const usePosts = () => {
    const queryClient = useQueryClient();

    const postsQuery = useQuery<Post[], Error>({
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
