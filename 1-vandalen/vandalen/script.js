"use strict";

var makePerson = function(persArr){
	// Din kod här...
	var persons = [];
	var personAges;
	var personNames;
	var personObj = {};
	var ageSum;
	var age;


	// Filter out all person arrays that don't have the born property.
	persons = persArr.filter(function(person, i){
		return !person.hasOwnProperty('born') && typeof person.name === "string" && typeof person.age === "number";
	});

	// Retrieve age values from all objects in the array.
	personAges = persons.map(function(person, i){
		return person.age;
	});

	// Retrieve name values from all objects in the array.
	personNames = persons.map(function(person, i){
		return person.name;
	});

	// Sum all ages.
	ageSum = personAges.reduce(function(prevAge, age){
		return prevAge + age;
	});

	// Calculate average age and initialize it to personObj.
	personObj.averageAge = Math.round(ageSum/personAges.length);

	// Get max age and initialize it to personObj.
	personObj.maxAge = personAges.reduce(function(prevAge, age, i, personAges){
		return Math.max(prevAge, age);
	});

	// Get min age and initialize it to personObj.
	personObj.minAge = personAges.reduce(function(prevAge, age, i, personAges){
		return Math.min(prevAge, age);
	});

	// Sort personNames alphabetically with additional respect to swedish letters "å, ä and ö"
	personNames.sort(function(a, b){
		return a.localeCompare(b);
	});

	// Assamble all names to one string and initialize it to personObj
	personObj.names = personNames.reduce(function(prevName, name, i, personNames){
		return prevName + ", " + name;
	});

	return personObj;
};