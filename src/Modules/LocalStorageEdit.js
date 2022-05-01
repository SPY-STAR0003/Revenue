import * as Properties from "./Properties";
import MakeTransactionsList from "./MakeTransactionsList";
import CalculateTotalPrices from "./CalculateTotalPrices";
import UpdateChart from "./UpdateChart";

class LocalStorageEdit {
    constructor() {
        this.updateLocalstorage();
    }

    updateLocalstorage() {
        localStorage.setItem("Revenue_transactionsList" , JSON.stringify(Properties.transactionsList));
        localStorage.setItem("Revenue_chartValues" , JSON.stringify(Properties.chartValues));
    }

    static ExtractFilesFromLocalStorage() {
        if (localStorage.getItem("Revenue_transactionsList") !== null) {
            Properties.changeTransactionsList(JSON.parse(localStorage.getItem("Revenue_transactionsList")));
            if (Properties.transactionsList !== null) {
                Properties.transactionsList.forEach(item => {
                    MakeTransactionsList.makeTransactionsTable(Properties , item);
                })
                CalculateTotalPrices.calculteTotals(Properties.transactionsList);
            }
        }
        if (localStorage.getItem("Revenue_chartValues") !== null) {
            Properties.changeChartValues(JSON.parse(localStorage.getItem("Revenue_chartValues")))
            Properties.chartValues.forEach(item => {
                UpdateChart.updateChart(Properties.myChart , item.label , item.data);
            })
        }
    }
}

export default LocalStorageEdit;