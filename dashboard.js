var Dashboard = function($) {
 
    var status = ["TO DO", "WIP", "DONE"];
    var header = $("header > ol");
    var board  = $("#board");
    var zIndexNote = 1;
    var lastNumNote = 0;
    var _self = this;

    this.init = function() {
            this.createHeader();
            this.createBody();
            this.loadNote();

            var menu = new Menu(jQuery, _self);
		    menu.init();
    };
    this.createHeader = function() {
            $.each(status, function(key, elem) {
                header.append("<li>"+elem+"</li>");
            });
    }
    this.createBody = function() {
            $.each(status, function(key, elem) {
                elem = elem.replace(" ","").toLowerCase();
                board.append("<section class='"+elem+"'></section>");
            });
    }
    this.newNote = function(note,id) {
		$(note.getTemplate())
        .appendTo("."+note.getNota().status.replace(" ","").toLowerCase())
        .attr('id', id+'')
        .show("fade", 300)
        .draggable()
        .on('dragstop', function(e) { _self.checkChangeStatus(e); });

        $("#"+id+" .title").val(note.getNota().title);
        $("#"+id+" .cnt").val(note.getNota().content);

        /* Rendo persistenti tutte le modifiche alle note */
        $("#"+id+" .title").on("keyup", function(e) {
            var nota = _self.getNote()[id];
            var nuovaNota = new Note($("#"+id+" .title").val(), nota.content, nota.status);
            _self.replaceNota(nuovaNota, id);
        });
        $("#"+id+" .cnt").on("keyup", function(e) {
            var nota = _self.getNote()[id];
            var nuovaNota = new Note(nota.title, $("#"+id+" .cnt").val(), nota.status);
            _self.replaceNota(nuovaNota, id);
        });

        $("#"+id).on("contextmenu", function(e){
            _self.eliminaNota(id);
            return false;
        });
        
    }
    this.createNote = function() {
        var newArray = this.getNote();
        var nota = new Note("Nuova nota", "Content note", "TO DO");
        this.newNote(nota, this.lastNumNote++);
		newArray.push(nota.getNota());
		localStorage.setItem('note',JSON.stringify(newArray));
    }
    this.persist = function(ArrayNote) {
        localStorage.setItem('note',JSON.stringify(ArrayNote));
    }
    this.checkChangeStatus = function(mousePosition) {
        
        $(this).zIndex(++zIndexNote);
        var id = $(mousePosition.currentTarget).attr('id');
        var nota = _self.getNote()[id];
        var newSingleNote = new Note(
                nota.title,
                nota.content,
                nota.status);
         
        var dim = $(window).width()/3;
        var status = "TO DO";

        /* In WIP */
        if(mousePosition.pageX > dim && mousePosition.pageX < dim*2) {
        	status = "WIP";
        }
        /* In DONE */
        if(mousePosition.pageX > dim*2) {
        	status = "DONE";
        }
        if(nota.status !== status) {
            var newSingleNote = new Note(
                nota.title,
                nota.content,
                status);
            $(mousePosition.currentTarget).remove();
            _self.newNote(newSingleNote, id);
            _self.replaceNota(newSingleNote, id);
        }

    }
    this.replaceNota = function(newSingleNote,id) {
        var note = _self.getNote();
        note[id] = newSingleNote.getNota();
        _self.persist(note);
    }
    this.eliminaNota = function(id) {
        var note = _self.getNote();
        var noteNuove = new Array();
        for(var k=0;k<note.length;k++) {
        	if(id != k)
        	    noteNuove.push(note[k]);
        }
        _self.persist(noteNuove);
        $("#"+id).remove();
    }
    this.loadNote = function() {
        var note = this.getNote();
        this.lastNumNote = note.length;
		for(var i = 0;i<note.length;i++) {
            var nota = note[i];
            var newSingleNote = new Note(
                nota.title,
                nota.content,
                nota.status);
			this.newNote(newSingleNote,i);
		}
    }
    this.reset = function() {
		localStorage.setItem('note', JSON.stringify(new Array()));
        window.location.reload();
    }
    this.getNote = function() {
		if(typeof(Storage) === undefined) return [];
			
		if(localStorage.getItem("note") === undefined || localStorage.getItem("note") === null) {
			localStorage.setItem('note', JSON.stringify(new Array()));
		}
			
		var result = JSON.parse(localStorage.getItem("note"));
		if(!Array.isArray(result)) {
			result = localStorage.setItem('note', JSON.stringify(new Array()));
		}
		return result;
    }

};