var Menu = function($,$dashboard) {
    var $contextMenu;
    var itemMenu;
    var item = [
        {
            title: "New note",
            callback: "createNote"
        },
        {
            title: "Reset",
            callback: "reset"
        }
    ];

    this.init = function() {
        if($("#contextMenu").html() === undefined) {
            this.create();
        }
        $("body").on("contextmenu", function(e){
            $("#contextMenu").css({
                display:"block",
                left: e.pageX,
                top: e.pageY
            });
            return false;
        });

        $("body").on("click", function() {
            $("#contextMenu").hide();
        });
    }
    this.create = function() {
        $("body").append("<div id='contextMenu' class='dropdown clearfix'></div>");
        $("#contextMenu").append("<ul id='itemMenu' class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu' style='display:block;position:static;margin-bottom:5px;'></ul>");
        $.each(item, function(key,elem) {
            $("#itemMenu")
            .append("<li><a class='"+elem.callback+"'>"+elem.title+"</a></li>");

            $("#itemMenu ."+elem.callback)
            .on("click", function() {
                 $dashboard[elem.callback]();
            });
        });
    }
};