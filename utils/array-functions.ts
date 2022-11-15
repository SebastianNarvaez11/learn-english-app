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


export const selectIdealWords = (words: IWord[]) => {

    let select_words: IWord[] = []
    let cantidad_seleccionadas = 20 // cant max por ronda

    if (words.length <= 12) cantidad_seleccionadas = words.length
    if (words.length > 12 && words.length <= 40) cantidad_seleccionadas = Math.floor(words.length / 2)

    let easy = disorderWords(words.filter(word => word.points === 0))
    let medium = disorderWords(words.filter(word => word.points === 1 || word.points === 2))
    let hard = words.filter(word => word.points >= 3).sort((a,b) => b.points - a.points)


    console.log('easy ' + easy.length);
    console.log('medium ' + medium.length);
    console.log('hard ' + hard.length);
    

    if (hard.length > Math.floor(cantidad_seleccionadas / 2)) {
        hard = hard.slice(0, Math.floor(cantidad_seleccionadas / 2) - 1) // ==> 50%
    }

    if (medium.length > Math.floor((30 * cantidad_seleccionadas) / 100)) {
        medium = medium.slice(0, Math.floor((30 * cantidad_seleccionadas) / 100) - 1) // ==> 30%
    }

    if (easy.length > Math.floor((20 * cantidad_seleccionadas) / 100)) {
        easy = easy.slice(0, Math.floor((20 * cantidad_seleccionadas) / 100) - 1) // ==> 20%
    }

    select_words = [...easy, ...medium, ...hard]

    console.log('easy ' + easy.length);
    console.log('medium ' + medium.length);
    console.log('hard ' + hard.length);

    return disorderWords(select_words)
}