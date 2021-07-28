let footer_setting = document.getElementById("footer__setting");
let setting_cnt = document.querySelector(".setting-opt");

footer_setting.addEventListener("click", (e) => {
    e.preventDefault();
    setting_cnt.classList.toggle("none");
})

window.addEventListener("mousedown", (e) =>{
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
        console.log(match[1])
    }
}

fetchSuggestion();