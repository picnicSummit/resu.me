angular.module('app')

// TODO: array of enemy pieces
  // change check for collisions to run on enemyPieces[i]



.controller('gameController', ['$scope', '$timeout', '$interval', function($scope, $timeout, $interval) {

  // init function for game play
  $scope.play = function() {
    
    // player's character
    $scope.circle = new createjs.Shape();
    $scope.circleHead = new createjs.Shape();
    
    // computer characters
    $scope.enemy1 = new createjs.Shape();
    
    // set the state of the game to true
    $scope.gameOn = true;

    // root level container for display, each time tick method is calles
    // stage renders display list to target canvas
    var stage = new createjs.Stage('notFrogger');

    // set beginning fill colors
    // player
    $scope.circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 20);
    $scope.circleHead.graphics.beginFill('Red').drawCircle(0, 0, 10);
    
    // computer
    $scope.enemy1.graphics.beginFill('white').drawRect(0, 0, 20, 20);

    // set beginning player coordinates
    $scope.circle.x = 100;
    $scope.circle.y = 100;

    $scope.circleHead.x = $scope.circle.x;
    $scope.circleHead.y = $scope.circle.y - 20;

    // set beginning computer coordinates
    // setting computer width and height is necessary here
    // to detect collisions
    $scope.enemy1.width = 30;
    $scope.enemy1.height = 30;
    $scope.enemy1.x = 500;
    $scope.enemy1.y = 100;

    // adds a child to the beginning of the display list
    stage.addChild($scope.circle);
    stage.addChild($scope.circleHead);
    stage.addChild($scope.enemy1);

    // Ticker provides a centralized tick broadcast at a set interval
    // (Not using Ticker method correctly, instead created it by hand for practice)
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', stage);


    $scope.checkForCollisions = function() {
      // console.log('called', $scope.gameOn);
      // End game function calls when gameover
      if ($scope.gameOn === false) {
        alert('game over');
        return false;
      }

      // move computer controller pieces
      $timeout(function() {
        if ($scope.gameOn) {
          $scope.enemy1.x -= 20;
        } else {
          return false;
        }
      }, 300);

      // Check for collision cases, stop all pieces in place
      if ( ($scope.enemy1.y === ($scope.circle.y + $scope.enemy1.height) ) && ( ($scope.circle.x - $scope.enemy1.width) >= ($scope.enemy1.x + $scope.enemy1.width) ) ) {
        alert('collision!');
        $scope.enemy1.x = $scope.circle.x + $scope.enemy1.width - 5;
        $scope.enemy1.y = $scope.enemy1.y;
        $scope.circle.x = $scope.circle.x;
        $scope.circle.y = $scope.circle.y;
        $scope.circleHead.x = $scope.circle.x;
        $scope.circleHead.y = $scope.circle.y - 20;
        $scope.gameOn = false;
        return false;
      }
      if ( ($scope.circle.y === $scope.enemy1.y) && ( ($scope.circle.x + $scope.enemy1.width) >= ($scope.enemy1.x + $scope.enemy1.width) ) ) {
        alert('collision!22');
        $scope.enemy1.x = $scope.enemy1.x;
        $scope.enemy1.y = $scope.enemy1.y;
        $scope.circle.x = $scope.circle.x;
        $scope.circle.y = $scope.circle.y;
        $scope.circleHead.x = $scope.circle.x;
        $scope.circleHead.y = $scope.circle.y - 20;
        $scope.gameOn = false;
        return false;
      }
      if ($scope.enemy1.x <= -50) {
        alert('victory!');
        $scope.enemy1.x = $scope.enemy1.x;
        $scope.enemy1.y = $scope.enemy1.y;
        $scope.cicle.x = $scope.circle.x;
        $scope.circle.y = $scope.circle.y;
        $scope.circleHead.x = $scope.circle.x;
        $scope.circleHead.y = $scope.circle.y - 20;
        $scope.gameOn = false;
        return false;
      }
      if ($scope.gameOn) {
        console.log('game on is true', $scope.gameOn);
      // return $scope.gameFunction();

      }
    };

    // check the state of the game, initiate another interval
    $scope.gameFunction = function() {
      $interval(function() {
        if ($scope.gameOn) {
          $scope.checkForCollisions();
        }
      }, 500);
    };


  
  
  
    // capture user input and move piece
    $scope.playerInteraction = function(keyLocation) {
      console.log('keyLocation', keyLocation);

      if (keyLocation.keyCode === 38) {
        // down
        $scope.circle.y -= 20;
        $scope.circleHead.y -= 20;
      } else if (keyLocation.keyCode === 40) {
        // up
        $scope.circle.y += 20;
        $scope.circleHead.y += 20;
      } else if (keyLocation.keyCode === 39) {
        //right
        $scope.circle.x += 20;
        $scope.circleHead.x += 20;
      } else if (keyLocation.keyCode === 37) {
        //left
        $scope.circle.x -= 20;
        $scope.circleHead.x -= 20;
      } else {
        null;
      }

    };

    $scope.gameFunction();

  };
}]);