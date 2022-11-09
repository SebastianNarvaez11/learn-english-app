import { IWord } from "../interface";

export const getListForGame = (words: IWord[]) => {
    const easy: IWord[] = []
    const medium: IWord[] = []
    const hard: IWord[] = []

    words.map(word => {
        if (word.points === 0) easy.push(word)
        if (word.points === 1) medium.push(word)
        if (word.points === 2) hard.push(word)
    })

    const list: IWord[] = []
    return list.concat(hard, hard, hard, medium, medium, easy)
}