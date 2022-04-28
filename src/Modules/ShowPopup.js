import * as Properties from "./Properties";


class ShowPopup {
    constructor(props) {
        this.showPopup(props);
    }

    showPopup(e) {
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