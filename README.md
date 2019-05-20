# Run the project

- Run `npm install && npm run start` in the root folder of the project to run the app.

# Test the project

- Run `npm run test` in the root folder of the project to test the app.

# What are the highlights of your logic/code writing style?

- App is built with vanilla js using ES6, and doesn't use any frameworks.
- App is based on MVC architecture.
- Jest is used for unit testing.

# What are the highlights of the app?

- User can play with computer or choose another player to play the game. By default game is between computer and a human player.
- User can choose the color (Red, blue). By default player's default color is blue.
- User can choose the difficulty level. However, there is only one level at the moment.
- The first move should be always made by the player. We can make it dynamic in the future.
- When it is player’s move, user is prompted for which column to drop token into.
- Player is alerted of the valid columns before every move. 
- Player is shown an error message when an invalid column is given, and prompted again.


## What could have been done in a better way? What would you do in version 2.0?

- Use Typescript to reap all the benefits of static type-checking and better object-oriented programming practices. 

## What were the questions you would ask and your own answers/assumptions?

- I assumed to have the first letter of the color to represent the occupied slot in the game board. We can change this to any other shapes in the future.

## Any other notes you feel relevant for the evaluation of your solution.

- Due to the time constraint, this app is just a basic version. We can refactor and optimize a lot of things.
- UI is very basic.
- Improve the AI algorithm