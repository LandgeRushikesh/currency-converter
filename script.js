let  BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let convert = document.querySelectorAll(".convert select")
let amount = document.querySelector(".amount input")
let btn = document.querySelector("form button")
let fromCurr =document.querySelector(".from select")
let toCurr =document.querySelector(".to select")
let msg = document.querySelector(".msg")

for(let select of convert){
    for(currCode in countryList){
        let newoption = document.createElement("option")
        newoption.innerText = currCode;
        newoption.value = currCode;
        if(select.id === "from" && currCode === "USD"){
            newoption.selected = "selected";
        }
        else if(select.id === "to" && currCode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption)
        }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}

let updateFlag = (element)=>{
    let currCode = element.value;
    let contryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    let newSrc = `https://flagsapi.com/${contryCode}/shiny/64.png`;
    img.src = newSrc;
}

let currExchangeRate =async ()=>{
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1){
        amount.value = 1;
        amtVal = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    finalAmount = amtVal * rate

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`


}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    currExchangeRate();
})

window.addEventListener("load",()=>{
    currExchangeRate();
})
