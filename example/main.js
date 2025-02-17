// Send Handshake event
$("#sw-handshake").click(function () {
  avalon_keychain.requestHandshake(function () {
    console.log("Handshake received!");
  });
});

// All transactions are sent via a swRequest event.

// Send decryption request
$("#send_decode").click(function () {
  avalon_keychain.requestVerifyKey(
    $("#decode_user").val(),
    $("#decode_message").val(),
    $("#decode_method option:selected").text(),
    function (response) {
      console.log("main js response - verify key");
      console.log(response);
    }
  );
});

$("#send_encode").click(() => {
  avalon_keychain.requestEncodeMessage(
    $("#encode_user").val(),
    $("#encode_receiver").val(),
    $("#encode_message").val(),
    $("#encode_method option:selected").text(),
    function (response) {
      console.log("main js response - verify key");
      console.log(response);
    }
  );
});

// Send post request
$("#send_post").click(function () {
  avalon_keychain.requestPost(
    $("#post_username").val(),
    $("#post_title").val(),
    $("#post_body").val(),
    $("#post_pp").val(),
    $("#post_pu").val(),
    $("#post_json").val(),
    $("#post_perm").val(),
    $("#comment_options").val(),
    function (response) {
      console.log("main js response - post");
      console.log(response);
    }
  );
});

// Send vote request
$("#send_vote").click(function () {
  avalon_keychain.requestVote(
    $("#vote_username").val(),
    $("#vote_perm").val(),
    $("#vote_author").val(),
    $("#vote_weight").val(),
    function (response) {
      console.log("main js response - vote");
      console.log(response);
    }
  );
});

// Send Custom JSON request
$("#send_custom").click(function () {
  console.log("click");
  avalon_keychain.requestCustomJson(
    $("#custom_username").val(),
    $("#custom_id").val(),
    $("#custom_method option:selected").text(),
    $("#custom_json").val(),
    $("#custom_message").val(),
    function (response) {
      console.log("main js response - custom JSON");
      console.log(response);
    },
    $("#custom_rpc").val()
  );
});

// Send transfer request
$("#send_tra").click(function () {
  console.log("transfer");
  avalon_keychain.requestTransfer(
    $("#transfer_username").val(),
    $("#transfer_to").val(),
    $("#transfer_val").val(),
    $("#transfer_memo").val(),
    $("#transfer_currency option:selected").text(),
    function (response) {
      console.log("main js response - transfer");
      console.log(response);
    },
    $("#transfer_enforce").is(":checked")
  );
});

// Send tokens request
$("#sendTokens").click(function () {
  avalon_keychain.requestSendToken(
    $("#tokens_username").val(),
    $("#tokens_to").val(),
    $("#tokens_qt").val(),
    $("#tokens_memo").val(),
    $("#tokens_unit").val(),
    function (response) {
      console.log("main js response - tokens");
      console.log(response);
    },
    null,
    JSON.parse($("#tokens_meta").val())
  );
});

// Send delegation
$("#send_delegation").click(function () {
  avalon_keychain.requestDelegation(
    $("#delegation_username").val(),
    $("#delegation_delegatee").val(),
    $("#delegation_sp").val(),
    $("#delegation_unit option:selected").text(),
    function (response) {
      console.log("main js response - delegation");
      console.log(response);
    }
  );
});

$("#send_signature").click(function () {
  avalon_keychain.requestSignBuffer(
    $("#sign_username").val(),
    $("#sign_message").val(),
    $("#sign_method option:selected").text(),
    function (response) {
      console.log("main js response - sign");
      console.log(response);
    },
    null,
    $("#sign_message_title").val().length
      ? $("#sign_message_title").val()
      : null
  );
});

$("#send_sign_tx").click(function () {
  avalon_keychain.requestSignTx(
    $("#tx_username").val(),
    JSON.parse($("#tx").val()),
    $("#tx_type option:selected").text(),
    function (response) {
      console.log("main js response - tx");
      console.log(response);
    }
  );
});

$("#send_addauth").click(function () {
  avalon_keychain.requestAddAccountAuthority(
    $("#addauth_username").val(),
    $("#addauth_authorized_username").val(),
    $("#addauth_role option:selected").text(),
    $("#addauth_weight").val(),
    function (response) {
      console.log("main js response - add auth");
      console.log(response);
    }
  );
});

$("#send_removeauth").click(function () {
  avalon_keychain.requestRemoveAccountAuthority(
    $("#removeauth_username").val(),
    $("#removeauth_authorized_username").val(),
    $("#removeauth_role option:selected").text(),
    function (response) {
      console.log("main js response - remove auth");
      console.log(response);
    }
  );
});

$("#send_addkey").click(function () {
  console.log("add key");
  avalon_keychain.requestAddKeyAuthority(
    $("#addkey_username").val(),
    $("#addkey_authorized_key").val(),
    $("#addkey_role option:selected").text(),
    $("#addkey_weight").val(),
    function (response) {
      console.log("main js response - add auth key");
      console.log(response);
    }
  );
});

$("#send_removekey").click(function () {
  avalon_keychain.requestRemoveKeyAuthority(
    $("#removekey_username").val(),
    $("#removekey_authorized_key").val(),
    $("#removekey_role option:selected").text(),
    function (response) {
      console.log("main js response - remove auth key");
      console.log(response);
    }
  );
});

$("#send_broadcast").click(function () {
  avalon_keychain.requestBroadcast(
    $("#broadcast_username").val(),
    $("#broadcast_operations").val(),
    $("#broadcast_method option:selected").text(),
    function (response) {
      console.log("main js response - broadcast");
      console.log(response);
    }
  );
});

$("#send_signed_call").click(function () {
  avalon_keychain.requestSignedCall(
    $("#signed_call_username").val(),
    $("#signed_call_method").val(),
    JSON.parse($("#signed_call_params").val()),
    $("#signed_call_key_type option:selected").text(),
    function (response) {
      console.log("main js response - signed call");
      console.log(response);
    }
  );
});

$("#send_witness_vote").click(function () {
  avalon_keychain.requestWitnessVote(
    $("#witness_username").val(),
    $("#witness").val(),
    $("#vote_wit").is(":checked"),
    function (response) {
      console.log("main js response - witness vote");
      console.log(response);
    }
  );
});

$("#send_save").click(function () {
  avalon_keychain.requestAddAccount(
    $("#save_username").val(),
    JSON.parse($("#save_keys").val()),
    function (response) {
      console.log("main js response - account saved");
      console.log(response);
    }
  );
});

$("#send_con").click(function () {
  avalon_keychain.requestConversion(
    $("#con_username").val(),
    $("#con_amount").val(),
    $("#con_collaterized").is(":checked"),
    function (response) {
      console.log("main js response - conversion");
      console.log(response);
    }
  );
});

