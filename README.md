Words puzzle
============

A game runs for 40 seconds. During that time, you have to guess as many words as you can.

Installation & usage
--------------------

You can manually run the application with the following commands:

```sh
git clone https://github.com/fedealconada/words-game.git
cd words-game
npm install && bower install
grunt serve
```

Alternatively, you cand find the app deployed in Heroku by clicking [here](https://infinite-falls-42030.herokuapp.com).

Optional: To build the project in a 'dist' folder:
```sh
grunt build
```

Stack
-------

Yeoman has been used:
- Scaffolding tool: (yo) --> generator: angular
- Build tool: Grunt 
- Package manager: NPM & Bower

The app is implemented with:
- AngularJS
- Boostrap 3 + custom styles
- Firebase
- Underscore

Notes
-------


Ideas
-------
Here are some ideas to improve the game!
- Multiplayer support:
  1. Load the game.
  2. Wait for opponent.
  3. Start playing! The one that guesses more words wins.
- Diffulty modes: be able to choose between easy, intermediate and hard.

Support
-------

If you're having any problem, please contact me at federico.alconada@icloud.com and I will be happy to help.
