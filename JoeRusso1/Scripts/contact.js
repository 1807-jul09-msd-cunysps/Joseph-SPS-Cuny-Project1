$(document).ready(function () {
    

  
    $('input').on('blur', function () {
        var is_name = this.value;
        if (is_name !== "") {
            $(this).removeClass("is-invalid").addClass("is-valid");
            $(this).next('span').css('display', 'none');
        }
        else {
            $(this).removeClass("is-valid").addClass("is-invalid");
            $(this).next('span').css('display', 'inline');
        }
    });

    


   
    $('#Submit').click(function () {
        
        var json = JSON.stringify({
            "FirstName": $('#Firstname')[0].value,
            "LastName": $('#Lastname')[0].value,
            "email": $('#email')[0].value,
            "Message": $('#msg')[0].value
        });

        console.log(json);
        $.ajax({
            type: 'POST',
            url: 'http://joerusso1.azurewebsites.net/Personapi/api/contact',
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