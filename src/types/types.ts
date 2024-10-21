// types.ts or postTypes.ts
export interface Post {
    id?: number; // Optional if it’s not present when creating
    userId: number;
    title: string;
    body: string;
}
