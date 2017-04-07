var Note = function($title,$content,$status) {
    var status = $status;
    var title = $title;
    var content = $content;

    this.getNota = function() {
        return {
            status: $status,
            title: $title,
            content: $content
        }
    }
};
Note.prototype.getTemplate = function() {
    return  '<div class="note">'
				//+	'<a href="javascript:;" class="button remove">X</a>'
				+ 	'<div class="note_cnt">'
				+		'<textarea class="title" placeholder="New title"></textarea>'
				+ 		'<textarea class="cnt" placeholder="New content"></textarea>'
				+	'</div> '
				+'</div>';
}