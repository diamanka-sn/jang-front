import { HttpClient } from "@angular/common/http"
import { AbstractControl } from "@angular/forms";

export const config = {
    apiUrl: 'http://localhost:3000'
}


export const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('807605274673228623802113__luxdev-access-token')
};

export const getToken = () => {
    if (localStorage.getItem('807605274673228623802113__luxdev-access-token') !== null) {
        return true
    }
    return false
}

export const validationTelephone = (c: AbstractControl): { [key: string]: boolean } | null => {
    if (!!c.value && c.value.length > 1) {
        if (!c.value.startsWith('77') &&
            !c.value.startsWith('78') &&
            !c.value.startsWith('75') &&
            !c.value.startsWith('76') &&
            !c.value.startsWith('33') &&
            !c.value.startsWith('70') &&
            !c.value.startsWith('30')) {
            return { 'erreurTelephone': true }
        }
    }

    return null

}

export const nom = () => {
    const user = localStorage.getItem('user')
    console.log(user)
    if (user != null) {
        return JSON.parse(user);
    } else {
        localStorage.clear()
    }
}

export const getRole = () => {
    const user = localStorage.getItem('roleuser')
    if (user != null) {
        return JSON.parse(user);
    } else {
        localStorage.clear()
    }
}

export const seDeconnecter = () => {
    localStorage.removeItem('807605274673228623802113__luxdev-access-token')
    localStorage.removeItem('roleuser')
    localStorage.removeItem('user')
}