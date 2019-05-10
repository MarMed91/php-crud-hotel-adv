
function updateNameSurname() {

  var me = $(this);
  var nameSurnameHTML = me.parent();
  var id = nameSurnameHTML.parent().attr("id");
  var titleHTML = nameSurnameHTML.find("h1.title");
  var newName = prompt("Give me new name");
  var newLastname = prompt("Give me new surname");

  $.ajax({

    url: "updatePagantiById.php",
    data: {
      id:id,
      name: newName,
      price: newLastname
    },
    method: "POST",
    success: function(data) {
      printNameAndSurnamePaganti();
  }
  });
}

function deletePagante() {

    var me = $(this);
    var priceHTML = me.parent();
    var id = priceHTML.attr("id");

    $.ajax({

      url: "deleteByPagamenti.php",
      data: { id: id },
      method: "POST",
      success: function(data) {
        printNameAndSurnamePaganti();
      }
    });
}

function addressClick() {

  var me = $(this);
  var id = me.attr("data-id");

  $.ajax({

    url: "getAddress.php",
    data: { id: id },
    method: "POST",
    success: function(data) {

      var address = JSON.parse(data);

      var addressLi = me.find(".address");
      addressLi.text(address[0])["address"];
    }
  });
}

function printNameAndSurnamePaganti() {

  var priceCont = $(".paganti");
  priceCont.find("pagante").remove();

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
  $(document).on("click", ".pagante .delete", deletePagante);
  $(document).on("click", ".pagante .edit", updateNameSurname);
}

$(document).ready(init);
