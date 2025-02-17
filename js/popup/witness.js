let witness_ranks = null;

async function prepareWitnessDiv(activeAccount) {
  var witness_votes = activeAccount.info.approves;
  witness_ranks = await getWitnessRanks();
  $("#votes_remaining span").html(5 - witness_votes.length);
  if (false) {
  } else $("#proxy").hide();
  if (!activeAccount.hasKey("active")) $("#proxy div").addClass("no_active");
  else $("#proxy div").removeClass("no_active");

  $("#list_wit").empty();

  if (witness_votes) {
    for (wit of witness_votes) {
      const isActive =
        witness_ranks && witness_ranks.find(e => e.name == wit)
          ? "active"
          : "disabled";
      $("#list_wit").append(
        "<div class='witness-row'><span class='witName'>@" +
          wit +
          "</span><span class='isActive'>" +
          isActive +
          "</span><img class='" +
          (!activeAccount.hasKey("active") ? "no_cursor" : "") +
          "' src='../images/delete.png'></span></div>"
      );
    }
  }

  $("#top100_div").empty();

  if (witness_ranks) {
    let i = 0;
    for (wit of witness_ranks) {
      const isVoted = witness_votes.includes(wit.name)
        ? "wit-vote wit-voted"
        : "wit-vote wit-not-voted";
      i++;
      if (i <= 100)
        $("#top100_div").append(
          "<div class='witness-row'><span class='wit-rank'>" +
            i +
            "</span><span class='witName'>@" +
            wit.name +
            "</span><span class='" +
            isVoted +
            "'></span></div>"
        );
    }
  }

  if (!activeAccount.hasKey("active")) $(".wit-vote").addClass("no_cursor");
  else $(".wit-vote").removeClass("no_cursor");


  $(".wit-vote")
    .unbind("click")
    .click(function() {
      const voted_wit = $(this).hasClass("wit-voted");
      const that = this;
      console.info(voted_wit);
      $(that).addClass("wit-loading");
      hive.broadcast.accountWitnessVote(
        activeAccount.getKey("active"),
        activeAccount.getName(),
        $(this)
          .prev()
          .html()
          .replace("@", ""),
        $(this).hasClass("wit-voted") ? 0 : 1,
        function(err, result) {
          console.error(err, result);
          $(that).removeClass("wit-loading");
          if (err == null) {
            if (voted_wit) {
              console.info("unvoted");
              $(that).removeClass("wit-voted");
              $(that).addClass("wit-not-voted");
              $("#votes_remaining span").html(
                parseInt($("#votes_remaining span").html()) + 1
              );
            } else {
              console.info("voted");
              $(that).removeClass("wit-not-voted");
              $(that).addClass("wit-voted");
              $("#votes_remaining span").html(
                parseInt($("#votes_remaining span").html()) - 1
              );
            }
          }
        }
      );
    });

  $(".witness-row img")
    .unbind("click")
    .click(function() {
      const acc = $(this)
        .parent()
        .find(".witName")
        .html()
        .replace("@", "");
      const that = this;
      $(that).attr("src", "../images/loading.gif");
      hive.broadcast.accountWitnessVote(
        activeAccount.getKey("active"),
        activeAccount.getName(),
        acc,
        0,
        function(err, result) {
          $(that).attr("src", "../images/delete.png");
          if (err == null) {
            showConfirm(
              chrome.i18n.getMessage("popup_success_unvote_wit", [acc])
            );
            loadAccount(activeAccount.getName());
          } else showError(chrome.i18n.getMessage("unknown_error"));
        }
      );
    });

  $("#vote_wit")
    .unbind("click")
    .click(function() {
      $("#vote_wit").hide();
      $("#wit_loading").show();
      if ($("#witness_div select option:selected").val() === "Wit") {
        hive.broadcast.accountWitnessVote(
          activeAccount.getKey("active"),
          activeAccount.getName(),
          $("#wit-username").val(),
          1,
          function(err, result) {
            $("#vote_wit").show();
            $("#wit_loading").hide();
            if (!err) {
              showConfirm(
                chrome.i18n.getMessage("popup_success_wit", [
                  $("#wit-username").val()
                ])
              );
              loadAccount(activeAccount.getName());
            } else showError(chrome.i18n.getMessage("unknown_error"));
          }
        );
      } else {
        hive.broadcast.accountWitnessProxy(
          activeAccount.getKey("active"),
          activeAccount.getName(),
          $("#wit-username").val(),
          function(err, result) {
            $("#wit_loading").hide();
            $("#vote_wit").show();
            if (!err) {
              showConfirm(
                chrome.i18n.getMessage("popup_success_proxy", [
                  $("#wit-username").val()
                ])
              );
              loadAccount(activeAccount.getName());
            } else {
              console.error(err);
              showError(chrome.i18n.getMessage("unknown_error"));
            }
          }
        );
      }
    });
}
