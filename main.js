let footer_setting = document.getElementById("footer__setting");
let setting_cnt = document.querySelector(".setting-opt");

footer_setting.addEventListener("click", (e) => {
    e.preventDefault();
    setting_cnt.classList.toggle("none");
})