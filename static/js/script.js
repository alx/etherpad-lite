function go2Tree() {
    var treeName = $("#treename").val();
      treeName.length > 0 ? window.location = "trees/" + treeName : $("#alert-treename").show(200);
}


$(document).ready(function() {
    $("#alert-treename").alert();

    if($("#treeList").length > 0){
      $.getJSON("/trees", function(data){
        var items = [];

        $.each(data, function() {
          items.push('<li id="tree-' + this.id + '"><a href="tree/' + this.name + '">' + this.name + '</a></li>');
        });

        $('<ul/>', {
          'class': 'list',
          html: items.join('')
        }).appendTo('#treeList');
      });
    }
});
