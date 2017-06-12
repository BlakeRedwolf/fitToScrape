$("#scrape").on("click", function(event) {
  event.preventDefault();

  $.ajax({
    url: "/scrape",
    method: "GET",
    success: function(res) {
      console.log(res);
    },
    error: function(err) {
      console.log(err);
    }
  });
  
});