const form     = document.querySelector('.form');
const links    = document.querySelector('.links');
const urlInput = document.querySelector('.urlInput');
const button   = document.querySelector('.button');
const errorMessage = document.querySelector('.error-message');
const clear        = document.querySelector('.clear');

const {shell} = require('electron')
renderLink()

//dom api
function responseHtml(text){
     const parse = new DOMParser();
    return  parse.parseFromString(text,'text/html')
}

function findTitle(node){
    return node.querySelector('title').innerText;
}

function setLink(title, url){
    localStorage.setItem(url,JSON.stringify({title,url}))
}

function getLink(){
   return Object.keys(localStorage).map(key =>JSON.parse(localStorage.getItem(key)))
}


function createLinkElement(link){
    return `
      <div>
       <h3>${link.title}</h3>
       <p><a href="${link.url}">${link.url}</a></p>
      </div>
    `
}

function renderLink(){
    const linkElement =  getLink().map(createLinkElement).join();
    links.innerHTML=linkElement;
}


//muestra mensaje error 
function handlersError(error, url){
    errorMessage.innerHTML =
    ` hubo un error con la  ${url} : ${error}
    `
    clearForm()
    setTimeout(()=>{
        errorMessage.innerHTML=null
    },5000)
}

//limpia el formularion
function clearForm(){
    urlInput.value="";
}

//event DOm
urlInput.addEventListener('keyup', ()=>{
    button.disabled = !urlInput.checkValidity();
})

form.addEventListener('submit',async (e)=>{
   e.preventDefault();
    const url  = urlInput.value;
    try {
        const res  = await fetch(url)
        const text = await res.text();
        const html = responseHtml(text);
        const title = findTitle(html);
        setLink(title, url)
        clearForm();
        renderLink();
    }catch(e){
        handlersError(e, url)
    }
})

clear.addEventListener('click',()=>{
    localStorage.clear();
    links.innerHTML=null
})


links.addEventListener('click',(e)=>{
    if(e.target.href){
        e.preventDefault();
        shell.openExternal(e.target.href)
    }
})