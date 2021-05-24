const train= document.createElement("label");
train.className = "switch";
train.innerHTML = `<input type="checkbox"><span class="slider round"></span>`;
document.querySelector('header').append(train);

let checkMode = document.querySelector('input');
let modeProp = false;
checkMode.addEventListener('change', () => {    
        modeProp = checkMode.checked;   
})
