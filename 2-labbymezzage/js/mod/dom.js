define(["mod/dom"],function(){
	return{
		getElements: function(){
			var doc = document, div, section, p,
			frag = doc.createDocumentFragment();

			div = doc.createElement('div');
			section = doc.createElement('section');
			p = doc.createElement('p');

			div.className = 'row';
			section.className = 'message large-12 columns';
			p.className = 'text columns';

			div.appendChild(section);
			section.appendChild(p);






			return{
				p: p,
				input: input,
				submit: submit
			};
		},
		createElements: function(){
			// implement
			
			return{
				var1: "temp",
				var2: "temp"
			};
		}
	};
});