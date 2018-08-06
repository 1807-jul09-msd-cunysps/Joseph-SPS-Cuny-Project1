
$(document).ready(function () {
    setTimeout(function () { $('#firstname').focus(); }, 300);
    $("input").prop('required', true);
    $(function () {
        $("input").prop('required', true);
    });

    $('input').on('blur', function () {
        var is_name = this.value;
        if (is_name !== "") {
            $(this).removeClass("is-invalid").addClass("is-valid");
            $(this).next('span').remove();
        } 
        else {
            $(this).removeClass("is-valid").addClass("is-invalid");
            $(this).next('span').remove();
            $(this).after("<span class='errors invalid-feedback 'style='color:red;'> This field is required! </span> ");  
        }
        
    }); 

    $('select').on('ready', function () {
        $(this).prop('required', true);
    });

    $('select').on('blur', function () {
        var selection = this.value;
        if (selection !== "") {
            $(this).removeClass("is-invalid").addClass("is-valid");
            $(this).next('span').remove();
        }
        else {
            $(this).prop('required', true);
            $(this).removeClass("is-valid").addClass("is-invalid");
            $(this).next('span').remove();
        }

    });

    $('#firstname, #lastname').on('blur', function () {
        var name = $('#firstname')[0].value;
        if (name !== ""  && name !== undefined) {
               if ($('#firstname')[0].value === $('#lastname')[0].value) {
                $('#firstname').removeClass("is-valid").addClass("is-invalid");
                $('#firstname').next('span').remove();
                   $('#firstname').after("<span class='errors invalid-feedback 'style='color:red;'> First and Last Name must not be the same! </span> ");
                $('#lastname').removeClass("is-valid").addClass("is-invalid");
                $('#lastname').next('span').remove();
                   $('#lastname').after("<span class='errors invalid-feedback 'style='color:red;'> First and Last Name must not be the same!  </span> ");
            } 
        }
        
    });

    $('#Age').on('blur', function () {
        var age = this.value;
        if (age !== "") {
            if (age < 15 || age > 100) {
                $(this).removeClass("is-valid").addClass("is-invalid");
                $(this).next('span').remove();
                $(this).after("<span class='errors invalid-feedback 'style='color:red;'> Age must be  between  15 and 100! </span> ");

            }
        }

    });

    $('#Zipcode').blur(function () {
        var zip = this.value;
        if (zip.length < 5 && zip !== "") {
            $(this).removeClass("is-valid").addClass("is-invalid");
            $(this).next('span').remove();
            $(this).after("<span class='errors invalid-feedback 'style='color:red;'>Not A Valid ZipCode!</span> ");

        }

    });

    $('#Areacode, #PhoneNumber').on('blur', function () {
        var a = $('#AreaCode').val();
        var p = $('#PhoneNumber').val();
        if ( a !==""  &&  p !=="") {
            var phone = a + "-" + p;
            if (!phone.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/))
            {  
                alert(phone + 'is not a valid PhoneNumber!');
                $('#AreaCode').val("");
                $('#PhoneNumber').val("");
                $('#TPhoneNumber').focus;
            }
        }

    });

    $('#Ext').blur(function () {
        var ext = this.value;
        if (ext === "") {
            $(this).removeClass("is-invalid").addClass("is-valid");
            $(this).next('span').remove();
            this.value = 0;
        }

    });

    $('#Zipcode, #Country').on('blur', function () {
        var z = $('#Zipcode').val();
        var c = $('#Country').val();
        if (z!== "" && c !== "") {
            var web = 'http://api.zippopotam.us/' + c + '/' + z.toString();
            $.get(web, function (data, status) {
                $('#State')[0].value = data.places[0].state;
                $('#City')[0].value = data.places[0]['place name'];
            });
        }

    });
    
    $('#Submit').click(function () {
        var check = $('#checkaddress').val();
        var gender = $('input[name=gender]:checked').val();

        //if perm addrss = no ......
        if (check == 1 || check == "") {
            var json = JSON.stringify({
                "Pid": 0,
                "FirstName": $('#firstname')[0].value,
                "LastName": $('#lastname')[0].value,
                "Gender": gender,
                "address": {
                    "Aid": 0,
                    "houseNum": $('#Address1')[0].value,
                    "street": "-",
                    "city": $('#City')[0].value,
                    "State": $('#State')[0].value,
                    "Country": $('#Country')[0].value,
                    "zipcode": $('#Zipcode')[0].value
                },
                "address2": {
                    "Aid": 0,
                    "houseNum": null,
                    "street": null,
                    "city": null,
                    "State": null,
                    "Country": null,
                    "zipcode": null
                },
                "phone": {
                    "PID": 0,
                    "countryCode": "1",
                    "areaCode": $('#AreaCode')[0].value,
                    "number": $('#PhoneNumber')[0].value,
                    "ext": $('#Ext')[0].value
                }
                // Age: $('#Age')[0].value,
            });
        }//if yes
        else {
            var json = JSON.stringify({
                "Pid": 0,
                "FirstName": $('#firstname')[0].value,
                "LastName": $('#lastname')[0].value,
                "Gender":gender,
                "address": {
                    "Aid": 0,
                    "houseNum": $('#Address1')[0].value,
                    "street": "-",
                    "city": $('#City')[0].value,
                    "State": $('#State')[0].value,
                    "Country": $('#Country')[0].value,
                    "zipcode": $('#Zipcode')[0].value
                },
                "address2": {
                    "Aid": 0,
                    "houseNum": $('#Address1P')[0].value,
                    "street": null,
                    "city": $('#CityP')[0].value,
                    "State": $('#StateP')[0].value,
                    "Country": $('#CountryP')[0].value,
                    "zipcode": $('#ZipcodeP')[0].value
                },
                "phone": {
                    "PID": 0,
                    "countryCode": "1",
                    "areaCode": $('#AreaCode')[0].value,
                    "number": $('#PhoneNumber')[0].value,
                    "ext": $('#Ext')[0].value
                }
                // Age: $('#Age')[0].value,
            });
        }// else no

        console.log(json);
        $.ajax({
            type: 'POST',
            url: 'http://joerusso1.azurewebsites.net/Personapi/api/person',
            data: json,
            dataType: "json",
            contentType: "application/json",
            success: function (data) { alert(data); },
            failure: function (errMsg) {
                alert(errMsg);
            }
           
        });//ajax

    });//click


});//document

