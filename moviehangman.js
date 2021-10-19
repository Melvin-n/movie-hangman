//get and update guess count, define guess array which will hold the letter guessed
let guessCount = document.getElementById('guesses-remaining');
let guesses = 8;
let guessArray = [' ']
guessCount.innerHTML = guesses;

let word;
let wordDisplay = document.getElementById('word')
let wordArray = []

let endGame = document.getElementById('end-game');
//async function to get random move from moviedb API
const getMovie = async() => {
    let movieData
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=c1fa1ff0ae6c682c3923a2aa5172d1ce&language=en-US&page=${getRandomPage()}`
        //await means it will wait for this part of the code to return before miving forward
        try {
            const res = await fetch(url)
            if (res.success == false) {
                getMovie(getRandomPage())
            }
            return res.json()
            .then((response) => {
               
                movieData = response;
                word = movieData.results[3].title
                console.log(word)

                return word.toLowerCase();
            })
            
        }  catch (err) {
            console.log('error')
        }

}


//make array out of word to guess
const getWord = async() => {
    word = await getMovie();
    wordArray = word.split('');
    console.log(wordArray)
    render()
}


guessLetter()
getWord()
render()




//main function, 
// function main(wordArray){
//     guessLetter();
//     getMovie();
//     getWord();
//     render(wordArray);
    
// }


//guess function when key is pressed
function guessLetter() {
    //if letter guessed is in the array of letters in the word then push it into the guess array and rerun render
    
    document.addEventListener('keydown', (e) => {
        console.log(e)
        console.log(guessArray)
        
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
    console.log(wordArray, 'map')
    let preWordDisplay = wordArray.map(letter => {
        console.log(letter)
        
        if (guessArray.includes(letter)){
            return letter
        } else if(!guessArray.includes(letter)){
            return '*';
        }
        
    })
    
    wordDisplay.innerHTML = preWordDisplay.join('');
    checkWin(preWordDisplay)
    
}

function checkWin(wordDisplay){
    letterArr = wordDisplay;
    if(!letterArr.includes('*')){
        endGame.classList.remove('hidden');
        console.log('win')
    }
}

//get random page and num to pass to getMovie function
function getRandomPage(){
    return Math.floor(Math.random() * 500);
}

function getRandomNum(){
    return Math.floor(Math.random() * 20);
}


document.addEventListener('keyup', guessLetter(), false)



