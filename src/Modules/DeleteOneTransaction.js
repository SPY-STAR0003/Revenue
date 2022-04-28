import * as Properties from "./Properties";
import MakeTransactionsList from "./MakeTransactionsList";
import CalculateTotalPrices from "./CalculateTotalPrices";
import UpdateChart from "./UpdateChart";

class DeleteOneTransaction {
    constructor(props) {
        this.delete(props)
    }

    delete(e) {
        let list = Properties.transactionsList;
        let targetId = e.target.parentElement.parentElement.id;
        let itemNumber;
        list.forEach(item => {
            if (item.rowNumber === Number(targetId)) {
                UpdateChart.editChart(item)
                itemNumber = item.rowNumber;
                list = list.filter(row => row.rowNumber !== Number(targetId));
                return list;
            }
        })
        Properties.changeTransactionsList(list)
        this.updateTransactionsList(list,itemNumber)
    }

    updateTransactionsList(list , itemNumber) {
        Properties.tableBody.innerHTML = "";
        list.forEach(item => {
            if (item.rowNumber >= itemNumber) {
                item.rowNumber = item.rowNumber - 1;
            }
            MakeTransactionsList.makeTransactionsTable(Properties , item)
        })
        CalculateTotalPrices.calculteTotals(list)
        // updateLocalstorage(transactionsList)
    }
}

export default DeleteOneTransaction;