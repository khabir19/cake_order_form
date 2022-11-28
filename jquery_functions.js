$(document).ready(function () {

  $("#orderSubmit").click(function () {
    var isValid = $("input[name=cake]").is(":checked");

    $("#spnError")[0].style.display = isValid ? "none" : "block";
  });

  $('#client_firstName').on('input', function () {
    var input = $(this);
    var is_name = input.val();
    if (is_name) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });

  $('#client_lastName').on('input', function () {
    var input = $(this);
    var is_name = input.val();
    if (is_name) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });

  $('#client_phone').on('input', function () {
    var input = $(this);
    var re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3}$/;
    var is_phone = re.test(input.val());
    if (is_phone) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });

  $('#client_email').on('input', function () {
    var input = $(this);
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var is_email = re.test(input.val());
    if (is_email) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });

  $("#datepicker").datepicker({ minDate: -0 });

  $("#order button").click(function (e) {
    var form_data = $("#order").serializeArray();
    var error_free = true;
    for (var input in form_data) {
      var element = $("#client_" + form_data[input]['name']);
      var valid = element.hasClass("valid");
      var error_element = $("span", element.parent());
      if (!valid) {
        error_element.removeClass("error").addClass("error_show"); error_free = false;
      } else {
        error_element.removeClass("error_show").addClass("error");
      }
    }
    if (!error_free) {
      e.preventDefault();
    } else {
      alert('No errors: Form will be submitted');
    }
  });

  $("#orderSubmit").click(function () {
    var formValues = $("form").serializeArray();
    var handleSubmit = {
      cake: formValues[0].value,
      firstName: formValues[1].value,
      lastName: formValues[2].value,
      deliveryDate: formValues[3].value,
      deliveryTime: formValues[4].value,
      phone: formValues[5].value,
      email: formValues[6].value,
      streetAdress: formValues[7].value,
      addressComplement: formValues[8].value,
      city: formValues[9].value,
      region: formValues[10].value,
      zipCode: formValues[11].value,
      country: formValues[12].value
    }

    if (handleSubmit.cake &&
      handleSubmit.firstName &&
      handleSubmit.lastName &&
      handleSubmit.phone &&
      handleSubmit.email) {

      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          handleSubmit
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json), alert('Order placed successfully!'));
    } else {
      alert('Some data is missing')
    }
  });
});