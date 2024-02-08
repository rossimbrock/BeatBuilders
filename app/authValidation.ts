export function signUpFormValidation(email: string, password: string, username: string) {
    let errors = [] 
    if (email.length == 0) {
        errors.push("Email is empty");
    }
    if (password.length < 8) {
        errors.push("Password needs to be longer than 8 characters");
    }
    if (username.length == 0) { 
        errors.push("Username is empty");
    }
    return errors 
}

export function logInFormValidation(email: string, password: string) { 
    let errors = [] 
    if (email.length == 0) {
        errors.push("Email is empty");
    }
    if (password.length < 8) {
        errors.push("Password needs to be longer than 8 characters");
    }
    return errors 
}
