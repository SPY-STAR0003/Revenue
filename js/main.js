// متاسفانه من فراموش کردم که مرحله به مرحله پروژه را داخل گیت هاب قرار دهم
// برای همین پروژه را یکجا داخل گیت هاب قرار دادم


// define items
let submitBtn = document.querySelector(".submitBtn");
let inputs = document.querySelectorAll("input[type=number]")
let priceInput = document.getElementById("price");
let dayDate = document.getElementById("day");
let monthDate = document.getElementById("month");
let yearDate = document.getElementById("year");
let informationInput = document.getElementById("information");
let tableBody = document.querySelector("#micro-account tbody");
let showTotalIncomes = document.querySelector("#total-incomes");
let showTotalCosts = document.querySelector("#total-costs");
let showAccountBalance = document.querySelector("#balance-account")
let incomeLabel = document.getElementById("income-label");
let costLabel = document.getElementById("cost-label");
let popup = document.querySelector(".popup-background");
let popupMassage = document.querySelector(".popup-background .popup .popup-massage");
let popupBtn = document.querySelector(".popup-background .popup button");

// define parameters

let list = [];
let i = 0;
let typeClass = "text-success";
let type = "درآمد";
let listItem;

// get list from localStorage
let getListFromLocal = () => {
    list = JSON.parse(localStorage.getItem("listItems"))
    if (list !== null) {
        list.forEach(item => {
            makeTable(item)
        })
        i = list.length
        totals(list)
    }
}

// // Update the localStorage
let updateLocalstorage = list => {
    localStorage.setItem("listItems" , JSON.stringify(list))
}

// check values Function & make Inputs Empty

let makeInputsEmpty = () => {
    priceInput.value = "";
    dayDate.value = "";
    monthDate.value = "";
    yearDate.value = "";
    informationInput.value = "";
}

let checkValues = () => {
    let answer;
    inputs.forEach(item => {
        if (item.value !== "" && item.classList.contains("false-input")) {
            item.classList.remove("false-input");
        } else if (item.value === "") {
            item.classList.add("false-input");
            answer = true;
            return;
        }
        answer = false;
    })
    return answer;
}

let alertForEmptyInputs = () => {
    popup.style.display = "flex";
    popupMassage.innerHTML = "لطفا مقادیر خواسته شده را وارد نمایید !";
    popupBtn.addEventListener("click" , () => {
        popup.style.display = "none";
    })
}

// make list items
let makeList = () => {
    if (checkValues()) {
        alertForEmptyInputs();
        return false;
    }
    listItem = {
        numberItem : ++i,
        price : priceInput.value,
        date : `${yearDate.value}/${monthDate.value}/${dayDate.value}`,
        type,
        info : informationInput.value
    }
    list.push(listItem)
    makeTable(listItem)
    totals(list)
    makeInputsEmpty()
    updateLocalstorage(list)
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
    inputs.forEach(item => {
        if (item.classList.contains("false-input")) {
            item.classList.remove("false-input")
        }
    })
}

// Functions for show Information
let showInfo = e => {
    popup.style.display = "flex";
    popupMassage.innerHTML = e.target.dataset.value;
    popupBtn.addEventListener("click" , () => {
        popup.style.display = "none";
    })
}

// Functions for delete Rows
let deleteItem = e => {
    let itemNumber;
    list.forEach(item => {
        if (item.numberItem === Number(e.target.parentElement.parentElement.id)) {
            itemNumber = item.numberItem;
            list = list.filter(row => row.numberItem !== Number(e.target.parentElement.parentElement.id))
        }
    })
    updateList(list,itemNumber)
}

let updateList = (list , itemNumber) => {
    tableBody.innerHTML = "";
    --i;
    list.forEach(item => {
        if (item.numberItem >= itemNumber) {
            item.numberItem = item.numberItem - 1;
        }
        makeTable(item)
    })
    totals(list)
    updateLocalstorage(list)
}

// insert total incomes & costs & balance
let totals = list => {
    let totalInComes = 0;
    let totalCosts = 0;
    list.forEach(item => {
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
window.onload = getListFromLocal;