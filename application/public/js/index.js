var photo_count = document.getElementById("photo_count");
var photo_data = document.getElementById("photo_data");

function imageClick(ev){
    const div = ev.currentTarget;
    console.log(div);
    div.classList.add("hide");
    setTimeout(function(){
        photo_data.removeChild(div);
        photo_count.innerText = '' +photo_data.children.length;
    }, 800);
}

var url = "https://jsonplaceholder.typicode.com/albums/2/photos";

async function fetchWithString(){
    const response = await fetch(url);
    const jsonData = await response.json();
    photo_count.innerText = ''+jsonData.length;
    console.log(jsonData);
    
    jsonData.forEach(j => {
        console.log(j);
        const div = document.createElement("div");
        div.classList.add("photo_wrapper");
        div.innerHTML = `
        <img src="${j.url}"  width="100px" height="100px">
        <span>${j.title}</span>
        `;

        div.onclick = imageClick;
        photo_data.appendChild(div);

    });
}

fetchWithString();

// Part 2 of Assignment 4 

