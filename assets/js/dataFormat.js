const formatTime = (date, format, number) => {
    number ? number : 0;
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate() + parseInt(number)
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    if (format && format == "yyyy-MM-dd") {
        return [year, month, day].map(formatNumber).join('-')
    } else {
        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    }  
}

const nowTime = date => {
    const hour = date.getHours()
    const minute = date.getMinutes()
    return [hour, minute].map(formatNumber).join(':')
}

//获取今年
const year = date => {
    const year = date.getFullYear()
    return [year].map(formatNumber) + '年'
}

//获取今天
const formatDate = date => {
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [month].map(formatNumber) + '月' + [day].map(formatNumber) + '日'
}
//获取明天
const tomorrowDate = date => {
    const month = date.getMonth() + 1
    const day = date.getDate() + 1

    return [month].map(formatNumber) + '月' + [day].map(formatNumber) + '日'
}
//获取后天
const aftertomorrowDate = date => {
    const month = date.getMonth() + 1
    const day = date.getDate() + 2

    return [month].map(formatNumber) + '月' + [day].map(formatNumber) + '日'
}
//获取今天、明天、后天、大后天...
const formatDates = (date, number) => {
    number ? number : 0;
    const month = date.getMonth() + 1
    const day = date.getDate() + number

    return [month].map(formatNumber) + '月' + [day].map(formatNumber) + '日'
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimeTwo(number, format) {

    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}
/**补0操作*/
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
/**格式化经度纬度  */
function formatLocation(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
        longitude = parseFloat(longitude)
        latitude = parseFloat(latitude)
    }

    longitude = longitude.toFixed(2)
    latitude = latitude.toFixed(2)

    return {
        longitude: longitude.toString().split('.'),
        latitude: latitude.toString().split('.')
    }
}

module.exports = {
    nowTime: nowTime,
    formatTime: formatTime,
    year: year,
    formatDate: formatDate,
    tomorrowDate: tomorrowDate,
    aftertomorrowDate: aftertomorrowDate,
    formatTimeTwo: formatTimeTwo,
    formatLocation: formatLocation
}