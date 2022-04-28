import "vazir-font/dist/font-face.css";
import "./Styles/reset.css";
import "./Styles/style.scss";

import CheckInputs from "./Modules/CheckValues";
import * as prop from "./Modules/Properties";

const greenType = () => {
    prop.colorOfTransactionType = "text-success";
    prop.type = "درآمد";
}

const redType = () => {
    prop.colorOfTransactionType = "text-danger";
    prop.type = "هزینه";
}

prop.submitBtn.addEventListener("click" , () => new CheckInputs(prop))
prop.incomeLabel.addEventListener("click" , greenType);
prop.costLabel.addEventListener("click" , redType);