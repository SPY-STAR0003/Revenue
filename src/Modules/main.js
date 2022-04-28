// ========= My problems (HELPPPPPPPPPPPPPPPPPP !)
// I could not find any way to replace the i value with a suitable function!
// When I see this complex code ! I see that I have to use modules for this project ! But I'm not good in that !
// ========= Next Commits
// I'll use a Dark Mode for this project and that will be simillar to that project Ilia said !
// This Project have to be responsive for all devices !

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

// define parameters

let transactionsList = [];
let chartValues = []
// ===== Warning : I CAN'T REPLACE "i" WITH ANY THING BETTER !!!!!!!
// ===== i : this variable is for row's number in table !!
let i = 0;
let colorOfTransactionType = "text-success";
let type = "درآمد";
let transactionsListItem;

// Update the localStorage
const updateLocalstorage = transactionsList => {
    localStorage.setItem("Revenue_transactionsList" , JSON.stringify(transactionsList));
    localStorage.setItem("Revenue_chartValues" , JSON.stringify(chartValues));
}

// check values Function & make Inputs Empty
const makeInputsEmpty = () => {
    priceInput.value = "";
    dayDate.value = "";
    monthDate.value = "";
    yearDate.value = "";
    informationInput.value = "";
    showPrice.innerHTML = "--";
}

// make transactionsList items
const makeList = () => {
    makeTable(transactionsListItem);
    let accountBalance = totals(transactionsList);
    addData(myChart , transactionsListItem.date , accountBalance);
    makeInputsEmpty();
    updateLocalstorage(transactionsList);
}


const chartValuesListUpdate = transactionsItem => {
    // first we make chart empty ...
    chartValues.forEach(() => {
        removeData(myChart)
    })

    // if isTrue be True so after delete a row we have to decrease all values after that !!! 
    let isTrue = transactionsItem.type === "درآمد" ? true : false;

    let deletedIndex = chartValues.findIndex(item => {
        return item.label === transactionsItem.date;
    })

    chartValues.forEach((item , index) => {
        if(index > deletedIndex && isTrue) {
            item.data -= Number(transactionsItem.price)
        } else if(index > deletedIndex && !isTrue) {
            item.data += Number(transactionsItem.price)
        }
    })

    chartValues.forEach(chartItem => {
        if (chartItem.label === transactionsItem.date) {
            chartValues = chartValues.filter(item => item.label !== transactionsItem.date)
        }
    })

    chartValues.forEach(item => {
        addData(myChart , item.label , item.data);
    })

    updateLocalstorage(transactionsList)
}

// This Listeners will Alert user if they insert an unacceptable value !
dayDate.addEventListener("blur" , e => {
    if (e.target.value > 31 || e.target.value < 1) {
        showInfo(`مقدار وارد شده برای پارامتر روز ، مجاز نمی باشد !
        مقادیر مجاز از 1 تا 31 می باشد .
        `);
        e.target.value = ""
    }
})

monthDate.addEventListener("blur" , e => {
    if (e.target.value > 12 || e.target.value < 1) {
        showInfo(`مقدار واردشده برای پارامتر ماه ، مجاز نمی باشد !
        مقادیر مجاز از 1 تا 12 می باشد .
        `);
        e.target.value = ""
    }
})

yearDate.addEventListener("blur" , e => {
    if (e.target.value > 2050 || e.target.value < 1300) {
        showInfo(`مقدار وارد شده برای پارامتر سال ، مجاز نمی باشد !
        مقادیر مجاز از 1300 تا 2050 می باشد .
        `);
        e.target.value = ""
    }
})

// this listener helps to turn the type of price to string

priceInput.addEventListener("blur" , () => {
    if(priceInput.value === "") {
        showInfo("لطفا مبلغِ تراکنش خود را وارد کنید");
    } else {
        showPrice.innerHTML = `${Num2persian(priceInput.value)} تومان`
    }
})

// get transactionsList from localStorage
window.onload = () => {
    if (localStorage.getItem("Revenue_transactionsList") !== null) {
        transactionsList = JSON.parse(localStorage.getItem("Revenue_transactionsList"))
        if (transactionsList !== null) {
            transactionsList.forEach(item => {
                makeTable(item)
            })
            i = transactionsList.length
            totals(transactionsList)
        }
    }
    if (localStorage.getItem("Revenue_chartValues") !== null) {
        let chartValuesList = JSON.parse(localStorage.getItem("Revenue_chartValues"));
        chartValuesList.forEach(item => {
            addData(myChart , item.label , item.data);
        })
    }
}

// This functions are from chart.js library ....

const removeData = (chart) => {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

const addData = (chart, label, data) => {
    chartValues.push({data , label});
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

