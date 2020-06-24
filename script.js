var timeStamps = [{
    "9am": 9,
    "10am": 10,
    "11am": 11,
    "12pm": 12,
    "1pm": 13,
    "2pm": 14,
    "3pm": 15,
    "4pm": 16,
    "5pm": 17,
    "6pm": 18,
    "7pm": 19,
    "8pm": 20,
    "9pm": 21,
    "10pm": 22,
    "11pm": 23,
    "12am": 24
}]

var standardTime = Object.keys(timeStamps[0]);
var militaryTime = Object.values(timeStamps[0]);



$(document).ready(function () {

    // Load Time blocks
    for (let i = 0; i < militaryTime.length; i++) {

        // Create Time Block element
        var timeBlock = $('<div>')
        timeBlock.addClass("time-block row")
        //Hour Display
        var hour = $('<h3>')
        hour.text(standardTime[i])
        hour.addClass("hour")
        timeBlock.append(hour)
        // Time block text
        var timeBlockText = $('<input>')
        timeBlockText.addClass("description textarea")
        timeBlock.append(timeBlockText)
        // Time block save button
        var saveBtn = $('<button>')
        var icon = ('<i class="far fa-save"></i>')
        saveBtn.append(icon)
        saveBtn.addClass("saveBtn")
        saveBtn.attr("value", militaryTime[i]) // maybe
        timeBlock.append(saveBtn)
        // Check current hour to style the past, present, and future time blocks. 
        var todayHours = moment().hour();
        if (todayHours === militaryTime[i]) {
            timeBlockText.addClass("present")
        } else if (todayHours < militaryTime[i]) {
            timeBlockText.addClass("future")
        } else {
            timeBlockText.addClass("past")
        }




        $('.container').append(timeBlock)
    }

    // Set up date and time display
    $('#currentDay').text(moment().format("dddd, MMMM Do YYYY"))

    let updateTime = function () {
        $("#currentTime").text(moment().format('h:mm:ss'))
    }

    updateTime();
    setInterval(updateTime, 1000);


    $('.saveBtn').on("click", () => {
        console.log($(this).val());
        console.log(typeof militaryTime[0]);
        
        
    })
    
})


var arr = [{
    standard: "9am",
    military: 9,
    message: "Hello"
}, {
    standard: "10am",
    military: 10,
    message: "Hello"
}]

console.log(arr[1]);

