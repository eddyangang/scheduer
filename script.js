$(document).ready(function () {

    // Load Time blocks
    var timeStamps = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm"];

    for (let i = 0; i < timeStamps.length; i++) {
        const times = timeStamps[i];
        var timeBlock = $('<div>'); 
        timeBlock.addClass("time-block row")

        //Hour Display
        var hour = $('<h3>')
        hour.text(times)
        hour.addClass(" hour")
        timeBlock.append(hour)


        var timeBlockText = $('<input>')
        timeBlockText.addClass("description textarea")
        timeBlock.append(timeBlockText)

        var saveBtn = $('<button>')
        saveBtn.addClass("saveBtn")
        timeBlock.append(saveBtn)


        $('.container').append(timeBlock)
    }
    
    

    

})

