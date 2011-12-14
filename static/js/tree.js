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

  $("#addGift").click(function(){
    
    $("#from_name").val($.cookie("from_name"));
    $("#from_email").val($.cookie("from_email"));
    $("#pad").val(randomPadName());

    $("#giftForm").modal('show');
    $("#dest_name").focus()
    return false;
  });

  $("#giftFormSubmit").click(function(){
    var treeName = window.location.href.split("/").pop();

    $.cookie('form_name', $("#from_name").val());
    $.cookie('form_email', $("#from_email").val());

    $.post("/tree/" + treeName + "/gifts", $("#giftForm form").serialize(), function(resp){
      $("#giftForm").modal('hide');
      $('#giftEditor .modal-body').pad({'padId':$("#pad").val()});
      $("#giftEditor").modal('show');
    });
  });

  $("#giftEditorSubmit").click(function(){
    var currentGift = "<a href='" + $("#giftEditor iframe").attr("href") + "'>link to gift</a>";
    $("#giftEditor").modal('hide');
    $("#giftList").append(currentGift);
  });
});
