// 'use strict';
/* Started tuesday 12/09/2017 from https://sites.google.com/site/prologsite/prolog-problems/1

Exercice 1

A list is either empty or it is composed of a first element (head) and a tail, which is a list itself. In Prolog we represent the empty list by the atom [] and a non-empty list by a term [H|T] where H denotes the head and T denotes the tail.

1.01 (*) Find the last element of a list.
	Example:
	?- my_last(X,[a,b,c,d]).
	X = d
*/

var list1 = ['a', 'b', 'c', 'd'];
var list1Error = [];

const getLast = (list) => {
	var listLength = list.length;
	if(list.length < 1) {
		throw new Error('list dont have enought elements');
	}
	return list[listLength-1];
}

console.log('#1.01-last element of list: ' + JSON.stringify(list1) + ' = ', getLast(list1)); // return last element
// console.log('#1.02-error-not-enought-element-in-list: ', getLast(list1Error)); // return error 'list dont have enought elements'

/*
1.02 (*) Find the last but one element of a list.
(de: zweitletztes Element, fr: avant-dernier élément)
*/
var list2 = ['a', 'b', 'c', 'd'];
var list2Error = ['a'];

const getBeforeLast = (list) => {
	if (list.length < 2) {
		throw new Error('list dont have enought elements');
	}
	return list[list.length-2];
}


console.log('#1.02-last-but-one-element: ' + JSON.stringify(list2) + ' = ', getBeforeLast(list2)); // return last but one element
// console.log('#1.02-error-not-enought-element-in-list: ', getBeforeLast(list2Error)); // return error 'list dont have enought elements'

/*
1.03 (*) Find the K'th element of a list.
The first element in the list is number 1.
Example:
?- element_at(X,[a,b,c,d,e],3).
X = c
*/

var list3 = ['a', 'b', 'c', 'd', 'e'];

const getAtIndex = (list, pos) => {
	if (list.length < pos) {
		throw new Error('list dont have enought elements');
	}
	return list[pos-1];
}
console.log('#1.03-element-at-index-3 of: ' + JSON.stringify(list3) + ' = ', getAtIndex(list3, 3)); // return 'c' element
console.log('#1.03-element-at-index-5 of: ' + JSON.stringify(list3) + ' = ', getAtIndex(list3, 5)); // return 'e' element
// console.log('#1.03-error-not-enought-element-in-list:, getAtIndex(list3, 6)); // return error 'list dont have enought elements'


/*
1.04 (*) Find the number of elements of a list.
*/

var list4 = ['a', 'b', 'c', 'd', 'e', 'f'];
var list4Error = [];

const getLength = (list) => {
	if (list.length === 0) {
		throw new Error('list dont have enought elements');
	}
	return list.length;
}

console.log('#1.04-list-length: ' + JSON.stringify(list4) + ' = ', getLength(list4)); // return '6'
// console.log('#1.04-error-not-enought-element-in-list:', getLength(list4Error)); // return error 'list dont have enought elements'

/*
1.05 (*) Reverse a list.
*/

var list5 = ['a', 'b', 'c', 'd', 'e', 'f'];
var list5Error = ['a'];

const getRversedList = (list) => {
	if (list.length < 2) {
		throw new Error('list dont have enought elements');
	}
	return list.reverse();
}

console.log('#1.05-list-reversed: ' + JSON.stringify(list5) + ' = ', getRversedList(list5)); // return ['f', 'e', 'd', 'c', 'b', 'a']
// console.log('#1.05-error-not-enought-element-in-list:', getLength(list5Error)); // return error 'list dont have enought elements'


/*
1.06 (*) Find out whether a list is a palindrome.
A palindrome can be read forward or backward; e.g. [x,a,m,a,x].

*/

var listPalindromeOdd = ['k', 'a', 'y', 'a', 'k'];
var listPalindromeEven = ['x', 'a', 'm', 'm', 'a', 'x'];
var listNotPalindrome = ['f', 'd', 'm', '5', 'a', 'x'];

const isPalindrome = (list) => {
	let cursor;
	let cpt = 0;
	while((cursor = list.shift()) && (list.length > 2) && (++cpt)) {
		if (list[list.length - cpt] !== cursor) {
			return false;
		}
	}
	return true;
}

