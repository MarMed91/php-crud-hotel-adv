
function updateNameSurname() {

  var me = $(this);
  var nameSurnameHTML = me.parent();
  var id = nameSurnameHTML.data("id");
  var titleH1 = nameSurnameHTML.find("h1.title");

  var newName = prompt("Give me new name");
  var newLastName = prompt("Give me new surname");

  $.ajax({

    url: "updatePagantiById.php",
    data: {
      
      id: id,
      name: newName,
      lastname: newLastName
    },
    method: "POST",
    success: function(data) {

      printNameAndSurnamePaganti();
    }
  });
}

function deletePagante() {

    var me = $(this);
    var id = me.parent().data("id");

    $.ajax({

      url: "deleteByPaganti.php",
      data: { id: id },
      method: "POST",
      success: function() {
        printNameAndSurnamePaganti();
      }
    });
}

function addressClick() {

  var me = $(this);
  var id = me.data("id");

  $.ajax({

    url: "getAddress.php",
    data: { id: id },
    method: "POST",
    success: function(data) {

      var address = JSON.parse(data);

      var addressLi = me.find(".address");
      addressLi.text(address[0]["address"]);
      }
  });
}

function printNameAndSurnamePaganti() {

  var container = $(".paganti");
  container.find(".pagante").remove();

  $.ajax({
    url:"getPagantiNameAndSurname.php",
    method: "GET",
    success: function(data) {

      var paganti = JSON.parse(data);

      var template = $("#person-template").html();
      var compiled = Handlebars.compile(template);

      var container = $(".paganti");
      for (var i = 0; i < paganti.length; i++) {
        var pagante = paganti[i];

        var finalHTML = compiled(pagante);
        container.append(finalHTML);
      }
    }
 });
}

function init() {
  printNameAndSurnamePaganti();

  $(document).on("click", ".pagante", addressClick)
  $(document).on("click", ".delete", deletePagante);
  $(document).on("click", ".edit", updateNameSurname);
}

$(document).ready(init);
