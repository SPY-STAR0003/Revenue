import ShowPopup from "./ShowPopup";
import DeleteOneTransaction from "./DeleteOneTransaction";
import CalculateTotalPrices from "./CalculateTotalPrices";
import UpdateChart from "./UpdateChart";
import * as Properties from "./Properties"


class MakeTransactionsList {
    constructor(props) {
        this.makeTransactionsListItem(props)
    }

    makeTransactionsListItem(props) {
        let transactionsListItem = {
            rowNumber : ++[...props.transactionsList].length,
            price : props.priceInput.value,
            date : `${props.yearDate.value}/${props.monthDate.value}/${props.dayDate.value}`,
            type : props.type,
            info : props.informationInput.value
        }
        props.transactionsList.push(transactionsListItem);
        MakeTransactionsList.makeTransactionsTable(props,transactionsListItem)
    }

    static makeTransactionsTable(props , transactionsListItem) {
        if (transactionsListItem.type === "هزینه") props.colorOfTransactionType = "text-danger";
        props.tableBody.insertAdjacentHTML("beforeend" , `
            <tr id="${transactionsListItem.rowNumber}">
                <td> ${transactionsListItem.rowNumber} </td>
                <td> ${transactionsListItem.price} </td>
                <td> ${transactionsListItem.date} </td>
                <td class="${props.colorOfTransactionType}"> ${transactionsListItem.type} </td>
                <td>
                    <button id="showInfo${transactionsListItem.rowNumber}" class="showInfo btn primaryBtn-outline" data-value="${transactionsListItem.info}"> پیش نمایش </button>
                    <button id="deleteBtn${transactionsListItem.rowNumber}" class="deleteItem btn dangerBtn-outline"> حذف </button>
                </td>
            </tr>
        `)
        document.querySelector(`#showInfo${transactionsListItem.rowNumber}`).addEventListener("click" , e => {
            new ShowPopup(e)
        })
        document.querySelector(`#deleteBtn${transactionsListItem.rowNumber}`).addEventListener("click" , e => {
            new DeleteOneTransaction(e)
        })
        let accountBalance = CalculateTotalPrices.calculteTotals(props.transactionsList);
        UpdateChart.updateChart(Properties.myChart ,transactionsListItem.date , accountBalance);

    }
}

export default MakeTransactionsList;