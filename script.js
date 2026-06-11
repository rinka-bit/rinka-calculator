const rateInput = document.getElementById("rate");

rateInput.value =
localStorage.getItem("rinka_rate") || 5.25;

document
.getElementById("hasDiscount")
.addEventListener("change",e=>{

document
.getElementById("discountBox")
.classList.toggle(
"hidden",
!e.target.checked
);

});

document
.getElementById("themeToggle")
.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(
"rinka_dark",
document.body.classList.contains("dark")
);

});

if(
localStorage.getItem("rinka_dark")
==="true"
){
document.body.classList.add("dark");
}

function roundUp(value,step){

step = Number(step);

if(step===0) return value;

return Math.ceil(value/step)*step;

}

document
.getElementById("calculateBtn")
.addEventListener("click",()=>{

const yuan =
Number(document.getElementById("yuanPrice").value);

const rate =
Number(document.getElementById("rate").value);

const qty =
Number(document.getElementById("qty").value);

const feePercent =
Number(document.getElementById("feePercent").value);

const shipping =
Number(document.getElementById("shipping").value);

const profitPerPiece =
Number(document.getElementById("profitPerPiece").value);

const discount =
document.getElementById("hasDiscount").checked
? Number(document.getElementById("discount").value)
: 0;

localStorage.setItem(
"rinka_rate",
rate
);

const afterDiscount =
(yuan-discount)
*rate
*qty;

const fee =
afterDiscount
*(feePercent/100);

const shippingTotal =
shipping*qty;

const profit =
profitPerPiece*qty;

const cost =
afterDiscount
+fee
+shippingTotal;

const final =
roundUp(
cost+profit,
document.getElementById("roundType").value
);

document.getElementById(
"finalPrice"
).textContent =
`${final.toFixed(0)} บาท`;

document.getElementById(
"detailOutput"
).innerHTML = `
<p>หลังลด: ${afterDiscount.toFixed(2)} บาท</p>
<p>ค่าธรรมเนียม: ${fee.toFixed(2)} บาท</p>
<p>ค่านำเข้า: ${shippingTotal.toFixed(2)} บาท</p>
<p>ต้นทุน: ${cost.toFixed(2)} บาท</p>
<p>กำไร: ${profit.toFixed(2)} บาท</p>
`;

window.rinkaFinal = final;

});

document
.getElementById("copyPrice")
.addEventListener("click",()=>{

navigator.clipboard.writeText(
`${window.rinkaFinal || 0}`
);

alert("คัดลอกราคาแล้ว");

});

document
.getElementById("copyPost")
.addEventListener("click",()=>{

const name =
document.getElementById(
"productName"
).value;

const text =
`${name}

💰 ราคา ${window.rinkaFinal || 0} บาท`;

navigator.clipboard.writeText(
text
);

alert("คัดลอกโพสต์แล้ว");

});

const autoFields = [
  "yuanPrice",
  "rate",
  "qty",
  "discount",
  "feePercent",
  "shipping",
  "profitPerPiece",
  "roundType"
];

autoFields.forEach(id => {

  document
    .getElementById(id)
    .addEventListener("input", () => {

      document
        .getElementById("calculateBtn")
        .click();

    });

document
.getElementById("productType")
.addEventListener("change", e => {

const type = e.target.value;

if(type === "card"){

document.getElementById("shipping").value = 5;
document.getElementById("profitPerPiece").value = 10;

}

if(type === "keychain"){

document.getElementById("shipping").value = 10;
document.getElementById("profitPerPiece").value = 20;

}

if(type === "standee"){

document.getElementById("shipping").value = 20;
document.getElementById("profitPerPiece").value = 30;

}

if(type === "plush"){

document.getElementById("shipping").value = 50;
document.getElementById("profitPerPiece").value = 50;

}

document
.getElementById("calculateBtn")
.click();

});
  
});

[
  "yuanPrice",
  "rate",
  "qty",
  "discount",
  "feePercent",
  "shipping",
  "profitPerPiece",
  "roundType"
].forEach(id => {

  const el = document.getElementById(id);

  if(el){

    el.addEventListener("input", () => {

      document
        .getElementById("calculateBtn")
        .click();

    });

  }

document
.getElementById("hasDiscount")
.addEventListener("change", () => {

  document
    .getElementById("calculateBtn")
    .click();

});
