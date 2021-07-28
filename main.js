let footer_setting = document.getElementById("footer__setting");
let setting_cnt = document.querySelector(".setting-opt");
let form = document.querySelector(".form");
let input = document.getElementById("search-text");
let sugg_cnt = document.querySelector(".sugg-cnt");
let border_disp = document.querySelector(".border-line");
let clear = document.querySelector(".clear");

function checkActive(){
    if(input === document.activeElement) return;
    form.style.borderRadius = "24px"
    form.style.boxShadow = "none"
    sugg_cnt.classList.add("none");
    border_disp.classList.add("none");
}

function updateSuggestion(){
    
}

footer_setting.addEventListener("click", (e) => {
    e.preventDefault();
    setting_cnt.classList.toggle("none");
});

input.addEventListener("mousedown", (e) => {
    form.style.borderRadius = "24px 24px 0 0";
    form.style.boxShadow = "0 1px 6px rgb(32 33 36 / 28%)";
    sugg_cnt.classList.remove("none");
    border_disp.classList.remove("none");
});

input.addEventListener("keydown", (e) => {
    
});

input.addEventListener("input", (e) => {
    console.log(input.value == '')
    if(input.value == "")
    {
        clear.classList.add("none");
        return ;
    }
    clear.classList.remove("none");
});

clear.addEventListener("click", (e) => {
    input.value = '';
});

window.addEventListener("mousedown", (e) =>{
    setTimeout(checkActive, 100);
    if(setting_cnt.classList.contains("none")) return; 
    setting_cnt.classList.add("none");
});

//Search Suggestion

const regex = /data=\"([\w ]*)\"/gi;
url = "https://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=master"
async function fetchSuggestion(){
    let response = await fetch(url);
    let result = await response.text();
    let out = result.matchAll(regex);
    for(const match of out){
        console.log(match[1]);
    }
}

fetchSuggestion();