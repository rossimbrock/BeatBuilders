export function signUpFormValidation(email: string, password: string, username: string) {
    let errors = {
        username: "", 
        email: "", 
        password: ""
    } 
    if (email.length == 0) {
        errors.email = "Email is empty";
    }
    if (password.length < 8) {
        errors.password = "Password needs to 8+ characters";
    }
    if (username.length == 0) { 
        errors.username = "Username is empty";
    }
    return errors 
}

export function logInFormValidation(email: string, password: string) { 
    let errors = { 
        email: "", 
        password: ""
    }
    if (email.length == 0) {
        errors.email = "Email is empty";
    }
    if (password.length < 8) {
        errors.password = "Password needs to be 8+ characters";
    }
    return errors 
}

export function checkForErrors(errors: object) { 
    for (const [key,value] of Object.entries(errors)) { 
        if (value.length !== 0) { 
            return false; 
        } 
    }
    return true; 
}
