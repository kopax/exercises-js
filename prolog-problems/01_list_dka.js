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

const getDecodedModified = (list) => {
	let decodedList = [];
	list.forEach((item) =>  {
		if (typeof item === 'string') {
            decodedList.push(item);
		}
		for(let i = 0; i < item[0]; i += 1) {
            decodedList.push(item[1]);
		}
	});
	return decodedList;
}


console.log('[correction 1.12] ===>', JSON.stringify(res3)+' to be decoded', JSON.stringify(getDecodedModified(res3)));

// /*
// 1.13 (**) Run-length encoding of a list (direct solution).
// Implement the so-called run-length encoding data compression method directly.
// I.e. don't explicitly create the sublists containing the duplicates, as in problem 1.09,
// but only count them. As in problem 1.11, simplify the result list by replacing the singleton terms [1,X] by X.

// Example:
// ?- encode_direct([a,a,a,a,b,c,c,a,a,d,e,e,e,e],X).
// X = [[4,a],b,[2,c],[2,a],d,[4,e]]

const encodeDirectList = ['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e'];

const encodeDirect = (list) => {
	const encodedList = [];
	let cursor;
	while(cursor = list.shift()) {
		const res = [1, cursor]
		while (cursor === list[0]) {
			list.shift();
			res[0] += 1;
		}
		res[0] === 1 ? encodedList.push(res[1]) : encodedList.push(res);
	}
	return encodedList;
};


console.log('[correction 1.13] ===>', JSON.stringify(encodeDirectList)+' to be encoded', JSON.stringify(encodeDirect(encodeDirectList)));


/*
1.14 (*) Duplicate the elements of a list.
Example:
?- dupli([a,b,c,c,d],X).
X = [a,a,b,b,c,c,c,c,d,d]
*/

const duplicateList14 = ['a', 'b', 'c', 'd'];
const getDuplicateList = (list) => {
	let cursor;
	let finalList = [];
	while(cursor = list.shift()) {
        finalList.push(cursor);
		finalList.push(cursor);
	}
	return finalList;
}

console.log('[correction 1.14] ===>', JSON.stringify(duplicateList14)+' to be duplicated', JSON.stringify(getDuplicateList(duplicateList14)));


/*
1.15 (**) Duplicate the elements of a list a given number of times.
Example:
?- dupli([a,b,c],3,X).
X = [a,a,a,b,b,b,c,c,c]

What are the results of the goal:
?- dupli(X,3,Y).
*/

const duplicateList15 = ['a', 'b', 'c', 'd'];
const repeatTime15 = 3;
const getDuplicateListWithParameter = (list, repeatTime = 0) => {
    let cursor;
    let finalList = [];
    while(cursor = list.shift()) {
        finalList.push(cursor);
        for (let i = 0; i < repeatTime; i += 1) {
            finalList.push(cursor);
		}
    }
    return finalList;
}

console.log('[correction 1.15] ===>', JSON.stringify(duplicateList15)+' to be duplicated', JSON.stringify(getDuplicateListWithParameter(duplicateList15, repeatTime15)));


/*
1.16 (**) Drop every N'th element from a list.
Example:
?- drop([a,b,c,d,e,f,g,h,i,j],3,X).
X = [a,b,d,e,g,h,j]
*/
const listToDrop = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
const indiceEveryDrop = 3;
const getDropEveryList = (list, indiceEvery) => {
    let finalList = [];
    const total = list.length;
	for (let i = 0; i < total; i += 1) {
		if (i !== indiceEvery - 1) {
			finalList.push(list[i]);
		}
	}
    return finalList;
}

console.log('[correction 1.16] ===>', JSON.stringify(listToDrop)+' to be drop every ', indiceEveryDrop, 'element', JSON.stringify(getDropEveryList(listToDrop, indiceEveryDrop)));

/*
1.17 (*) Split a list into two parts; the length of the first part is given.
Do not use any predefined predicates.

Example:
?- split([a,b,c,d,e,f,g,h,i,k],3,L1,L2).
L1 = [a,b,c]
L2 = [d,e,f,g,h,i,k]

*/
const listToSplit = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
const listToSplitInd = 3;
const splitTheList = (list, splitPos) => [list.slice(0, splitPos), list.slice(splitPos)];

console.log('[correction 1.17] ===>', JSON.stringify(listToDrop)+' to be splitted', JSON.stringify(splitTheList(listToSplit, listToSplitInd)));

/*
1.18 (**) Extract a slice from a list.
Given two indices, I and K, the slice is the list containing the elements between the I'th and K'th element
of the original list (both limits included). Start counting the elements with 1.

Example:
?- slice([a,b,c,d,e,f,g,h,i,j],3,7,L).
 L = [c,d,e,f,g]
*/
const listToSlice = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
const listPosMin = 3;
const listPosMax = 7;

const getListToSlice = (list, posMin, posMax) => list.slice(posMin - 1, posMax);

console.log('[correction 1.18] ===>', JSON.stringify(listToSlice)+' to be sliced', JSON.stringify(getListToSlice(listToSplit, listPosMin, listPosMax)));



/*
1.19 (**) Rotate a list N places to the left.
Examples:
?- rotate([a,b,c,d,e,f,g,h],3,X).
X = [d,e,f,g,h,a,b,c]

?- rotate([a,b,c,d,e,f,g,h],-2,X).
X = [g,h,a,b,c,d,e,f]

*/
const listToRotate = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const indReverse = -2;
const getRotatedList = (list, ind) => {
    const before = list.slice(ind);
    const after = list.slice(0, ind);
	return before.concat(after);
};

