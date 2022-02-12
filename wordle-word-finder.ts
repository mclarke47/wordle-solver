import { readFileSync } from 'fs';
import {Node} from './types'

const trie:Node = JSON.parse(readFileSync('./trie.json', 'utf-8'));

const presentLettersWrongLocation = new Set<string>();
// TODO Get rid of this, turn it interactive
// presentLettersWrongLocation.add("a")
// // // presentLettersWrongLocation.add("b")
// // // presentLettersWrongLocation.add("c")
// // // presentLettersWrongLocation.add("d")
// // // presentLettersWrongLocation.add("e")
// // // presentLettersWrongLocation.add("f")
// // // presentLettersWrongLocation.add("g")
// // // presentLettersWrongLocation.add("h")
// // // presentLettersWrongLocation.add("i")
// // // presentLettersWrongLocation.add("j")
// // // presentLettersWrongLocation.add("k")
// presentLettersWrongLocation.add("l")
// // // presentLettersWrongLocation.add("m")
// // // presentLettersWrongLocation.add("n")
// // // presentLettersWrongLocation.add("o")
// // // presentLettersWrongLocation.add("p")
// // // presentLettersWrongLocation.add("q")
// presentLettersWrongLocation.add("r")
// // presentLettersWrongLocation.add("s")
// presentLettersWrongLocation.add("t")
// presentLettersWrongLocation.add("u")
// // presentLettersWrongLocation.add("v")
// // presentLettersWrongLocation.add("w")
// // presentLettersWrongLocation.add("x")
// // presentLettersWrongLocation.add("y")
// // presentLettersWrongLocation.add("z")

const denyListLetters = new Set<string>();

// TODO Get rid of this, turn it interactive
// // denyListLetters.add("a")
// // denyListLetters.add("b")
// // denyListLetters.add("c")
// // denyListLetters.add("d")
// denyListLetters.add("e")
// // // denyListLetters.add("f")
// denyListLetters.add("g")
// // // denyListLetters.add("h")
// denyListLetters.add("i")
// // // denyListLetters.add("j")
// // // denyListLetters.add("k")
// // // denyListLetters.add("l")
// denyListLetters.add("m")
// // // denyListLetters.add("n")
// denyListLetters.add("o")
// denyListLetters.add("p")
// // // denyListLetters.add("q")
// // denyListLetters.add("r")
// denyListLetters.add("s")
// denyListLetters.add("t")
// denyListLetters.add("u")
// denyListLetters.add("v")
// denyListLetters.add("w")
// denyListLetters.add("x")
// denyListLetters.add("y")
// denyListLetters.add("z")

const possibleWords:string[] = [];


// TODO check for the position of positionally incorrect but present letters to further narrow it down
function searchForWords(currentNode: Node, currentWord: string, requiredLetters: Set<string>){

    let newRequiredLetters = new Set(requiredLetters)

    if (currentNode.letter && newRequiredLetters.has(currentNode.letter)){
        newRequiredLetters.delete(currentNode.letter)
    }

    if(currentNode.nodes.length === 0){

        currentWord += currentNode.letter

        if (newRequiredLetters.size === 0){
            possibleWords.push(currentWord)
        } 
        return
    }

    for (const node of currentNode.nodes){

        if(!currentNode.letter || (currentNode.letter && !denyListLetters.has(currentNode.letter))){
            searchForWords(node, `${currentWord}${currentNode.letter ? currentNode.letter : ""}`, newRequiredLetters)
        }
    }
}

searchForWords(trie, "", presentLettersWrongLocation)

possibleWords.forEach(w => console.log(w))