const {prizeNumbers, prizeSpecialNumber, myNumbersList, prizeExternalNumbersList} = require('./config');

// 共用的匹配計數函數
function countMatches(numbers, targetNumbers) {
    return numbers.filter(num => targetNumbers.includes(num)).length;
}

function getPrizeDescription(matchCount, hasSpecial) {
    switch (matchCount) {
        case 6:
            return '頭獎(82%)';
        case 5:
            return hasSpecial ? '貳獎(6.5%)' : '參獎(7%)';
        case 4:
            return hasSpecial ? '肆獎(4.5%)' : '伍獎(NT$2,000)';
        case 3:
            return hasSpecial ? '陸獎(NT$1,000)' : '普獎(NT$400)';
        case 2:
            return hasSpecial ? '柒獎(NT$400)' : '沒中';
        default:
            return '沒中';
    }
}

function checkNumbers() {
    myNumbersList.map(myNumbers => {
        const matchCount = countMatches(myNumbers, prizeNumbers);
        const hasSpecial = myNumbers.includes(prizeSpecialNumber);
        const prize = getPrizeDescription(matchCount, hasSpecial);
        const type = '大樂透';
        console.log(`${type},${prize},中${matchCount}碼${hasSpecial ? ' + 中特別號' : ''},我的號碼:${JSON.stringify(myNumbers)}`)
    });
}

function checkExternalNumbers() {
    myNumbersList.forEach(myNumbers => {
        prizeExternalNumbersList.forEach(prizeExternalNumbers => {
            const matchCount = countMatches(myNumbers, prizeExternalNumbers);
            const prize = matchCount === 6 ? '中獎' : '沒中';
            const type = '活動加碼';
            console.log(`${type},${prize},中${matchCount}碼,我的號碼:${JSON.stringify(myNumbers)},加開號碼:${JSON.stringify(prizeExternalNumbers)}`)
        });
    });
}

checkNumbers();
checkExternalNumbers();