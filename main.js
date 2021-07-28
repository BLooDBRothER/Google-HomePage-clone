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

input.addEventListener("input", (e) => {
    console.log(input.value == '')
    if(input.value == "")
    {
        clear.classList.add("none");
        return ;
    }
    fetchSuggestion(input.value);
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

async function fetchSuggestion(txt){
    let url = `https://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=${txt}`;
    setting_cnt.innerHTML = '';
    let response = await fetch(url);
    let result = await response.text();
    let out = result.matchAll(regex);
    let li = '';
    for(const match of out){
        console.log(match[1]);
        li += `<li>
        <svg class="search-ic" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
        <p>${match[1]}</p>
        </li>`;
    }
    li += `<li class="sugg-btn">
    <button>Google Search</button>
    <button>I'm Feeling Lucky</button>
  </li>`
    sugg_cnt.innerHTML = li;
    updateLI();
}

function updateLI(){
    let lis = sugg_cnt.querySelectorAll("li");
    console.log(lis);
    lis.forEach(li => {
        li.addEventListener("mousedown", activateForm);
    });
    lis[lis.length - 1].removeEventListener("mousedown", activateForm);
}

function activateForm(){
    input.value = this.querySelector("p").innerText;
    form.submit();
}

// fetchSuggestion();