console.log('#1.06-palindrome-odd-list: ' + JSON.stringify(listPalindromeOdd) + ' = ', isPalindrome(listPalindromeOdd)); // return true
console.log('#1.06-palindrome-even-list: ' + JSON.stringify(listPalindromeEven) + ' = ', isPalindrome(listPalindromeEven)); // return true
console.log('#1.06-not-palindrome-list: '  + JSON.stringify(listNotPalindrome) + ' = ', isPalindrome(listNotPalindrome)); // return false

/*
1.07 (**) Flatten a nested list structure.
Transform a list, possibly holding lists as elements into a 'flat' list by replacing each list with its elements (recursively).

Example:
?- my_flatten([a, [b, [c, d], e]], X).
X = [a, b, c, d, e]

Hint: Use the predefined predicates is_list/1 and append/3
*/

var flattenNestedList = ['a', ['b', ['c', 'd'], 'e']];


function transformList(nestedList) {
	var list = [];
	var listsTransformer = function(nestedList) {
		for (var i = 0; i < nestedList.length; i++) {
			if(typeof nestedList[i] === 'string'){
				list.push(nestedList[i])
			} else {
				listsTransformer(nestedList[i])
			}
		}	
	}
	listsTransformer(nestedList)
	return list;

}

const getFlattenList = (list) => {
	const newList = []	
	const setFlattenList = (list) => {
		list.forEach((item) => {
			typeof item === 'string' ? newList.push(item) : newList.concat(setFlattenList(item))
		});
	}
	setFlattenList(list);
	return newList;
}

console.log('#1.07-flatten-nested-list-transformed: ', transformList(flattenNestedList)); // return [ 'a', 'b', 'c', 'd', 'e' ]

/*
1.08 (**) Eliminate consecutive duplicates of list elements.
If a list contains repeated elements they should be replaced with a single copy of the element. The order of the elements should not be changed.

Example:
?- compress([a,a,a,a,b,c,c,a,a,d,e,e,e,e],X).
X = [a,b,c,a,d,e]
*/

var duplicateList = ['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e'];

function eliminateDuplicate(listDuplicated) {
	var newList = [];
	for (var i = 0; i < listDuplicated.length; i++) {
		while(listDuplicated[i] == listDuplicated[i + 1]) {
			i++;
		}
		newList.push(listDuplicated[i])
	}
	return newList;
}

console.log('#1.08-duplicate-list-eliminated: ', eliminateDuplicate(duplicateList)); // return ['a', 'b', 'c', 'a', 'd', 'e']


/*
1.09 (**) Pack consecutive duplicates of list elements into sublists.
If a list contains repeated elements they should be placed in separate sublists.

Example:
?- pack([a,a,a,a,b,c,c,a,a,d,e,e,e,e],X).
X = [[a,a,a,a],[b],[c,c],[a,a],[d],[e,e,e,e]]

*/
var toSubList = ['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e'];

function subList(listDuplicated) {
	var newList = [];
	for (var i = 0; i < listDuplicated.length; i++) {
		var  currentList = []
		currentList.push(listDuplicated[i]);
		while(listDuplicated[i] == listDuplicated[i + 1]) {
			currentList.push(listDuplicated[i]);
			i++;
		}
		newList.push(currentList);
	}
	return newList;
}

var resultSubList = subList(toSubList);

console.log('#1.09-duplicate-list-to-sub-list: \n', resultSubList); // return [ [ 'a', 'a', 'a', 'a' ], [ 'b' ], [ 'c', 'c' ], [ 'a', 'a' ], [ 'd' ], [ 'e', 'e', 'e', 'e' ] ]

/*
1.10 (*) Run-length encoding of a list.
Use the result of problem 1.09 to implement the so-called run-length encoding data compression method. Consecutive duplicates of elements are encoded as terms [N,E] where N is the number of duplicates of the element E.

Example:
?- encode([a,a,a,a,b,c,c,a,a,d,e,e,e,e],X).
X = [[4,a],[1,b],[2,c],[2,a],[1,d],[4,e]]

*/

var listFromLastExerciceResult = resultSubList;

function runLengthEncoding(subList) {
	function encodeArrayElement(arrayList) {
		var numberElement = arrayList.length;
		var element = arrayList[0];
		var codedArray = [numberElement, element];
		return codedArray;
	}
	return subList.map(encodeArrayElement);
}

var resultEncoding = runLengthEncoding(listFromLastExerciceResult);

console.log('#1.10-result-encoding: ', resultEncoding); // return [[4, 'a'], [1, 'b'], [2, 'c'], [2, 'a'], [1, 'd'], [4, 'e']]

