<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.0.min.js"></script>
    <script>

        $(document).ready(function () {

            var i = 0;  // index for table row

            var currentRow = null; // variable used to grab specific row in table

           

            function getTimeRemaining(endtime) {
                var t = Date.parse(endtime) - Date.parse(new Date());
                var seconds = Math.floor((t / 1000) % 60);
                var minutes = Math.floor((t / 1000 / 60) % 60);
               // var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
               // var days = Math.floor(t / (1000 * 60 * 60 * 24));
                return {
                    'total': t,
                  //  'days': days,
                  //  'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
                };
            }

            function initializeClock(id, endtime) {
                var clock = document.getElementById(id);
               // var daysSpan = clock.querySelector('.days');
               // var hoursSpan = clock.querySelector('.hours');
                var minutesSpan = clock.querySelector('.minutes');
                var secondsSpan = clock.querySelector('.seconds');

                function updateClock() {
                    var t = getTimeRemaining(endtime);

                 //   daysSpan.innerHTML = t.days;
                 //   hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

                    if (t.total <= 0) {

                        function myFunction() {
                            var houses = (document.getElementById("table").rows.length - 1 );
                            console.log(houses);
                            alert("There are " + houses + " Houses listed");
                            clearInterval(timeinterval);
                        }

                        myFunction();
                       
                    }
                }

                updateClock();
                var timeinterval = setInterval(updateClock, 1000);
            }

            var deadline = new Date(Date.parse(new Date()) + 3 * 60 * 1000);
            initializeClock('clockdiv', deadline);


            $("#submit").click(function () {

                var name = $("#name").val(); // the name variable is set to the value of the input with id="name"
                var words = $("#words").val(); // the age variable is set to the value of the input with id="age"
                var sigil = $("#sigil").val(); 

                var valid = true; //boolean for form validation
                var message = ''; // error message initialiaed to an empty string. 
                
                i++;


                var new_row = "<tr id='row" + i + "' class=''><td class='name'>" + name + "</td><td class='age'>" + words + "</td><td class='address'>" + sigil + "</td><td class='dlt'><input  style='color:red' type='button' value='X' id='delete' /></td></tr>"; // html with dynamic variables to be appended

                $('form input').each(function () { //find a form and input html element. For each input element do the following... 
                    var $this = $(this); // create a this variable and set equal to jquery this

                    if (!$this.val()) { 
                        var inputName = $this.attr('name'); //find the "name" attribute in the input. Its value will be flagged in the alert.
                        valid = false; // set valid to false
                        message += 'Please enter the House ' + inputName + '\n'; //create alert message by binding string and variables
                        
                    }
                });

                if (!valid) { // if the form is valid boolean is not true (is a false) do the following.. 
                    alert(message); //alert out message
                    event.preventDefault(); //stop further execution of the submit function so that a new row is not appended.
                }

                

             else if (currentRow) { //if there is an existing row

                    $("table tbody").find($(currentRow)).replaceWith(new_row); //find the row and update it with the new values
                    currentRow = null; // reset current row to null
                    $('#submit').val("Add"); // change the button back to say "Create Address"
                    $("#name").val(''); //set inputs back to empty
                    $("#words").val(''); // set input back to empty
                    $("#sigil").val('');

                    var product = { Name: "product" };

                  /*  $.ajax({
                        url: "/api/cars/",
                        type: "get",
                        data: "{product:" + JSON.stringify(product) + "}",
                        cache: false,
                        success: function() {
                            alert("hello");
                        },
                        error: function() {
                            alert("sorry");
                        
                        }
                    });*/

                }
                else {  //if there is no exisitng row ..
                    $("table tbody").append(new_row); //add a new row
                    $('#submit').val("Add"); // the value of the submit button always goes back to Create Address on submit.
                    $("#name").val(''); //set inputs back to empty
                    $("#words").val('');//set inputs back to empty
                    $("#sigil").val('');

                 /*   $.ajax({
                        url: "/api/cars/",
                        type: "get",
                        data: "{product:" + JSON.stringify(product) + "}",
                        cache: false,
                        success: function () {
                            alert("hello");
                        },
                        error: function () {
                            alert("sorry");

                        }
                    }); */

                }        
        });

        $("#table", this).on("click", "td", function () { //find an html object with an id of "table" on click of the td tag do the following..
           
            var tds = $(this).parents("tr").find("td"); //set the tds variable equal to the td tag
            console.log("clicked");
            $.each(tds, function (i, v) {  //for each td tag
                $($("#form input")[i]).val($(v).text()); //set the form input fields equal to the content of the td tags
                $('#submit').val("Update"); //change the submit buttons value to "Update"

                currentRow = $(this).parents('tr');    //currentRow variable is set to the tr tag
                $(this).closest('tr').find('td.name').text();  //get the text value of the td tag. here we are grabbing the value by its class attribute
               $(this).closest('tr').find('td.words').text();
                $(this).closest('tr').find('td.sigil').text();
            });
        });

        $(document).on('click', '#delete', (function () {  // find the button that has an id of delete
            console.log("Hi");
            $(this).parents('tr').remove();  //remove the row
            $("#name").val(''); // set the value form inputs to empty
            $("#words").val('');
            $("#sigil").val('');
            $('#submit').val("Add"); //set the button value back to say Create Address
           
        }) )
        });


    </script>
</head>
<body>

    <h2>Throne Trivia</h2>

    <p>How many Houses from Game of Thrones can you name in 3 minutes?</p>
 
    <form id="form" class="form-horizontal">
        <label> Name <input type="text" id="name" name="name" class="name" /></label>
        <label> Words <input type="text" id="words" name="words" class="words" /></label>
        <label> Sigil <input type="text" id="sigil" name="sigil" class="sigil" /></label>
        <input type="button" value="Add" id="submit" />
    </form>

    <form class="pull-right">
        <h4>The Great Houses of Westeros and Essos</h4>
        <table id="table" border="1">
            <tr>
                <th>Name</th>
                <th>Words</th>
                <th>Sigil</th>
                <th>Delete</th>
            </tr>
            <tr>
                <td>Targaryan</td>
                <td> Fire and Blood</td>
                <td> 3 Red Dragons</td> 
                <td><input  style="color:red" type="button" value="X" id="delete" /></td>
            </tr>
            <tr>
                <td>Stark</td>
                <td> Winter is Coming</td>
                <td> Wolf</td>
                <td><input style="color:red" type="button" value="X" id="delete" /></td>
            </tr>
            <tr>
                <td>Barantheon</td>
                <td> Ours is the fury</td>
                <td> Stag</td> 
                <td><input style="color:red" type="button" value="X" id="delete" /></td>
            </tr>
            <tr>
                <td>Martell</td>
                <td> Unbowed, Unbent, Unbroken</td>
                <td> Spear and Sun</td>
                <td><input style="color:red" type="button" value="X" id="delete" /></td>
            </tr>
        </table> 
    </form>
    <h1>Countdown Clock</h1>
    <div id="clockdiv">
        <div>
            <span class="minutes"></span>
            <div class="smalltext">Minutes</div>
        </div>
        <div>
            <span class="seconds"></span>
            <div class="smalltext">Seconds</div>
        </div>
    </div>
</body>
</html>