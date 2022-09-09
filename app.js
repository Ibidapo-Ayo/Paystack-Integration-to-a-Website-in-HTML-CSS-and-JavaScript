const amounts = document.querySelector("#amount");
const number = document.querySelector("#phone");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
function payWithPaystack() {
  var handler = PaystackPop.setup({
    key: "pk_test_12a8875d58c10847ca4e7bf615c420b01e53b0ec", //put your public key here
    email: email.value, //put your customer's email here
    amount: amounts.value + "00", //amount the customer is supposed to pay
    metadata: {
      custom_fields: [
        {
          display_name: name.value,
          variable_name: "mobile_number",
          value: number.value //customer's mobile number
        }
      ]
    },
    callback: function(response) {
      //after the transaction have been completed
      //make post call  to the server with to verify payment
      //using transaction reference as post data
      $.post("verify.php", { reference: response.reference }, function(status) {
        if (status == "success")
          //successful transaction
          alert("Transaction was successful");
        //transaction failed
        else alert(response);
      });
    },
    onClose: function() {
      //when the user close the payment modal
      alert("Transaction cancelled");
    }
  });
  handler.openIframe(); //open the paystack's payment modal
}
