function go2Tree() {
    var treeName = $("#treename").val();
      treeName.length > 0 ? window.location = "trees/" + treeName : $("#alert-treename").show(200);
}


$(document).ready(function() {
    $("#alert-treename").alert();
});
