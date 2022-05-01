// Please Read README ....

import "vazir-font/dist/font-face.css";
import "./Styles/reset.css";
import "./Styles/style.scss";

import CheckInputs from "./Modules/CheckValues";
import * as props from "./Modules/Properties";
import LocalStorageEdit from "./Modules/LocalStorageEdit";

window.addEventListener("load" , () => LocalStorageEdit.ExtractFilesFromLocalStorage())
props.submitBtn.addEventListener("click" , () => new CheckInputs(props))
props.incomeLabel.addEventListener("click" , () => props.makeTypeGreen());
props.costLabel.addEventListener("click" , () => props.makeTypeRed());