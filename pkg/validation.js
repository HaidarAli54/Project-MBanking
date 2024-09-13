function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(emailRegex.test(email));
    return emailRegex.test(email);
}

function validateIndonesianPhoneNumber(phoneNumber) {
    const phoneRegex = /^(?:\+62|0)[2-9]{1}[0-9]{7,12}$/;
    return phoneRegex.test(phoneNumber);
}


module.exports = {
    validateEmail,
    validateIndonesianPhoneNumber
}