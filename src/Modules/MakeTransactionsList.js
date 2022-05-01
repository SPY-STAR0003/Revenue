import ShowPopup from "./ShowPopup";
import DeleteOneTransaction from "./DeleteOneTransaction";
import CalculateTotalPrices from "./CalculateTotalPrices";
import UpdateChart from "./UpdateChart";
import * as Properties from "./Properties";
import LocalStorageEdit from "./LocalStorageEdit";
import CheckInputs from "./CheckValues";


class MakeTransactionsList {
    constructor(props) {
        this.makeTransactionsListItem(props)
    }

    makeTransactionsListItem(props) {
        // Row's Number will start with number 1 !
        // & transactionList items (length) is equals with Row's Item !
        // & because we add transactions so we write ++ before that !
        let transactionsListItem = {
            rowNumber : ++[...props.transactionsList].length,
            price : props.priceInput.value,
            date : `${props.yearDate.value}/${props.monthDate.value}/${props.dayDate.value}`,
            type : props.type,
            info : props.informationInput.value
        }
        props.transactionsList.push(transactionsListItem);
        // allowChangeChart will help to system to understand...
        // ... we're deleting or adding !
        // if we're adding that is True !
        Properties.changeAllowChangeChart(true);
        MakeTransactionsList.makeTransactionsTable(props,transactionsListItem);
        CheckInputs.makeInputsEmpty()
        new LocalStorageEdit();
    }

    static makeTransactionsTable(props , transactionsListItem) {
        if (transactionsListItem.type === "هزینه") props.makeTypeRed();
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
        // account Balance will send for Chart to make a chart !
        let accountBalance = CalculateTotalPrices.calculteTotals(props.transactionsList);
        if (Properties.allowChangeChart) {
            UpdateChart.updateChart(Properties.myChart ,transactionsListItem.date , accountBalance);
            Properties.changeAllowChangeChart(false);
        }
    }
}

export default MakeTransactionsList;