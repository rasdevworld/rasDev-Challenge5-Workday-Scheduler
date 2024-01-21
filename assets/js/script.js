// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

$(function () {
  var currentDay = dayjs()
  var currentHour = dayjs().hour()
  var currentDayEl = $("#currentDay")
  currentDayEl.text(currentDay.format('dddd, MMMM DD'))


  for(i=9; i < 18; i++) {
    parentId = $("#hour-"+i)
    textArea = parentId.children("textarea")
    var loadEvent = localStorage.getItem("hour-"+i)
    textArea.val(loadEvent)
    if(i === currentHour) {
      textArea.addClass("present")
    }else if(i < currentHour) {
      textArea.addClass("past")
    }else {
      textArea.addClass("future")
    }
  }

  var saveBtnEl = $(".saveBtn")

  function saveEvent(event) {
      var currentClickEl = $(event.target)
      var parentId 
      var textAreaEl

      if(currentClickEl.attr("class") === "fas fa-save") {

        textAreaEl = currentClickEl.parent().siblings("textarea")
        parentId = currentClickEl.parent().parent().attr("id")

      }else {
        textAreaEl = currentClickEl.siblings("textarea")
        parentId = currentClickEl.parent().attr("id")
      }

      localStorage.setItem(parentId, textAreaEl.val())
    }

    saveBtnEl.on("click", saveEvent)
});