/*
1.11 (*) Modified run-length encoding.
Modify the result of problem 1.10 in such a way that if an element has no duplicates it is simply copied into the result list. Only elements with duplicates are transferred as [N,E] terms.

Example:
?- encode_modified([a,a,a,a,b,c,c,a,a,d,e,e,e,e],X).
X = [[4,a],b,[2,c],[2,a],d,[4,e]]

*/

var previousResultEncoding = resultEncoding;

function encodeArrayElement(arrayList) {
	if(arrayList[0] == 1) {
		return arrayList[1];
	}
	return arrayList;
}

var resultEncodingLight = previousResultEncoding.map(encodeArrayElement);

console.log('#1.11-result-encoding-light: ', resultEncodingLight); // return [[4, 'a'], 'b', [2, 'c'], [2, 'a'], 'd', [4, 'e']]

/*
1.12 (**) Decode a run-length encoded list.
Given a run-length code list generated as specified in problem 1.11. Construct its uncompressed version.

*/

var toUncompress = resultEncodingLight;

function uncompressList(compressedList) {
	if(typeof compressedList[0] == 'number') {
		var numberOfCopy = compressedList[0];
		var elementToCopy = compressedList[1]
		var elements = [];
		for(i = 0; i < numberOfCopy; i++) {
			elements.push(elementToCopy);
		}
		return elements;
	} else {
		return [compressedList[0]];
	}

}


var resultUncompressed = toUncompress.map(uncompressList);

console.log('#1.12-result-uncompressed: ', resultUncompressed); // return [ [ 'a', 'a', 'a', 'a' ], [ 'b' ], [ 'c', 'c' ], [ 'a', 'a' ], [ 'd' ], [ 'e', 'e', 'e', 'e' ] ]


/*
1.13 (**) Run-length encoding of a list (direct solution).
Implement the so-called run-length encoding data compression method directly. 
I.e. don't explicitly create the sublists containing the duplicates, as in problem 1.09, 
but only count them. As in problem 1.11, simplify the result list by replacing the singleton terms [1,X] by X.

Example:
?- encode_direct([a,a,a,a,b,c,c,a,a,d,e,e,e,e],X).
X = [[4,a],b,[2,c],[2,a],d,[4,e]]


*/

var listToCompress = ['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e'];


function subListEncoding(listDuplicated) {
	var newList = [];
	for (var i = 0; i < listDuplicated.length; i++) {
		var  currentList = []
		currentList.push(listDuplicated[i]);
		while(listDuplicated[i] == listDuplicated[i + 1]) {
			currentList.push(listDuplicated[i]);
			i++;
		}
		newList.push(currentList);
	}
	return newList;
}


function runFullEncoding(subList) {
	function encodeArrayElement(arrayList) {
		var numberElement = arrayList.length;
		var element = arrayList[0];
		var codedArray = [numberElement, element];
		if(codedArray[0] == 1) {
			return codedArray[1];
		}
		return codedArray;
	}
	return subList.map(encodeArrayElement);
}

var resultSubListEncoding = subListEncoding(listToCompress);
var resultEncodingFull = runFullEncoding(resultSubListEncoding);

console.log('#1.13-result-encoding-full: ', resultEncodingFull); // return [[4, 'a'], 'b', [2, 'c'], [2, 'a'], 'd', [4, 'e']]

/*
1.14 (*) Duplicate the elements of a list.
Example:
?- dupli([a,b,c,c,d],X).
X = [a,a,b,b,c,c,c,c,d,d]

*/

var listToDuplicate = ['a', 'b', 'c', 'd'];

function duplicateArrayElement(list, number){

	function duplicate(listElement){
		var duplicatedArray = [];
		for(i = 0; i < number; i++){
			duplicatedArray.push(listElement);
		}
		return duplicatedArray;
	}		

	var resultDuplicate = list.map(duplicate);

	function transformDuplicatedList(nestedList) {
		var list = [];
		var listsDuplicateTransformer = function(nestedList) {
			for (var i = 0; i < nestedList.length; i++) {
				if(typeof nestedList[i] === 'string'){
					list.push(nestedList[i])
				} else {
					listsDuplicateTransformer(nestedList[i])
				}
			}	
		}
		listsDuplicateTransformer(nestedList)
		return list;

	}

	return transformDuplicatedList(resultDuplicate);

}

