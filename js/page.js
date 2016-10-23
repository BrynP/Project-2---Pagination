


//Set numbers of students per page
var students_per_page = 10;
//Hide all of the students at the start
var students = $(".student-list").children("li");
students.hide();
//Then show the first page
students.slice(0, students_per_page).show();
//Set the fade speed
fade_speed = 500;




//Then, whenever the pagination plugin is used, show the students for each page
$('.pagination').jqPagination({max_page	: Math.ceil(students.length / students_per_page),
    paged: function(page) {
        //This is to make sure the "no results" string is cleared.
        search_string_reset();
        // do something with the page variable
        previous_page = page - 1;
        students.hide();
        students.slice(students_per_page * previous_page, students_per_page+ students_per_page* previous_page).fadeIn(fade_speed).show();




    }
});

//The search function
function search() {
  //This is to make sure the "no results" string is cleared.
  search_string_reset();
  //Hide all student entries
  students.hide();
  //Grab the input data from the user
  var input_data = $(".student-search input").val()
  var search_item = input_data.toUpperCase();
  //Expression found perusing Stack Overflow that provides a case insensitive version
  //of JQuery's "contains"
  $.expr[':'].containsIgnoreCase = function (n, i, m) {
            return jQuery(n).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
        };
  //Find and show any students that meet the search criteria.
  var students_found = $(".student-list").children("li:containsIgnoreCase('"+ search_item + "')");
  students_found.fadeIn(fade_speed).show();

  //If there aren't any results, let the user know:

  if (students_found.length < 1) {
    $(".student-list").append("<li id='not_found'>No search entries found for: " + input_data + "</li>");
  }

}

//This is to make sure the "no results" string is cleared.
function search_string_reset() {
  $("#not_found").remove();
}
