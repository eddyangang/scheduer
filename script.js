var timeStamps = {
    standard: ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am"],
    military: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    messages: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
};

// Extract information fron timeStamps.
var standardTime = timeStamps.standard;
var militaryTime = timeStamps.military;
var messages = timeStamps.messages;


$(document).ready(function () {

    // Initial function when page loads.
    function init() {
        // Retrieve local storage on timeStamp if it exist. 
        var storage = JSON.parse(localStorage.getItem("timeStamps"));

        // if there is an existing timeStamp,then load previous messages
        if (storage) {
            timeStamps = storage;
             //update messages from previous save
            messages = timeStamps.messages;
        }
        // load messages onto timeblock
        renderMessages();
    }

    // Load messages onto timeblock
    function renderMessages() {
    
        for (let i = 0; i < messages.length; i++) {
            // This "id" maps the corresponding message with its appropriate textarea. 
            // The text area has an of id = i+9.
            var id = i + 9;

            // if message is not empty, then load message onto timeblock.
            if (messages[i] !== null) {
                $('#' + id).val(messages[i]);

            }
        }
    }

    // Store the message when user clicks save.
    function storeMessage() {
        localStorage.setItem("timeStamps", JSON.stringify(timeStamps))
    }


    // This for loop will create every timeblock, including the hour, textarea and button. 
    for (let i = 0; i < militaryTime.length; i++) {

        // Create Time Block element as the parent
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
        saveBtn.attr("value", militaryTime[i]) // sets the value of the save button with its corresponding military time. 
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

    // Set up date and time display on the top center
    $('#currentDay').text(moment().format("dddd, MMMM Do YYYY"))

    // Set the text of the current time. 
    var updateTime = function () {
        $("#currentTime").text(moment().format('h:mm:ss'))
    }

    // Update the time when the page loads to prevent it from initially being hidden.
    updateTime();

    // Update the time every second.
    setInterval(updateTime, 1000);

    // Add event listener on every save button. 
    $('.saveBtn').on("click", function (event) {
        // Prevents the page from refreshing when button is pressed. 
        event.preventDefault()

        //get value of button = id of textarea
        var id = parseInt($(this).val()); 

        //textarea with id
        var text = $('#' + id).val() 

        // sets the message for corresponding timeblock.
        timeStamps.messages[id - 9] = text;

        // store timeStamp as "timeStamp"
        storeMessage();
        renderMessages();
    })

    init();

})