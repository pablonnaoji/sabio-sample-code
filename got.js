<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.0.min.js"></script>
    <script>

        $(document).ready(function () {

            var i = 0;  // index for table row
            var currentRow = null; // variable used to grab specific row in table

            $("#submit").click(function () {

                var name = $("#name").val(); // the name variable is set to the value of the input with id="name"
                var age = $("#age").val(); // the age variable is set to the value of the input with id="age"
                var address = $("#address").val(); 

                var valid = true; //boolean for form validation
                var message = ''; // error message initialiaed to an empty string. 
                
                i++;


                var new_row = "<tr id='row" + i + "' class=''><td class='name'>" + name + "</td><td class='age'>" + age + "</td><td class='address'>" + address + "</td><td class='dlt'><input  style='color:red' type='button' value='X' id='delete' /></td></tr>"; // html with dynamic variables to be appended

                $('form input').each(function () { //find a form and input html element. For each input element do the following... 
                    var $this = $(this); // create a this variable and set equal to jquery this

                    if (!$this.val()) { 
                        var inputName = $this.attr('name'); //find the "name" attribute in the input. Its value will be flagged in the alert.
                        valid = false; // set valid to false
                        message += 'Please enter your ' + inputName + '\n'; //create alert message by binding string and variables
                        
                    }
                });

                if (!valid) { // if the form is valid boolean is not true (is a false) do the following.. 
                    alert(message); //alert out message
                    event.preventDefault(); //stop further execution of the submit function so that a new row is not appended.
                }

                

             else if (currentRow) { //if there is an existing row

                    $("table tbody").find($(currentRow)).replaceWith(new_row); //find the row and update it with the new values
                    currentRow = null; // reset current row to null
                    $('#submit').val("Create Address"); // change the button back to say "Create Address"
                    $("#name").val(''); //set inputs back to empty
                    $("#age").val(''); // set input back to empty
                    $("#address").val('');

                    var product = { Name: "product" };

                    $.ajax({
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
                    });

                }
                else {  //if there is no exisitng row ..
                    $("table tbody").append(new_row); //add a new row
                    $('#submit').val("Create Address"); // the value of the submit button always goes back to Create Address on submit.
                    $("#name").val(''); //set inputs back to empty
                    $("#age").val('');//set inputs back to empty
                    $("#address").val('');

                    $.ajax({
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
                    });

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
               $(this).closest('tr').find('td.age').text();
                $(this).closest('tr').find('td.address').text();
            });
        });

        $(document).on('click', '#delete', (function () {  // find the button that has an id of delete
            console.log("Hi");
            $(this).parents('tr').remove();  //remove the row
            $("#name").val(''); // set the value form inputs to empty
            $("#age").val('');
            $("#address").val('');
            $('#submit').val("Create Address"); //set the button value back to say Create Address
           
        }) )
        });


    </script>
</head>
<body>

    <h2>Address Book</h2>

    <p>Add a list of names, ages, and addresses.</p>
 
    <form id="form" class="form-horizontal">
        <label> Name <input type="text" id="name" name="name" class="name" /></label>
        <label> Age <input type="text" id="age" name="age" class="age" /></label>
        <label> Address <input type="text" id="address" name="address" class="address" /></label>
        <input type="button" value="Create Address" id="submit" />
    </form>

    <form class="pull-right">
        <h4>Created Addresses</h4>
        <table id="table" border="1">
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Delete</th>
            </tr>
            <tr>
                <td>Paul</td>
                <td>25</td>
                <td>Calabasas</td> 
                <td><input  style="color:red" type="button" value="X" id="delete" /></td>
            </tr>
            <tr>
                <td>Jane</td>
                <td>31</td>
                <td>Wichita</td>
                <td><input style="color:red" type="button" value="X" id="delete" /></td>
            </tr>
            <tr>
                <td>Lisa</td>
                <td>23</td>
                <td>North Dakota</td> 
                <td><input style="color:red" type="button" value="X" id="delete" /></td>
            </tr>
            <tr>
                <td>Vince</td>
                <td>50</td>
                <td>London</td>
                <td><input style="color:red" type="button" value="X" id="delete" /></td>
            </tr>
        </table> 
    </form>
</body>
</html>