$(document).ready(function() {
    
      $(document).on("click", "button.delete", function() {
        var commentID = $(this).attr('id');
          console.log('comment id: ', commentID)
        $.ajax({
          method: "DELETE",
          url: "/api/comment/" + commentID
        }).done(function(){
          window.location.reload()
        })
      });
    
      $(document).on("click", "button.submit", function(){
        var data = {
          name: $("#name").val().trim(),
          body: $("#body").val().trim(),
          articleID: $(this).attr('id')
        }
        console.log('post: ', data)
        $.ajax({
          method: "POST",
          url: "/api/comment",
          data: data
        }).done(function(){
          console.log('Reload.')
          window.location.reload()
        })
      })
    });