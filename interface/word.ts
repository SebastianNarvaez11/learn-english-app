export interface IList {
    _id?: string,
    name: string,
    icon: string,
    words: IWord[],
    createdAt?: number
}

export interface IListResponse {
    list: IList[],
    hard: number,
    medium: number,
    easy: number
}

export interface IWord {
    _id?: string,
    spanish: string,
    english: string,
    image?: string,
    points: number,
    example1?: string,
    example2?: string,
    example3?: string;
    example4?: string
}

export interface ITranslation {
    spanish: string,
    english: string,
}


export type IDifficulty = "hard" | "medium" | "easy"