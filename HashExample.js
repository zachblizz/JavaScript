/*
*	Author: Zach Blizzard (c) 2013
*	Purpose: create a hash table 100 times and get the average amount
*			 of insertions before a collision was detected.
*	FileName: Program.js
*/

var myArray = new Array(); 			// instantiates the array
var randNum;			   			// variable to generate a random number
const EMPTY = 0;	   	   			// indecates if a spot (in the array) is empty or not
var totalIns = 0;					// keeps track of the total insertion

var maxArraySize = prompt("What size is the table: ");  // the max size of the array

// validates the users input for the max array size.
while(maxArraySize == ' ' || maxArraySize == null || isNaN(maxArraySize))
	maxArraySize = prompt("What size is the table: ");

for(var increment = 0; increment < 100; increment++)
{
	var insCount = 0;					// keeps count of the insertions
	var collide = new Boolean(false);	// checks if there has been a collision
	
	// puts 0 into all elements inside the array
	for(var i = 0; i < maxArraySize; i++){
		myArray[i] = 0;
	}

	// linear probing funciton
	function linearProbe(pos){
		var entireTable = 20;
		var totalPos = 0;
		while(myArray[pos] != EMPTY && totalPos != entireTable){
			if(pos < 10)
				pos++;
			else if(pos >= 10 && totalPos != entireTable)
				pos = 0;
			totalPos++;
		}
		if(totalPos != entireTable)
			return pos;
		else
			return -1;
	}

	// hash function
	function hashFunc(y){
		return y % maxArraySize; 
	}

	// puts the numbers in the table...
	function putInTable(){
		collide = false;
		for(var i =  0; i < 100; i++){
			randNum = Math.floor(1 + Math.random() * maxArraySize);	// generates the random numbers
			var probe = hashFunc(randNum);
			if(myArray[probe] == EMPTY){
				myArray[probe] = randNum;
				if(!collide)
					insCount++;
			}
			else if((probe = linearProbe(probe)) != -1){
				myArray[probe] = randNum;
				collide = true;
			}
		}
	}
	putInTable();
	totalIns += insCount;
}
alert("The average insertions before a collision was: " + (totalIns / 100.0) );