console.log('[correction 1.19] ===>', JSON.stringify(listToRotate)+' to be rotated', JSON.stringify(getRotatedList(listToRotate, indReverse)));



/*
1.20 (*) Remove the K'th element from a list.
Example:
?- remove_at(X,[a,b,c,d],2,R).
X = b
R = [a,c,d]

*/

const listToRemove = ['a', 'b', 'c', 'd'];
const indiceItemToRemove = 2;
const getListWithRemoveFromIndex = (list, indexToRemove) => {
    const before = list.slice(0, indexToRemove - 1);
    const after = list.slice(indexToRemove);
    return before.concat(after);
}

console.log('[correction 1.20] ===>', JSON.stringify(listToRemove)+' to remove item', JSON.stringify(getListWithRemoveFromIndex(listToRemove, indiceItemToRemove)));


/*
1.21 (*) Insert an element at a given position into a list.
Example:
?- insert_at(alfa,[a,b,c,d],2,L).
L = [a,alfa,b,c,d]

*/
const listToAdd = ['a', 'b', 'c', 'd'];
const itemToAdd = 'alfa';
const insertedIndToAdd = 2;

const insertInListAt = (list, item, insertedInd) => {
    const before = list.slice(0, insertedInd - 1);
    const after = list.slice(insertedInd - 1);
    return before.concat([item]).concat(after);
}


console.log('[correction 1.21] ===>', JSON.stringify(listToRemove)+' to remove item', JSON.stringify(insertInListAt(listToAdd, itemToAdd, insertedIndToAdd)));

/*
1.22 (*) Create a list containing all integers within a given range.
Example:
?- range(4,9,L).
L = [4,5,6,7,8,9]

*/

const startRange = 4;
const endRange = 9;

const createRange = (start, end) => {
	const list = [];
	while (start <= end) {
		list.push(start)
		start += 1;
	}
	return list;
}

console.log('[correction 1.22] ===>', startRange + ' to range', endRange, JSON.stringify(createRange(startRange, endRange)));


/*
1.23 (**) Extract a given number of randomly selected elements from a list.
The selected items shall be put into a result list.
Example:
?- rnd_select([a,b,c,d,e,f,g,h],3,L).
L = [e,d,a]

Hint: Use the built-in random number generator random/2 and the result of problem 1.20.

*/

const listToRandom = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const getTripleListRandom = (list) => {
	return [
		list[Math.floor(Math.random()*list.length)],
		list[Math.floor(Math.random()*list.length)],
		list[Math.floor(Math.random()*list.length)]
	];
}

console.log('[correction 1.23] ===>', JSON.stringify(listToRandom)+' to random 3 items ', JSON.stringify(getTripleListRandom(listToRandom)));

/*
1.24 (*) Lotto: Draw N different random numbers from the set 1..M.
The selected numbers shall be put into a result list.
Example:
?- lotto(6,49,L).
L = [23,1,17,33,21,37]

Hint: Combine the solutions of problems 1.22 and 1.23.

*/


const lotoLength = 6;
const lotoMax = 49;

const getRandomRange = (listLength, max) => {
	const list = [];
	while (list.length !== listLength) {
        const random = Math.floor(Math.random() * max) + 1
        list.push(random);
	}
	return list;
}

console.log('[correction 1.24] ===>', lotoLength + ' number to ', lotoMax, JSON.stringify(getRandomRange(lotoLength, lotoMax)));

/*
1.25 (*) Generate a random permutation of the elements of a list.
Example:
?- rnd_permu([a,b,c,d,e,f],L).
L = [b,a,d,c,e,f]

Hint: Use the solution of problem 1.23.
*/

const listToShuffle = ['a', 'b', 'c', 'd', 'e', 'f'];

const getShuffleList = (list) => {
    const finalList = [];
    const doneIndiceList = [];
    while(finalList.length !== list.length) {
        const random = Math.floor(Math.random() * list.length);
        if (doneIndiceList.indexOf(random) === -1) {
			doneIndiceList.push(random);
            finalList.push(list[random]);
        }
	}

    return finalList;
}

console.log('[correction 1.25] ===>', JSON.stringify(listToShuffle)+' to shuffle', JSON.stringify(getShuffleList(listToShuffle)));

/*
1.26 (**) Generate the combinations of K distinct objects chosen from the N elements of a list
In how many ways can a committee of 3 be chosen from a group of 12 people? We all know that there are C(12,3) = 220 possibilities (C(N,K) denotes the well-known binomial coefficients). For pure mathematicians, this result may be great. But we want to really generate all the possibilities (via backtracking).

Example:
        ?- combination(3,[a,b,c,d,e,f],L).
        L = [a,b,c] ;
L = [a,b,d] ;
L = [a,b,e] ;
...
*/
const list26 = ['a', 'b', 'c', 'd', 'e', 'f'];
const size26 = 3;

const getCombination = (list, size) => {
	const finalList = [];

    while (finalList.length !== size) {
        const random = Math.floor(Math.random() * list.length);
        if (finalList.indexOf(list[random]) === -1) {
        	finalList.push(list[random]);
		}
    }

	return finalList;
}

console.log('[correction 1.26] ===>', JSON.stringify(list26)+' to shuffle', JSON.stringify(getCombination(list26, size26)));
