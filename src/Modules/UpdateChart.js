import { Chart , registerables  } from "chart.js";
import * as Properties from "./Properties";


class UpdateChart {
    
    static updateChart(myChart , label , data) {
        Properties.chartValues.push({data , label});
        myChart.data.labels.push(label);
        myChart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        myChart.update();
    }

    static editChart(transactionsItem) {
        // first we make chart empty ...
        Properties.chartValues.forEach(() => {
            UpdateChart.removeData(Properties.myChart)
        })
    
        // if isTrue be True so after delete a row we have to decrease all values after that !!! 
        let isTrue = transactionsItem.type === "درآمد" ? true : false;
    
        let deletedIndex = Properties.chartValues.findIndex(item => {
            return item.label === transactionsItem.date;
        })
    
        Properties.chartValues.forEach((item , index) => {
            if(index > deletedIndex && isTrue) {
                item.data -= Number(transactionsItem.price)
            } else if(index > deletedIndex && !isTrue) {
                item.data += Number(transactionsItem.price)
            }
        })
        
        console.log(Properties.chartValues)
        Properties.chartValues.forEach(chartItem => {
            if (chartItem.label === transactionsItem.date) {
                Properties.changeChartValues(Properties.chartValues.filter(item => item.label !== transactionsItem.date))
            }
        })
        console.log(Properties.chartValues)

    
        Properties.chartValues.forEach(item => {
            UpdateChart.updateChart(Properties.myChart , item.label , item.data);
        })

        console.log(Properties.chartValues)
    
        // updateLocalstorage(transactionsList)
    }
    
    static removeData(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update();
    }
}

export default UpdateChart;