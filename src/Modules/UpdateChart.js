import { Chart , registerables  } from "chart.js";
import * as Properties from "./Properties";
import LocalStorageEdit from "./LocalStorageEdit";


class UpdateChart {
    
    static updateChart(myChart , label , data) {
        Properties.chartValues.push({data , label});
        myChart.data.labels.push(label);
        myChart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        myChart.update();
    }

    static removeData(myChart) {
        myChart.data.labels.pop();
        myChart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        myChart.update();
    }

    static editChart(transactionsItem) {
        // first : we make chart empty !
        Properties.chartValues.forEach(() => {
            UpdateChart.removeData(Properties.myChart);
        })
    
        // second : If the type has been added to the sum value then know we've to decrese the sum ! 
        let isTrue = transactionsItem.type === "درآمد" ? true : false;
    
        // we've to find the deleted item in chartValues !
        let deletedIndex = Properties.chartValues.findIndex(item => {
            return item.label === transactionsItem.date;
        })
    
        Properties.chartValues.forEach((item , index) => {
            if(index > deletedIndex && isTrue) {
                item.data -= Number(transactionsItem.price);
            } else if(index > deletedIndex && !isTrue) {
                item.data += Number(transactionsItem.price);
            }
        })
        
        Properties.chartValues.forEach(chartItem => {
            if (chartItem.label === transactionsItem.date) {
                Properties.changeChartValues(Properties.chartValues.filter(item => {
                    return item.label !== transactionsItem.date;
                }))
            }
        })
    
        // third : now we'll update the chart again !
        Properties.chartValues.forEach(item => {
            UpdateChart.updateChart(Properties.myChart , item.label , item.data);
        })
        
        new LocalStorageEdit();
    }
}

export default UpdateChart;