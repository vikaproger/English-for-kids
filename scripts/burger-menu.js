const burgerMenu = document.querySelector(".burger-menu");
const burgerMenuIcon = document.querySelector(".menu-icon__wrapper");

burgerMenuIcon.onclick = function(){
    document.querySelector(".menu-icon").classList.toggle("menu-icon-active");
    burgerMenu.classList.toggle("burger-menu-active"); 
};
document.addEventListener("click", function(e) {
    if (  e.target.className === "burger-menu__overlay") {
        document.querySelector(".menu-icon").classList.remove("menu-icon-active");
        burgerMenu.classList.remove("burger-menu-active");
    }
});
const menuList = document.querySelectorAll(".list__item"); 
menuList.forEach(el => {
    el.addEventListener("click", () => {
        properties = `${el.lastChild.innerText.replace(/\s/g, "")}`;
        checkProp(properties);
        if (document.querySelector(".stars__wrapper").childNodes.length != 0) {
            document.querySelector(".stars__wrapper").innerHTML = "";
        }
        showBtn();
        indexOfCurrWord = 0;
        errorCounts = 0;
        document.querySelector(".menu-icon").classList.remove("menu-icon-active");
        burgerMenu.classList.remove("burger-menu-active");
    });
});


