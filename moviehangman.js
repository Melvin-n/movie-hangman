//get and update guess count, define guess array which will hold the letter guessed
let guessCount = document.getElementById('guesses-remaining');
let guesses = 10;
let guessArray = []
guessCount.innerHTML = guesses;

//make array out of word to guess
let word = 'guessmememe';
let wordDisplay = document.getElementById('word')
let wordArray = word.split('');

//wordDisplay.innerHTML = wordArray.join('');
console.log(wordArray);


document.addEventListener('keyup', main(), false)
//main function, 
function main(){
    guessLetter()
    render()
}


//guess function when key is pressed
function guessLetter() {
    //if letter guessed is in the array of letters in the word then push it into the guess array and rerun render
    document.addEventListener('keydown', (e) => {
        if (wordArray.indexOf(e.key) != -1 && guessArray.indexOf(e.key) == -1) {
            guessArray.push(e.key)
            render();

        } else if(guessArray.indexOf(e.key) != -1){
            console.log('already guessed that letter')
        } else {
            guesses = guesses - 1;
            guessArray.push(e.key);
            guessCount.innerHTML = guesses;
        }
    })
}
//render function will decide what letters are on display by checking if the letters in the guess array are in the letters of wordarray
//if it is then it will show the letter, if not the in will show a placeholder i.e *
function render(){
    console.log('again')
    let preWordDisplay = wordArray.map(letter => {
        console.log(letter)
        if (guessArray.includes(letter)){
            return letter
        } else if(!guessArray.includes(letter)){
            return '*';
        }
    })
    console.log(preWordDisplay)
    wordDisplay.innerHTML = preWordDisplay.join('');
}




