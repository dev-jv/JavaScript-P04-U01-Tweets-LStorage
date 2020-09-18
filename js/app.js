    //  Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

    //  Events
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    })
}
    //  Functions
function agregarTweet(event){
    event.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }
    const tweetObj = {
        id : Date.now(),
        // texto : tweet, 
        // tweet : tweet, // Iguales
        tweet // Funciona recientemente..
    }
    // console.log('Agregando tweet');
    tweets = [...tweets, tweetObj]; // Hay un error fantasma...
    // tweets = {...tweets, tweetObj};// No hay error con esta forma... pero..
    console.log(tweets);
    crearHTML();
    formulario.reset();
}

function mostrarError(error){
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    formulario.appendChild(mensajeError);
    setTimeout(()=>{
        mensajeError.remove();
        // mostrarError(''); // :)
    },2345);
}

function crearHTML(){
    limpiarHTML();
    if( tweets.length > 0 ){
        tweets.forEach((tweetn)=>{
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'x';
            btnEliminar.onclick = ()=>{
                borrarTweet(tweetn.id);
            }
            const tw = document.createElement('li');
            tw.innerText = tweetn.tweet;
            tw.appendChild(btnEliminar);
            listaTweets.appendChild(tw);
        })
    }
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id){
    tweets = tweets.filter(tweet=>tweet.id!==id)
    // console.log(tweets);
    crearHTML();
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}









































