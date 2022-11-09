import { IWord } from "../interface";


export const disorderWords = (words: IWord[]) => {

    for (let i = words.length - 1; i > 0; i--) {
        let indiceAleatorio = Math.floor(Math.random() * (i + 1));
        let temporal = words[i];
        words[i] = words[indiceAleatorio];
        words[indiceAleatorio] = temporal;
    }

    return words
}