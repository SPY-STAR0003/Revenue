import { Chart , registerables  } from "chart.js";


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
const showPrice = document.querySelector(".showPrice .variable")

let transactionsList = [];
let chartValues = []
let colorOfTransactionType = "text-success";
let type = "درآمد";
let transactionsListItem;

let changeTransactionsList = (list) => {
    return transactionsList = [...list]
}

let changeChartValues = (list) => {
    return chartValues = [...list]
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
    changeChartValues
}