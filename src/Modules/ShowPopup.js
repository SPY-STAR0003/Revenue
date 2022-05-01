import * as Properties from "./Properties";


class ShowPopup {
    constructor(props) {
        this.showPopup(props);
    }

    showPopup(e) {
        // first we have to check where is this request from ? 
        // if that is from an input so that type is string !
        // if that is for information that is an object !
        if (typeof e === "string") {
            Properties.popupMassage.innerHTML = e;
        } else {
            Properties.popupMassage.innerHTML = e.target.dataset.value;
        }
        Properties.popup.style.display = "flex";
        Properties.popupBtn.addEventListener("click" , () => {
            Properties.popup.style.display = "none";
        })
    } 
}

export default ShowPopup;