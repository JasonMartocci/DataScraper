$.getJSON('/articles', function(data) {
  for (var i = 0; i<data.length; i++){
    $('#articles').append('<p data-id="' + data[i]._id + '">'+ data[i].title + '<br /><a href="' + data[i].link + '" target="_blank">'+ data[i].link + '</a></p>');
  }
});

$(document).on('click', 'p', function(){
  $('#noteTaker').empty();
  $('#notes').empty();

  var thisId = $(this).attr('data-id');

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    .done(function( data ) {
      console.log(data);

      $('#noteTaker').append('<h2>' + data.title + '</h2>');
      $('#noteTaker').append('<input id="titleinput" name="title" placeholder="Note Title">');
      $('#noteTaker').append('<textarea id="bodyinput" name="body" placeholder="Note"></textarea>');
      $('#noteTaker').append('&nbsp;');
      $('#noteTaker').append('<button class="btn btn-success  btn-lg btn-block" data-id="' + data._id + '" id="savenote">Save Note</button>');

      $('#notes').append('<h1>' + data.title + '</h1>');
      $('#notes').append('<div class="notesTitle">' + data.note.title + '</div>');
      $('#notes').append('<div class="note">' + data.note.body + '</div>');
      $('#notes').append('&nbsp;');
      $('#notes').append('<button class="btn btn-danger  btn-lg btn-block" data-id="' + data._id + '" id="deletenote">Delete Note</button>');

      if(data.note){
        $('#titleinput').val(data.note.title);
        $('#bodyinput').val(data.note.body);
      }
    });
});

$(document).on('click', '#savenote', function(){
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#titleinput').val(),
      body: $('#bodyinput').val()
    }
  })
  .done(function( data ) {
    console.log(data);
    $('#notes').empty();
  });

  $('#titleinput').val("");
  $('#bodyinput').val("");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    .done(function( data ) {
      console.log(data);

      $('#notes').append('<h1>' + data.title + '</h1>');
      $('#notes').append('<h2>' + data.note.title + '</h2>');
      $('#notes').append('<h2>' + data.note.body + '</h2>');

      if(data.note){
        $('#titleinput').val(data.note.title);
        $('#bodyinput').val(data.note.body);
      }
    });
});

$(document).on('click', '#deletenote', function(){
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: "",
      body: ""
    }
  })
  .done(function( data ) {
    console.log(data);
    $('#notes').empty();
  });

  $('#titleinput').val("");
  $('#bodyinput').val("");
});