var request = new XMLHttpRequest();
request.open('GET','http://joerusso1.azurewebsites.net/Personapi/api/person' , true);
request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        data.forEach(Person => {
            //console.log(Person.FirstName +" "+ Person.LastName +" "+ Person.address.houseNum);
        });
    } else {
        console.log('error');
    }
};
request.send();

var once = 0;
function checkadd() {
    var check = document.querySelector("#checkaddress").value;
    
    if (check === 0) {
            var address2 = document.querySelector("#PAddress");// get reference of the element to be selected
            address2.style.display = "block";
        if (once === 0) {
            once++;
            var x = document.querySelector("#AddCont");
            var copy = x.cloneNode(true);
            copy.querySelector("#AddressHeader").innerText = "Permanent Address";
            
            copy.querySelector("#AddressHeader").id += "P";
            copy.querySelector("#Address1").id += "P";
            copy.querySelector("#Address2").id += "P";
            copy.querySelector("#State").id += "P";
            copy.querySelector("#City").id += "P";
            copy.querySelector("#Zipcode").id += "P";
            copy.querySelector("#Country").id += "P";
            
            address2.appendChild(copy);
            
        } 
    }// if check 0

    if (check === 1 || check === "") {
         address2 = document.querySelector("#PAddress");
            address2.style.display = "none";
    }
}





