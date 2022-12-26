
/*eslint-disable*/
import "@babel/polyfill"
import { login, logout } from "./login"
import { displayMap } from "./mapbox"
import { updateSettings } from "./updateSettings"

var mapbox = document.getElementById("map")

if (mapbox) {
    const locations = JSON.parse(mapbox.dataset.locations)
    displayMap(locations)
}

const form = document.getElementById("form1")

if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault()

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        login(email, password)
    })
}

const logoutBtn = document.querySelector(".nav__el--logout")

if (logoutBtn) {
    logoutBtn.addEventListener("click", logout)
}

const formUpdate = document.querySelector(".form-user-data")
const formpassword = document.querySelector(".form-user-password")

if (formUpdate) {
    formUpdate.addEventListener("submit", (event) => {

        event.preventDefault()

        const form = new FormData()

        form.append("name", document.getElementById("name").value)
        form.append("email", document.getElementById("email").value)
        form.append("photo", document.getElementById("photo").files[0])

        console.log(form)

        updateSettings(form, "data")
    }

    )
}

if (formpassword) {
    formpassword.addEventListener("submit", async (event) => {

        event.preventDefault()
        document.querySelector(".btn--save--password ").textContent = "Updating..."

        const passwordCurrent = document.getElementById("password-current").value
        const password = document.getElementById("password").value
        const passwordConfirm = document.getElementById("password-confirm").value

        await updateSettings({ passwordCurrent, password, passwordConfirm }, "password")

        document.querySelector(".btn--save--password ").textContent = "Save password"

        document.getElementById("password-current").value = ''
        document.getElementById("password").value = ''
        document.getElementById("password-confirm").value = ''
    }

    )
}


