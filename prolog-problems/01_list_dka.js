/* Started tuesday 12/09/2017 from https://sites.google.com/site/prologsite/prolog-problems/1

Exercice 1

A list is either empty or it is composed of a first element (head) and a tail, which is a list itself. In Prolog we represent the empty list by the atom [] and a non-empty list by a term [H|T] where H denotes the head and T denotes the tail.

1.01 (*) Find the last element of a list.
	Example:
	?- my_last(X,[a,b,c,d]).
	X = d
*/

var list1 = ['a', 'b', 'c', 'd'];


const getLast = (list) => list[list.length-1];

console.log('[correction 1.01] ===>', 'last element of list '+JSON.stringify(list1)+' is ' + getLast(list1));

/*
1.02 (*) Find the last but one element of a list.
(de: zweitletztes Element, fr: avant-dernier élément)
*/
var list2 = ['a', 'b', 'c', 'd'];

const getBeforeLast = (list) => {
	if (list.length < 2) {
		throw new Error('list dont have a before last');
	}
	return list[list.length-2];
}

console.log('[correction 1.02] ===>', 'before last element of list '+JSON.stringify(list2)+' is ' + getBeforeLast(list2));

/*
1.03 (*) Find the K'th element of a list.
The first element in the list is number 1.
Example:
?- element_at(X,[a,b,c,d,e],3).
X = c
*/

var list3 = ['a', 'b', 'c', 'd', 'e'];

const getAtPos = (list, pos) => list[pos-1];

console.log('[correction 1.03] ===>', JSON.stringify(list3)+' at position 3', getAtPos(list3, 3));


/*
1.04 (*) Find the number of elements of a list.
*/

var list4 = ['a', 'b', 'c', 'd', 'e', 'f'];

const getLength = (list) => list.length;

console.log('[correction 1.04] ===>', JSON.stringify(list4)+' length', getLength(list4));

/*
1.05 (*) Reverse a list.
*/

var list5 = ['a', 'b', 'c', 'd', 'e', 'f'];

const getReversed = (list) => list.reverse();

console.log('[correction 1.05] ===>', JSON.stringify(list5)+' reversed', getReversed(list4));


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

console.log('[correction 1.06] ===>', JSON.stringify(listPalindromeOdd)+' is palindrome', isPalindrome(listPalindromeOdd));
console.log('[correction 1.06] ===>', JSON.stringify(listPalindromeEven)+' is palindrome', isPalindrome(listPalindromeEven));
console.log('[correction 1.06] ===>', JSON.stringify(listNotPalindrome)+' is palindrome', isPalindrome(listNotPalindrome));

/*
1.07 (**) Flatten a nested list structure.
Transform a list, possibly holding lists as elements into a 'flat' list by replacing each list with its elements (recursively).

Example:
?- my_flatten([a, [b, [c, d], e]], X).

X = [a, b, c, d, e]

Hint: Use the predefined predicates is_list/1 and append/3
*/

var flattenNestedList = ['a', ['b', ['c', 'd'], 'e']];

const getFlattenList = (list) => {
	const newList = []	
	const setFlattenList = (list) => list.forEach((item) => typeof item === 'string' ? newList.push(item) : newList.concat(setFlattenList(item)));
	setFlattenList(list);
	return newList;
}

console.log('[correction 1.07] ===>'+JSON.stringify(flattenNestedList)+' with flatten ', getFlattenList(flattenNestedList));

/*
1.08 (**) Eliminate consecutive duplicates of list elements.
If a list contains repeated elements they should be replaced with a single copy of the element. The order of the elements should not be changed.

Example:
?- compress([a,a,a,a,b,c,c,a,a,d,e,e,e,e],X).
X = [a,b,c,a,d,e]
*/

var duplicateList = ['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e'];

const getCompress = (list) => {
	const newList = [];
	let cursor;
	while(cursor = list.shift()) {
		if (cursor !== list[0]) {
			newList.push(cursor);
		}	
	}
	return newList;
};

console.log('[correction 1.08] ===>', JSON.stringify(duplicateList)+' compressed ', getCompress(duplicateList));


/*
1.09 (**) Pack consecutive duplicates of list elements into sublists.
If a list contains repeated elements they should be placed in separate sublists.

Example:
?- pack([a,a,a,a,b,c,c,a,a,d,e,e,e,e],X).
X = [[a,a,a,a],[b],[c,c],[a,a],[d],[e,e,e,e]]

*/
const toSubList = ['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e'];

const getHasSubList = (list) => {
	const finalList = [];
	let cursor;
	while(cursor = list.shift()) {
		const newList = [cursor];
		while (list[0] === cursor) {
			newList.push(list.shift());
		}
		finalList.push(newList);
	}
	return finalList;
}

const res = getHasSubList(JSON.parse(JSON.stringify(toSubList))); // un bug dans ma version de node
console.log('[correction 1.09] ===>', JSON.stringify(toSubList)+' to sub list ', JSON.stringify(res));


