
function createElement(elementName, elementClass){
    const element = document.createElement(elementName);
    if(elementClass){
        element.classList.add(elementClass)
    }
    return element
}

function manyELement(whichEl, howMany = 1,  elclass){
    let arr = []
    for (let i = 0; i < howMany; i++){
        arr.push(createElement(whichEl, elclass))
    }
    return arr
}

function dataSearch(arr){
    let obj = {};
    if(arr.name.length > 25 || arr.owner.login.length > 25){
        obj.name = arr.name.substring(0,20) + '...'
        obj.userName = arr.owner.login.substring(0,20) + '...'
    }else{
        obj.name = arr.name;
        obj.userName = arr.owner.login;
    }
    obj.stars = arr.watchers;
    return obj
}

let whichEl = [];
let but;

function delet(el){
    return function () {
        el.remove()
    }
}

function append(whereEl, arr){
    whichEl = manyELement('div',5, 'shown');
    whichEl.forEach((el, index) => {
        
        if(arr[index]){
            el.textContent = arr[index].name
            whereEl.append(el)
            kclick(el, arr[index])

        }else{
            whereEl.append(whichEl[0])
            whichEl[0].textContent = 'there is no such repository'
        }
 })
}


function kclick(el, arr){

    el.addEventListener('click', () =>{
       let userCard = dataSearch(arr)
       but =  createElement('button', 'delet');
       card.append(createElement('div', 'info'));
        let info = document.querySelector('.info:last-child');
        but.addEventListener('click', delet(info));
        const p = manyELement('p', 3);
        p[0].textContent = `Name: ${userCard.name}`;
        p[1].textContent = ` Owner: ${userCard.userName}`;
        p[2].textContent = `Stars: ${userCard.stars}`
            info.append(but);
            info.append(p[0], p[1], p[2]);

    })
}

const fragment = document.createDocumentFragment();
const body = document.body
const card = createElement('div', 'card');
const input = createElement('input', 'search');
input.setAttribute('type', 'text');
const list = createElement('div', 'list');

input.oninput = debounce()

 function debounce() {
     let id;
     return function () {
             whichEl.forEach(el => {
                 el.remove()
             })
         clearTimeout(id, 700);
         if(input.value.trim().length) {

             id = setTimeout(() => {
                 getRequest(input.value)

             }, 500);
         }
     }
 }

card.append(input);
card.append(list)
fragment.append(card);
body.prepend(fragment);

async function getRequest(value){

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/search/repositories?q=${value}`)
    xhr.addEventListener('load', () => {
        const repos = JSON.parse(xhr.responseText).items
        append(list, repos)
    })

    xhr.addEventListener('error', () => {

    })

    xhr.send()
}







