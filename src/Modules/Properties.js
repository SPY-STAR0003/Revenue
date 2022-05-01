import { Chart , registerables } from "chart.js";
import ShowPopup from "./ShowPopup";
import Num2persian from "num2persian";


// define constant items
const submitBtn = document.querySelector(".submitBtn");
const inputs = document.querySelectorAll("input[type=number]")
const priceInput = document.getElementById("price");
const dayDate = document.getElementById("day");
const monthDate = document.getElementById("month");
const yearDate = document.getElementById("year");
const informationInput = document.getElementById("information");
const tableBody = document.querySelector("#micro-account tbody");
const showTotalIncomes = document.querySelector("#total-incomes");
const showTotalCosts = document.querySelector("#total-costs");
const showAccountBalance = document.querySelector("#balance-account");
const incomeLabel = document.getElementById("income-label");
const costLabel = document.getElementById("cost-label");
const popup = document.querySelector(".popup-background");
const popupMassage = document.querySelector(".popup-background .popup .popup-massage");
const popupBtn = document.querySelector(".popup-background .popup button");
const showPrice = document.querySelector(".showPrice .variable");

let transactionsList = [];
let chartValues = []
let colorOfTransactionType = "text-success";
let type = "درآمد";
let allowChangeChart = false;

const changeTransactionsList = (list) => {
    return transactionsList = [...list]
}

const changeChartValues = (list) => {
    chartValues = [...list]
}

const changeAllowChangeChart = bool => {
    allowChangeChart = bool;
}

// These two Functions change type'name and type's class ! 

const makeTypeGreen = () => {
    colorOfTransactionType = "text-success";
    type = "درآمد";
}

const makeTypeRed = () => {
    colorOfTransactionType = "text-danger";
    type = "هزینه";
}

Chart.register(...registerables);
const myChart = new Chart(
    document.querySelector('.chart canvas'),
    {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'مانده حساب شما ',
                backgroundColor: '#313552',
                borderColor: '#A63EC5',
                data: [],
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 14,
                            family : "Vazir , serif",
                        }
                    }
                }
            }
        }
    }
);

export {
    submitBtn,
    inputs,
    priceInput,
    dayDate,
    monthDate,
    yearDate,
    informationInput,
    tableBody ,
    showTotalIncomes,
    showTotalCosts,
    showAccountBalance,
    incomeLabel,
    costLabel,
    popup,
    popupMassage,
    popupBtn,
    showPrice,
    type,
    transactionsList,
    chartValues,
    colorOfTransactionType,
    changeTransactionsList,
    myChart,
    changeChartValues,
    allowChangeChart,
    changeAllowChangeChart,
    makeTypeGreen,
    makeTypeRed
}

// These 4 Functions will check Inputs Rationality ! (Not being Empty!!!!!!) 

dayDate.addEventListener("blur" , e => {
    if (e.target.value > 31 || e.target.value < 1) {
        new ShowPopup(`مقدار وارد شده برای پارامتر روز ، مجاز نمی باشد !
        مقادیر مجاز از 1 تا 31 می باشد .
        `);
        e.target.value = ""
    }
})

monthDate.addEventListener("blur" , e => {
    if (e.target.value > 12 || e.target.value < 1) {
        new ShowPopup(`مقدار واردشده برای پارامتر ماه ، مجاز نمی باشد !
        مقادیر مجاز از 1 تا 12 می باشد .
        `);
        e.target.value = ""
    }
})

yearDate.addEventListener("blur" , e => {
    if (e.target.value > 2050 || e.target.value < 1300) {
        new ShowPopup(`مقدار وارد شده برای پارامتر سال ، مجاز نمی باشد !
        مقادیر مجاز از 1300 تا 2050 می باشد .
        `);
        e.target.value = ""
    }
})

priceInput.addEventListener("blur" , () => {
    if(priceInput.value === "") {
        new ShowPopup("لطفا مبلغِ تراکنش خود را وارد کنید");
    } else {
        showPrice.innerHTML = `${Num2persian(priceInput.value)} تومان`
    }
})