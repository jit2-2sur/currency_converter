let search = document.querySelector(".searchBox");
let convert = document.querySelector(".convert");
let fromCurrency = document.querySelector(".from");
let toCurrency = document.querySelector(".to");
let finalValue = document.querySelector(".finalValue");
let finalAmount = document.getElementById("finalAmount");
let resultFrom;
let resultTo;
let searchValue;

const apiKey = "ab390a257fe7c5900de59a40";

fromCurrency.addEventListener("change", (event) => {
  resultFrom = `${event.target.value}`;
});

toCurrency.addEventListener("change", (event) => {
  resultTo = `${event.target.value}`;
});

search.addEventListener("input", updateValue);

function updateValue(e) {
  searchValue = e.target.value;
}

convert.addEventListener("click", getResults);

function getResults() {
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${resultFrom}`;
    console.log("amount : ", searchValue, "  from: ", resultFrom, "  to: ", resultTo);
    fetch(apiUrl,)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log("conversion rate: ",data.conversion_rates[resultTo]);
            const exchangeRate = data.conversion_rates[resultTo];
            const convertedAmount = searchValue * exchangeRate;
            finalValue.textContent = `${searchValue} ${resultFrom} = ${convertedAmount.toFixed(
              2
            )} ${resultTo}`;
        })
        .catch((error) => {
          console.error("Error fetching exchange rates:", error);
        });
}

function clearVal() {
  window.location.reload();
  document.getElementsByClassName("finalValue").innerHTML = "0.00";
}