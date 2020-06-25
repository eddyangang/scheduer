var timeStamps = {
    standard: ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am"],
    military: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    messages: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
};

// get local stored info

var standardTime = timeStamps.standard;
var militaryTime = timeStamps.military;
var messages = timeStamps.messages;


$(document).ready(function () {




    function init() {

        var storage = JSON.parse(localStorage.getItem("timeStamps"));

        if (storage) {
            timeStamps = storage;
            messages = timeStamps.messages; //update messages from previous save
        }

        renderMessages();
    }

    function renderMessages() {
        console.log("****************from render****************");
        for (let i = 0; i < messages.length; i++) {
            // textarea with id
            var id = i + 9;

            if (messages[i] !== null) {
                $('#' + id).val(messages[i]);

                console.log(typeof messages[i]);

                console.log(`this id: ${id} with message: ${messages[i]}`);
            }
        }
    }


    function storeMessage() {
        localStorage.setItem("timeStamps", JSON.stringify(timeStamps))
    }


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
        var timeBlockText = $('<textarea>')
        timeBlockText.addClass("description textarea")
        timeBlockText.attr("id", militaryTime[i]);
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


    $('.saveBtn').on("click", function (event) {
        event.preventDefault()

        var id = parseInt($(this).val()); //get value of button = id of textarea

        var text = $('#' + id).val() //textarea with id

        timeStamps.messages[id - 9] = text;

        storeMessage(); // store timeStamp as "timeStamp"
        renderMessages();
        // console.log(messages);

    })

    init();

})