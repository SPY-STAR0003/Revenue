import * as Properties from "./Properties";
import MakeTransactionsList from "./MakeTransactionsList";
import CalculateTotalPrices from "./CalculateTotalPrices";
import UpdateChart from "./UpdateChart";
import LocalStorageEdit from "./LocalStorageEdit";

class DeleteOneTransaction {
    constructor(props) {
        this.delete(props)
    }

    delete(e) {
        let list = Properties.transactionsList;
        let targetId = e.target.parentElement.parentElement.id;
        // ======> e.target.parentElement.parentElement.id == Row <======
        let itemNumber;
        // this func will find the transaction that we clicked on that (in transactionlist) !
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
        // for update the LIST !
        // first : we make Table EMPTY !
        Properties.tableBody.innerHTML = "";
        list.forEach(item => {
            // second : we rewrite Row's number !
            // Example : if we delete ROW-2 now ROW-3 become ROW-2 (We talk about Numbers !!!) !
            if (item.rowNumber >= itemNumber) {
                item.rowNumber = item.rowNumber - 1;
            }
            // third : we write new List in table !
            MakeTransactionsList.makeTransactionsTable(Properties , item)
        })
        CalculateTotalPrices.calculteTotals(list);
        new LocalStorageEdit();
    }
}

export default DeleteOneTransaction;