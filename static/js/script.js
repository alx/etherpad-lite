function sanitizeUnicode(s)
{
  return s.replace(/[\uffff\ufffe\ufeff\ufdd0-\ufdef\ud800-\udfff]/g, '?');
}

function textify(str)
{
  return sanitizeUnicode(
  str.replace(/[\n\r ]/g, ' ').replace(/\xa0/g, ' ').replace(/\t/g, '        '));
}


function go2Tree() {
    var treeName = textify($("#treename").val());
    treeName.length > 0 ? window.location = "tree/" + treeName : $("#alert-treename").show(200);
}


$(document).ready(function() {
    $("#alert-treename").alert();

    if($("#treeList").length > 0){
      $.getJSON("/trees", function(data){
        var items = [];

        $.each(data, function() {
          items.push('<h3 id="tree-' + this.id + '"><a href="tree/' + this.name + '">' + this.name + '</a></h3>');
        });

        $("#treeList").append(items.join(''));
      });
    }
});
