
const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
const complex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d]).+$/;

const uppercase = /(?=.*[A-Z])/;
const lowercase = /(?=.*[a-z])/;
const number = /(?=.*\d)/;
const symbol = /(?=.*[^\w\d])/;


var generateBtn = document.getElementById("generate-btn");
var copyBtn = document.getElementById("copy-btn");

var lengthSlider = document.getElementById("length-slider");
var passwordFlied = document.getElementById("password-field");

var length_text = document.getElementById("length");
var passwordStrengthFill = document.getElementById("password-strength");


generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

lengthSlider.addEventListener("input", onSliderValueChange);



function generatePassword() {

    var passLength = lengthSlider.value;
    var generatedPassword = "";

    for (var i = 0, n = charset.length; i < passLength; ++i) {
        generatedPassword += charset.charAt(Math.floor(Math.random() * n));
    }
    passwordFlied.value = generatedPassword;

    var strength = calculatePasswordStrength(generatedPassword,passLength);
    length_text.innerHTML = passLength;
   
    var width =  (300 / 4) * strength;
    width = width > 300 ? 300 : width; 
    passwordStrengthFill.style.width = width + "px";
    passwordStrengthFill.style.backgroundColor = lerpColor('#ff0000','#adff2f',clamp(strength/4,0,1))
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


function calculatePasswordStrength(value,passLength) {

    var strength = 0;
    if (checkString(value, uppercase) && checkString(value, lowercase))
        strength += 1;
    if (checkString(value, number))
        strength += 1;
    if (checkString(value, symbol))
        strength += 2;

    strength = strength * (passLength / 12);
    return strength;
}

function onSliderValueChange(event) {

    length_text.innerHTML = lengthSlider.value;
    generatePassword()
}

function copyPassword() {
    var textArea = document.createElement("textarea");
    textArea.value = passwordFlied.value;
    document.body.appendChild(textArea);
    textArea.select();
    navigator.clipboard.writeText(textArea.value);
    textArea.remove();

}

function checkString(str, pattern) {
    return pattern.test(str);
}


//source: https://gist.github.com/rosszurowski/67f04465c424a9bc0dae
function lerpColor(a, b, amount) {

    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}