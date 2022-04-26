// define items
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
let i = 0;
let typeClass = "text-success";
let type = "درآمد";
let listItem;

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
    if (localStorage.getItem("Revenue_info") === null) {
        return;
    }
    transactionsList = JSON.parse(localStorage.getItem("Revenue_info"))
    if (transactionsList !== null) {
        transactionsList.forEach(item => {
            makeTable(item)
        })
        i = transactionsList.length
        totals(transactionsList)
    }
}

// Update the localStorage
let updateLocalstorage = ltransactionsListist => {
    localStorage.setItem("Revenue_info" , JSON.stringify(transactionsList))
}

// check values Function & make Inputs Empty
let makeInputsEmpty = () => {
    priceInput.value = "";
    dayDate.value = "";
    monthDate.value = "";
    yearDate.value = "";
    informationInput.value = "";
    showPrice.innerHTML = "--";
}

let checkValues = () => {
    inputs.forEach(item => {
        item.classList.remove("false-input");
    })

    if (priceInput.value === "") {
        priceInput.classList.add("false-input");
        showInfo("لطفا مبلغ تراکنش خود را وارد نمایید");
        return true;
    } else if (dayDate.value === "") {
        dayDate.classList.add("false-input");
        showInfo("لطفا ذکر کنید که در چه روزی تراکنش صورت گرفته است");
        return true;
    } else if (monthDate.value === "") {
        monthDate.classList.add("false-input");
        showInfo("لطفا ذکر کنید که در چه ماهی تراکنش صورت گرفته است");
        return true;
    } else if (yearDate.value === "") {
        yearDate.classList.add("false-input");
        showInfo("لطفا ذکر کنید که در چه سالی تراکنش صورت گرفته است");
        return true;
    }
    return false;
}


// make transactionsList items
let makeList = () => {
    if (checkValues()) {
        return false;
    }
    listItem = {
        numberItem : ++i,
        price : priceInput.value,
        date : `${yearDate.value}/${monthDate.value}/${dayDate.value}`,
        type,
        info : informationInput.value
    }
    transactionsList.push(listItem)
    makeTable(listItem)
    totals(transactionsList)
    makeInputsEmpty()
    updateLocalstorage(transactionsList)
}

// make table rows
let makeTable = (item) => {
    if (item.type === "هزینه") typeClass = "text-danger";
    tableBody.insertAdjacentHTML("beforeend" , `
        <tr id="${item.numberItem}">
            <td> ${item.numberItem} </td>
            <td> ${item.price} </td>
            <td> ${item.date} </td>
            <td class="${typeClass}"> ${item.type} </td>
            <td>
                <button class="showInfo btn primaryBtn-outline" data-value="${item.info}"> پیش نمایش </button>
                <button class="deleteItem btn dangerBtn-outline"> حذف </button>
            </td>
        </tr>
    `)
    document.querySelectorAll(".showInfo").forEach(item => {
        item.addEventListener("click" , showInfo)
    })
    document.querySelectorAll(".deleteItem").forEach(item => {
        item.addEventListener("click" , deleteItem)
    })
}

// Functions for show Information
let showInfo = e => {
    if (typeof e === "string") {
        popupMassage.innerHTML = e;
    } else {
        popupMassage.innerHTML = e.target.dataset.value;
    }
    popup.style.display = "flex";
    popupBtn.addEventListener("click" , () => {
        popup.style.display = "none";
    })
}

// Functions for delete Rows
let deleteItem = e => {
    let itemNumber;
    transactionsList.forEach(item => {
        if (item.numberItem === Number(e.target.parentElement.parentElement.id)) {
            itemNumber = item.numberItem;
            transactionsList = transactionsList.filter(row => row.numberItem !== Number(e.target.parentElement.parentElement.id))
        }
    })
    updateList(transactionsList,itemNumber)
}

let updateList = (transactionsList , itemNumber) => {
    tableBody.innerHTML = "";
    --i;
    transactionsList.forEach(item => {
        if (item.numberItem >= itemNumber) {
            item.numberItem = item.numberItem - 1;
        }
        makeTable(item)
    })
    totals(transactionsList)
    updateLocalstorage(transactionsList)
}

// insert total incomes & costs & balance
let totals = transactionsList => {
    let totalInComes = 0;
    let totalCosts = 0;
    transactionsList.forEach(item => {
        if (item.type === "درآمد") {
            totalInComes += Number(item.price);
        } else {
            totalCosts += Number(item.price);
        }
    })
    let accountBalance = totalInComes - totalCosts;
    showTotalIncomes.innerHTML = totalInComes;
    showTotalCosts.innerHTML = totalCosts;
    showAccountBalance.innerHTML = accountBalance;
}

// define the type of transaction's color
let greenType = () => {
    typeClass = "text-success";
    type = "درآمد";
}

let redType = () => {
    typeClass = "text-danger";
    type = "هزینه";
}

// define events

submitBtn.addEventListener("click" , makeList);
incomeLabel.addEventListener("click" , greenType);
costLabel.addEventListener("click" , redType);