var resultDuplicateList1 = duplicateArrayElement(listToDuplicate, 2);

console.log('#1.14-result-duplicate-x2: ', resultDuplicateList1); // return ['a', 'a', 'b' ,'b', 'c', 'c', 'd', 'd']


/*
1.15 (**) Duplicate the elements of a list a given number of times.
Example:
?- dupli([a,b,c],3,X).
X = [a,a,a,b,b,b,c,c,c]

What are the results of the goal:
?- dupli(X,3,Y).
*/

var resultDuplicateList2 = duplicateArrayElement(listToDuplicate, 3); // from exercice 1.14

console.log('#1.15-result-duplicate-x3: ', resultDuplicateList2); // return ['a', 'a', 'a','b', 'b' ,'b', 'c',  'c', 'c', 'd', 'd', 'd']


/*
1.16 (**) Drop every N'th element from a list.
Example:
?- drop([a,b,c,d,e,f,g,h,i,j],3,X).
X = [a,b,d,e,g,h,j]
*/

var listToDrop = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

function dropElement(list, number) {
	var i = list.length;
	while (i--) {

	  (i + 1) % number === 0 && list.splice(i, 1);
	}
	return list;
}

var resultDropList = dropElement(listToDrop, 3);

console.log('#1.16-result-drop-list: ', resultDropList); // return [ 'a', 'b', 'd', 'e', 'g', 'h', 'j' ]


/*
1.17 (*) Split a list into two parts; the length of the first part is given.
Do not use any predefined predicates.

Example:
?- split([a,b,c,d,e,f,g,h,i,k],3,L1,L2).
L1 = [a,b,c]
L2 = [d,e,f,g,h,i,k]

*/

var listToSplit = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

function splitList(list, number) {
	var	list1 = [];
	var list2 = [];

	for(i=0; i < number; i++) {
		list1.push(list[i])
	}
	for(j=number; j < list.length; j++) {
		list2.push(list[j])
	}
	var newList = {
		l1: list1,
		l2: list2,
	};
	return newList;
}

var resultDropList = splitList(listToSplit, 3);

console.log('#1.17-result-drop-list1: ', resultDropList.l1); // return [ 'a', 'b', 'c' ]
console.log('#1.17-result-drop-list2: ', resultDropList.l2); // return [ 'd', 'e', 'f', 'g', 'h', 'i', 'j' ]

/*
1.18 (**) Extract a slice from a list.
Given two indices, I and K, the slice is the list containing the elements between the I'th and K'th element 
of the original list (both limits included). Start counting the elements with 1.

Example:
?- slice([a,b,c,d,e,f,g,h,i,j],3,7,L).
 L = [c,d,e,f,g]
*/

var listToSlice = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

function sliceList(list, num1, num2) {
	var	listSliced = [];
	var valueStart= num1 - 1;
	for(i = valueStart; i < num2; i++) {
		listSliced.push(list[i])
	}

	return listSliced;
}

var resultSliceList = sliceList(listToSlice, 3, 7);

console.log('#1.18-result-slice-list: ', resultSliceList); // return [ 'c', 'd', 'e', 'f', 'g' ]


/*
1.19 (**) Rotate a list N places to the left.
Examples:
?- rotate([a,b,c,d,e,f,g,h],3,X).
X = [d,e,f,g,h,a,b,c]

?- rotate([a,b,c,d,e,f,g,h],-2,X).
X = [g,h,a,b,c,d,e,f]

*/
var listToRotate = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function rotateList(list, num) {
	var	listRotated = [];
  var valueCount = null;
  
	if(num > 0) {
    var valueCount = num;
	} else {
		var newNum = Math.abs(num);
		var valueCount = list.length - newNum; 
	}
  for(i = valueCount; i < list.length; i++) {
    listRotated.push(list[i]);
  }
  for(i = 0; i < valueCount; i++) {
    listRotated.push(list[i]);
  }

	return listRotated;
}

var resultRotateList = rotateList(listToRotate, 3);
var resultRotateList2 = rotateList(listToRotate, -2);

console.log('#1.19-result-rotate-list: ', resultRotateList); // should return [ 'd', 'e', 'f', 'g', 'h', 'a', 'b', 'c' ]
console.log('#1.19-result-rotate-list2: ', resultRotateList2); // should return [ 'g', 'h', 'a', 'b', 'c', d', 'e', 'f' ]


