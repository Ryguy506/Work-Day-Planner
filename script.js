
$(function () {

var currentDay = $("#currentDay");
function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY hh:mm:ss a');
  currentDay.text(rightNow);
}


//  click fuction that saves the clicked saveBtns parent id and textarea value to local storage.
var saveBtn = $(".saveBtn")
saveBtn.on("click" , function()
{
 var timeBlock = $(this).parent()
 var timeBlockId = timeBlock.attr("id")
 var textArea = timeBlock.find("textarea")
 var textAreaValue = textArea.val()
 localStorage.setItem(timeBlockId , textAreaValue)
 if ( textAreaValue === "" )
  {
  localStorage.removeItem(timeBlockId)
 }
})



// gets any user input that was saved in localStorage and displays in corresponding textarea
var timeBlock = $(".time-block");
timeBlock.each(function ()
{
  var timeBlockId = $(this).attr("id");
  var textArea = $(this).find("textarea");
  var textAreaValue = localStorage.getItem(timeBlockId);
  textArea.val(textAreaValue);
});

//changes the times blocks id from string to number and compares it to current time to add or remove classes that change color.
var currentHour = dayjs().hour();
timeBlock.each(function ()
{

  var timeBlockId = $(this).attr("id");
  var timeBlockHour = parseInt(timeBlockId);
  
  if (timeBlockHour < currentHour)
  { 
    $(this).addClass("past");
  }
  else if (timeBlockHour === currentHour)
  {
    $(this).removeClass("past");
    $(this).addClass("present");
  }
  else
  {
    $(this).removeClass("past");
    $(this).removeClass("present");
    $(this).addClass("future");
  }

});
// clears local storage and reloads page on click
var clearBtn = $("#clearBtn");
clearBtn.on("click", function ()
{
  localStorage.clear();
  location.reload();

})

// updates time every second
displayTime()
setInterval(displayTime, 1000);


});
