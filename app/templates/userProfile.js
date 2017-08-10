const source = "<div>" +
							 	"<h1>Logged in as {{display_name}}</h1>" + 
							 	"<ul>" + 
							 		"<li>Name: {{display_name}}</li>" +
									"<li>Profile image: <a href='{{images.0.url}}'>{{images.0.url}}</a></li>" + 
							 	"</ul>" +
							 "</div>";

const template = Handlebars.compile(source);
export template;