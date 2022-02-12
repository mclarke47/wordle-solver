import { readFileSync, writeFileSync } from 'fs';
import { Node } from './types';

const set = new Set<string>();

// aspell -d en dump master | aspell -l en expand > words.txt
readFileSync('./words.txt', 'utf-8').split("\n")
.filter(word => {
    return word.length === 5 && !word.includes("'");
})
.map(word => set.add(word.toLocaleLowerCase()))

console.log(set.size, "words found")

const wordleWords = Array.from(set);

writeFileSync('wordle-words.txt', Array.from(set).join("\n"));

const startingNode: Node = {
    nodes: [],
};

wordleWords.forEach((word) => {
    let currentNode = startingNode;
    for (let i = 0; i < word.length; i++) {
        const letter = word[i];

        const matchingNode = currentNode.nodes.find((n: Node) => n.letter === letter)
    
        if (!matchingNode){
            const newNode = {
                letter: letter,
                nodes: []
            }
            currentNode.nodes.push(newNode)
            currentNode = newNode
        } else {
            currentNode = matchingNode
        }
      }
})

writeFileSync('trie.json', JSON.stringify(startingNode));