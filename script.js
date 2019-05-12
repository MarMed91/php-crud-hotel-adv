
function updateNameSurname() {

  var me = $(this);
  var nameSurnameHTML = me.parent();
  var id = nameSurnameHTML.data("id");
  var newName = prompt("Give me new name");
  var newLastname = prompt("Give me new surname");
  console.log(id);

  $.ajax({

    url: "updatePagantiById.php",
    data: {
      id:id,
      name: newName,
      price: newLastname
    },
    method: "POST",
    success: function() {
      printNameAndSurnamePaganti();
  }
  });
}

function deletePagante() {

    var me = $(this);
    var priceHTML = me.parent().parent();
    var id = priceHTML.data("id");

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
  console.log(id);
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

  //var priceCont = $(".paganti");
  //priceCont.find("pagante").remove();

  var me = $(this);
  var  meP = me.parent(".pagante");
  meP.remove();

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
