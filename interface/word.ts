export interface IList {
    _id : string,
    name : string,
    icon: string,
    words: IWord[],
    createdAt: number
}

export interface IWord {
    _id: string,
    spanish: string,
    english: string,
    points: number
}

export interface ITranslation {
    spanish: string,
    english: string,
}
