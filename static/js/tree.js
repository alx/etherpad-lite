function fillGiftList() {

  var treeName = window.location.href.split("/").pop();

  $.getJSON("/tree/" + treeName + "/gifts", function(data) {
    var items = [];

    $.each(data, function() {
      items.push('<p id="gift-' + this.id + '">Pour <b>' + this.dest_name + '</b>, de la part de <b>' + this.from_name + '</b></p>');
    });

    $("#giftList").html(items.join(''));
  });
}

function randomPadName() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var string_length = 10;
  var randomstring = '';
  
  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
}

$(document).ready(function() {
  $(".modal").modal({backdrop: true});
  fillGiftList();

  $("#addGift").click(function(){
    
    $("#from_name").val($.cookie("from_name"));
    $("#from_email").val($.cookie("from_email"));
    $("#pad").val(randomPadName());

    $("#giftForm").modal('show');
    $("#dest_name").focus()
    return false;
  });

  $("#giftFormSubmit").click(function(){

    var isValid = true;

    if($("#dest_name").val().length == 0){
      $("#dest_name_input").addClass("error");
      $("#dest_name_input label").addClass("error");
      $("#dest_name_input .help-inline").removeClass("hide");
      isValid = false;
    } else {
      $("#dest_name_input").removeClass("error");
      $("#dest_name_input label").removeClass("error");
      $("#dest_name_input .help-inline").addClass("hide");
    }
    
    if($("#from_name").val().length == 0){
      $("#from_name_input").addClass("error");
      $("#from_name_input label").addClass("error");
      $("#from_name_input .help-inline").removeClass("hide");
      isValid = false;
    } else {
      $("#from_name_input").removeClass("error");
      $("#from_name_input label").removeClass("error");
      $("#from_name_input .help-inline").addClass("hide");
    }
    
    if(isValid){
      var treeName = window.location.href.split("/").pop();

      $.cookie('form_name', $("#from_name").val());
      $.cookie('form_email', $("#from_email").val());

      $.post("/tree/" + treeName + "/gifts", $("#giftForm form").serialize(), function(resp){
        $("#giftForm").modal('hide');
        $('#giftEditor .modal-body').pad({'padId':$("#pad").val()});
        $("#giftEditor").modal('show');
      });
    }
  });

  $("#giftEditorSubmit").click(function(){
    var currentGift = "<a href='" + $("#giftEditor iframe").attr("href") + "'>link to gift</a>";
    $("#giftEditor").modal('hide');
    fillGiftList();
  });
});
