//creates board
var createBoard = function(n) {
  var orderedPairs = []
  for (x = 0; x < n; x++) {
    for (y = 0; y < n; y++) {
      orderedPairs.push({'x': x, 'y': y, 'q': false, 't':false});
    }
  }
  orderedPairs.side = n;
  return orderedPairs;
}

//takes in a board and returns an array of indexes which have a queen
var findQs = function (board) {
  var hasQueen = []
  board.forEach(function (element, index) {
    if (element.q === true) {
      hasQueen.push(index);
    }
  })
  return hasQueen;
}

//later add functionality to log with an ARRAY of Queen indexes
var logSquaresAsThreatened = function (board, queenSpace) {
  var boardCopy = JSON.parse(JSON.stringify(board));
  var Q = boardCopy[queenSpace];
  var sideLength = Math.sqrt(boardCopy.length);

  boardCopy.forEach(function(element, index, arr) {
    if (element.x === Q.x || element.y === Q.y) {
      element.t = true;
    }
    for (var i = 1; i < sideLength; i++) {
      if ((element.x - i === Q.x && element.y - i === Q.y) ||
          (element.x + i === Q.x && element.y - i === Q.y) ||
          (element.x - i === Q.x && element.y + i === Q.y) ||
          (element.x + i === Q.x && element.y + i === Q.y)) {
            element.t = true
      }
    }
  });
  return boardCopy;
}

//takes in a current board situation.. and an array of past tested indexes of queen??
//and returns an array with: board with a new queen placed at a valid location, and all past and current tested locations
var placeQueen = function (board, testedLocations) {
  var boardCopy = JSON.parse(JSON.stringify(board));
  //var testedLocationsCopy = JSON.parse(JSON.stringify(testedLocations));

  for (var i = 0; i < boardCopy.length; i++) {
    if (boardCopy[i].t !== true /*&& testedLocationsCopy.indexOf(i) === -1*/) {
      boardCopy[i].q = true;
      break;
    }
  }
  boardCopy = logSquaresAsThreatened(boardCopy, i);
  return (boardCopy);
};

//displays board in the console
var displayBoard = function (board) {
  var sideLength = Math.sqrt(board.length);
  var currentLineStart = 0;
  var currentLineDisplay = ``;
  var displayLine = function () {
    for (var i = currentLineStart; i < currentLineStart + sideLength; i++) {
      if (board[i].q === false) {
        if (board[i].t === false) {
          currentLineDisplay += ` o `;
        } else {
          currentLineDisplay += ` T `;
        }
      } else {
        currentLineDisplay += ` Q `;
      }
    }
    console.log(currentLineDisplay);
    currentLineDisplay = ``;
    if (board[i + 1]) {
      currentLineStart = currentLineStart + sideLength;
      displayLine()
    }
  }
  displayLine();
};

//I: empty board
//O: return a board w/ as many queens on it as could possibly fit
var mostQueens = function(board) {
  //Recursion
  //use a storage variable
  var storage = [];
  storage.totalQs = 0;

  //use an innerfunc
  var innerFunc = function (board, indexOfPlacedQueen) {
    //base case
    //update storage if findQs.length of currentboard > previous storage
    var totalQs = findQs(board).length;
    if (totalQs > storage.totalQs) {
      storage = board;
      storage.totalQs = totalQs;
    }

    //recursion case
    //for every square
    for (var i = 0; i < board.length; i++) {
      //if sqr is not threatened
      if (board[i].t === false) {
        // place queen
        var queenPlaced = placeQueen(board);
        // call inner func with the new situation
        innerFunc(queenPlaced, board[i]);
      }
    }
  }
  innerFunc(board);

  return storage;
}


/*
var removeRedundantSquares(chessBoardArray) {
}
*/

 //TESTS
var chess3 = createBoard(3);
displayBoard(mostQueens(chess3));

var chess4 = createBoard(4);
displayBoard(mostQueens(chess4));

var chess5 = createBoard(5);
displayBoard(mostQueens(chess5));