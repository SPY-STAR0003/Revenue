import MakeTransactionsList from "./MakeTransactionsList" ;

class CheckInputs {
    constructor (props) {
        if (this.checkInputsValue(props)) {
            new MakeTransactionsList(props)
        }
    }

    checkInputsValue(props) {
        props.inputs.forEach(item => {
            item.classList.remove("false-input");
        })
        if (props.priceInput.value === "") {
            props.priceInput.classList.add("false-input");
            // showInfo("لطفا مبلغ تراکنش خود را وارد نمایید");
            return false;
        } else if (props.dayDate.value === "") {
            props.dayDate.classList.add("false-input");
            // showInfo("لطفا ذکر کنید که در چه روزی تراکنش صورت گرفته است");
            return false;
        } else if (props.monthDate.value === "") {
            props.monthDate.classList.add("false-input");
            // showInfo("لطفا ذکر کنید که در چه ماهی تراکنش صورت گرفته است");
            return false;
        } else if (props.yearDate.value === "") {
            props.yearDate.classList.add("false-input");
            // showInfo("لطفا ذکر کنید که در چه سالی تراکنش صورت گرفته است");
            return false;
        }
        return true;
    }
}

export default CheckInputs;