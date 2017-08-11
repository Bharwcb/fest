require('hbs');

const source = "<h2>Artists following</h2>" +
								"<ul>" +
									"{{#each this}}" +
										"<li>{{this}}</li>" +
									"{{/each}}" +
								"</ul>";

const template = Handlebars.compile(source);
module.exports = template;
		