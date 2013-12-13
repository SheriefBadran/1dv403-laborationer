define(["mod/memory", "observer/publisher", "random/randomGenerator"],
	function(memory, observer, randomGenerator){
	
	// global variables;

	return{
		getPictureArray: function(rows, cols){

			var numberOfImages = rows*cols;
			var maxImageNumber = numberOfImages/2;
		
		   	var imgPlace = [];
		
		   //Utplacering av bilder i Array
		   for(var i=0; i<numberOfImages; i++)
			  imgPlace[i] = 0;
		
			for(var currentImageNumber=1; currentImageNumber<=maxImageNumber; currentImageNumber++)
			{		
				var imageOneOK = false;
				var imageTwoOK = false;
				
				do
				{
					if(imageOneOK == false)
					{
						var randomOne = Math.floor( (Math.random() * (rows*cols-0) + 0) );				
						
						if( imgPlace[randomOne] == 0 )
						{
							imgPlace[randomOne] = currentImageNumber;
							imageOneOK = true;
						}
					}
					
					if(imageTwoOK == false)
					{
						var randomTwo = Math.floor( (Math.random() * (rows*cols-0) + 0) );				
									
						if( imgPlace[randomTwo] == 0 )
						{
							imgPlace[randomTwo] = currentImageNumber;
							imageTwoOK = true;
						}
					}			
				}
				while(imageOneOK == false || imageTwoOK == false);		
			}
			
			return imgPlace;
		}
	};
});