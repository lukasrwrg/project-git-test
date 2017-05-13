$(document).ready(function() {
    $(".cont").css("color", "red").hide(2000).show(2000);
    $("#jq2").hide("fast");
    $("#jq1").click(function(event) {
        event.preventDefault();
        $("#jq2").show("fast");
    });
    
    /* Open page animations www.jquery.com */
    
    $("p, h1, h2, h3, h4").hide().fadeIn(2000);
    
});


/* AJAX */

/*
https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json
*/

/*
http://jsonplaceholder.typicode.com/users
*/

$(document).ready(function(){

	$(".button").click(function(){

		$(".content").text("Ładowanie treści...");

		$.ajax({
			type:"GET",
			url: "http://jsonplaceholder.typicode.com/users",
			success: function(data) {
				$(".content").html("");
				for ( var i = 0; i < data.length; i++ ) {
					$(".content").append("<p>" + data[i].name + "</p>");
				}
			},
			dataType: "jsonp"
		});

	});

});