define(["mod/dom"],function(){
	return{
		getElementFrag: function(text, date){

			var doc = document, section, div, p, t, d,
			frag = doc.createDocumentFragment();

			section = doc.createElement('section');
			div = doc.createElement('div');
			p = doc.createElement('p');
			t = doc.createTextNode(text);

			section.className = 'row';
			div.className = 'message small-6 small-centered columns';
			p.className = 'text columns';

			section.appendChild(div);
			div.appendChild(p);
			p.appendChild(t);
			frag.appendChild(section);

			return frag;
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