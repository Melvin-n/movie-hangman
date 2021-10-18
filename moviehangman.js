//get and update guess count, define guess array which will hold the letter guessed
let guessCount = document.getElementById('guesses-remaining');
let guesses = 10;
let guessArray = []
guessCount.innerHTML = guesses;

//make array out of word to guess
let word = 'guess me';
let wordDisplay = document.getElementById('word')
let wordArray = word.split('');

//wordDisplay.innerHTML = wordArray.join('');
console.log(wordArray);

//define movie genre and year
let movieYear = document.querySelector('#movieYear')
let movieGenre = document.querySelector('#movieGenre')


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

//get random id to pass to getMoive function
function getRandomId(){
    return Math.floor(Math.random() * 695063);
}

let randId = getRandomId()

//async function to get random move from moviedb API
const getMovie = async(randId) => {
    let movieData
    const url = `https://api.themoviedb.org/3/movie/${randId}?api_key=c1fa1ff0ae6c682c3923a2aa5172d1ce`
        //await means it will wait for this part of the code to return before miving forward
        try {
            const res = await fetch(url)
            if (res.success == false) {
                getMovie(getRandomId())
            }
            return res.json()
            .then((response) => {
               
                movieData = response;
                //check for non-adult movie, popularity > 4, english language;
                let year = movieData.release_date;
                if (movieData.adult || movieData.popularity < 4 || movieData.original_language != 'en') {
                    getMovie(getRandomId());   
                }
                word = movieData.original_title;
                console.log(word);
                movieYear.innerHTML = movieData.release_date;

            })
            
        }  catch (err) {
            console.log('error')
        }
       
   
}

getMovie(randId)
