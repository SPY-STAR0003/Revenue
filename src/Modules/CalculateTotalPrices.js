import * as Properties from "./Properties";


class CalculateTotalPrices {

    static calculteTotals(list) {
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
        Properties.showTotalIncomes.innerHTML = totalInComes;
        Properties.showTotalCosts.innerHTML = totalCosts;
        Properties.showAccountBalance.innerHTML = accountBalance;
        return accountBalance;
    }
}


export default CalculateTotalPrices;