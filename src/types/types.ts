// types.ts or postTypes.ts
export interface postTypes {
    id?: number; // Optional if it’s not present when creating
    userId: number;
    title: string;
    body: string;
}
