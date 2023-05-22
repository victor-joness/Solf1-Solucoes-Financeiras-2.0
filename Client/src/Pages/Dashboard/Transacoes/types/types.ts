export type Item = {
    data: Date;
    title: string;
    value: number;
    category: string;
    cartao: string;
};

export type Category = {
    [tag: string]: {
        titulo: string;
        color: string;
        expense: boolean;
    }
}