/*
1.20 (*) Remove the K'th element from a list.
Example:
?- remove_at(X,[a,b,c,d],2,R).
X = b
R = [a,c,d]

*/
var listToRemove = ['a', 'b', 'c', 'd'];

function removeElement(list, num) {
	var startValue = num - 1;
	var removedElement = list.splice(startValue, 1);
	var rest = list;
	var result = {
		element: removedElement,
		restList: rest,
	};
	return result;
}

var resultRemoveElement = removeElement(listToRemove, 2);


console.log('#1.20-result-removed-element: ', resultRemoveElement.element); // should return 'b'
console.log('#1.20-result-list: ', resultRemoveElement.restList); // should return ['a', 'c', 'd']

/*
1.21 (*) Insert an element at a given position into a list.
Example:
?- insert_at(alfa,[a,b,c,d],2,L).
L = [a,alfa,b,c,d]

*/

var listToAdd = ['a', 'b', 'c', 'd'];

function addElement(addedElement, list, num) {
	var startValue = num - 1;
	list.splice(startValue, 0, addedElement);
	return list;
}

var resultAddElement = addElement('alfa', listToAdd, 2);


console.log('#1.21-result-added-element: ', resultAddElement); // should return [ 'a', 'alfa', 'b', 'c', 'd' ]


/*
1.22 (*) Create a list containing all integers within a given range.
Example:
?- range(4,9,L).
L = [4,5,6,7,8,9]

*/

function makeRange(startInt, endInt) {
	var range = [];
	var posEnd = endInt + 1;

	for(i = startInt; i < posEnd; i++) {
		range.push(i);
	}

	return range;
}

var resultRange = makeRange(4, 9);


console.log('#1.22-result-range: ', resultRange); // should return [ 4, 5, 6, 7, 8, 9 ]



/*
1.23 (**) Extract a given number of randomly selected elements from a list.
The selected items shall be put into a result list.
Example:
?- rnd_select([a,b,c,d,e,f,g,h],3,L).
L = [e,d,a]

Hint: Use the built-in random number generator random/2 and the result of problem 1.20.

*/

var listToRandom = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function makeRandomSelect(list, num) {
	var resultList = [];

	for(i = 0; i < num; i++) {
		let randomNum = Math.floor(Math.random()*list.length);
		resultList.push(list[randomNum]);
	}
	return resultList;
}

var resultRandomSelect = makeRandomSelect(listToRandom, 3);


console.log('#1.23-result-random-select: ', resultRandomSelect); // should return an array with 3 letter only

/*
1.24 (*) Lotto: Draw N different random numbers from the set 1..M.
The selected numbers shall be put into a result list.
Example:
?- lotto(6,49,L).
L = [23,1,17,33,21,37]

Hint: Combine the solutions of problems 1.22 and 1.23.

*/

function makeRandomRange(resultAmount, endInt) {

	function makeRange(endNum) {
		var range = [];
		var posEnd = endNum + 1;

		for(i = 0; i < posEnd; i++) {
			range.push(i);
		}

		return range;
	}

	function makeRandomSelect(list, amount) {
		var resultList = [];

		for(i = 0; i < amount; i++) {
			let randomNum = Math.floor(Math.random()*list.length);
			resultList.push(list[randomNum]);
		}
		return resultList;
	}

	var resultRange = makeRange(endInt);
	var resultRandomSelect = makeRandomSelect(resultRange, resultAmount);

	return resultRandomSelect;

}

var resultRandomRange = makeRandomRange(6, 49);


console.log('#1.24-result-random-range: ', resultRandomRange); // should return an array with range of six integer elements between 0 to 49


/*
1.25 (*) Generate a random permutation of the elements of a list.
Example:
?- rnd_permu([a,b,c,d,e,f],L).
L = [b,a,d,c,e,f]

Hint: Use the solution of problem 1.23.
*/

var list25 = ['a', 'b', 'c', 'd', 'e', 'f'];

function makeRandomPermut(list) {
    let counter = list.length;
    var newList = list.slice(0);
    while ((counter > 0) && (counter--)) {
        let randomIndex = Math.floor(Math.random() * counter);
        let actualElement = newList[counter];
        newList[counter] = newList[randomIndex];
        newList[randomIndex] = actualElement;
    }
    return newList;
}

var resultRandomPermut = makeRandomPermut(list25);

console.log('#1.25-random permutation list: ' + JSON.stringify(list25) + ' = ', resultRandomPermut); // return last element
