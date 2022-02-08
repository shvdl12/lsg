function createCode(objArr, iLength) {
    var arr = objArr;
    var randomStr = "";
    for (var j = 0; j < iLength; j++) {
        randomStr += arr[Math.floor(Math.random() * arr.length)];
    }
    return randomStr
}

module.exports = {
    createCode
}