/*
1.10 (*) Run-length encoding of a list.
Use the result of problem 1.09 to implement the so-called run-length encoding data compression method. Consecutive duplicates of elements are encoded as terms [N,E] where N is the number of duplicates of the element E.

Example:
?- encode([a,a,a,a,b,c,c,a,a,d,e,e,e,e],X).
X = [[4,a],[1,b],[2,c],[2,a],[1,d],[4,e]]

*/

const getEncode = (list) => list.map((sublist) => [sublist.length, sublist[0]]);
const res2 = getEncode(res);
console.log('[correction 1.10] ===>', JSON.stringify(res)+' to encode ', JSON.stringify(res2));


/*
1.11 (*) Modified run-length encoding.
Modify the result of problem 1.10 in such a way that if an element has no duplicates it is simply copied into the result list. Only elements with duplicates are transferred as [N,E] terms.

Example:
?- encode_modified([a,a,a,a,b,c,c,a,a,d,e,e,e,e],X).
X = [[4,a],b,[2,c],[2,a],d,[4,e]]
*/
const getEncodeModified = (list) => list.map((sublist) => sublist[0] === 1 ? sublist[1] : sublist);

const res3 = getEncodeModified(res2);
console.log('[correction 1.11] ===>', JSON.stringify(res2)+' to encode modified ', JSON.stringify(getEncodeModified(res3)));


// /*
// 1.12 (**) Decode a run-length encoded list.
// Given a run-length code list generated as specified in problem 1.11. Construct its uncompressed version.



// /*
// 1.13 (**) Run-length encoding of a list (direct solution).
// Implement the so-called run-length encoding data compression method directly. 
// I.e. don't explicitly create the sublists containing the duplicates, as in problem 1.09, 
// but only count them. As in problem 1.11, simplify the result list by replacing the singleton terms [1,X] by X.

// Example:
// ?- encode_direct([a,a,a,a,b,c,c,a,a,d,e,e,e,e],X).
// X = [[4,a],b,[2,c],[2,a],d,[4,e]]



// /*
// 1.14 (*) Duplicate the elements of a list.
// Example:
// ?- dupli([a,b,c,c,d],X).
// X = [a,a,b,b,c,c,c,c,d,d]

// */


// /*
// 1.15 (**) Duplicate the elements of a list a given number of times.
// Example:
// ?- dupli([a,b,c],3,X).
// X = [a,a,a,b,b,b,c,c,c]

// What are the results of the goal:
// ?- dupli(X,3,Y).
// */

// /*
// 1.16 (**) Drop every N'th element from a list.
// Example:
// ?- drop([a,b,c,d,e,f,g,h,i,j],3,X).
// X = [a,b,d,e,g,h,j]
// */

// /*
// 1.17 (*) Split a list into two parts; the length of the first part is given.
// Do not use any predefined predicates.

// Example:
// ?- split([a,b,c,d,e,f,g,h,i,k],3,L1,L2).
// L1 = [a,b,c]
// L2 = [d,e,f,g,h,i,k]

// */

// /*
// 1.18 (**) Extract a slice from a list.
// Given two indices, I and K, the slice is the list containing the elements between the I'th and K'th element 
// of the original list (both limits included). Start counting the elements with 1.

// Example:
// ?- slice([a,b,c,d,e,f,g,h,i,j],3,7,L).
//  L = [c,d,e,f,g]
// */


// /*
// 1.19 (**) Rotate a list N places to the left.
// Examples:
// ?- rotate([a,b,c,d,e,f,g,h],3,X).
// X = [d,e,f,g,h,a,b,c]

// ?- rotate([a,b,c,d,e,f,g,h],-2,X).
// X = [g,h,a,b,c,d,e,f]

// */


// /*
// 1.20 (*) Remove the K'th element from a list.
// Example:
// ?- remove_at(X,[a,b,c,d],2,R).
// X = b
// R = [a,c,d]

// */

// /*
// 1.21 (*) Insert an element at a given position into a list.
// Example:
// ?- insert_at(alfa,[a,b,c,d],2,L).
// L = [a,alfa,b,c,d]

// */



// /*
// 1.22 (*) Create a list containing all integers within a given range.
// Example:
// ?- range(4,9,L).
// L = [4,5,6,7,8,9]

// */


// /*
// 1.23 (**) Extract a given number of randomly selected elements from a list.
// The selected items shall be put into a result list.
// Example:
// ?- rnd_select([a,b,c,d,e,f,g,h],3,L).
// L = [e,d,a]

// Hint: Use the built-in random number generator random/2 and the result of problem 1.20.

// */

// /*
// 1.24 (*) Lotto: Draw N different random numbers from the set 1..M.
// The selected numbers shall be put into a result list.
// Example:
// ?- lotto(6,49,L).
// L = [23,1,17,33,21,37]

// Hint: Combine the solutions of problems 1.22 and 1.23.

// */
