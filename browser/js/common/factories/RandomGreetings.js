app.factory('RandomGreetings', function () {

    var getRandomFromArray = function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    var greetings = [
        'Do. Or do not. There is no try.',
        'In my experience there is no such thing as luck.',
        'I\'ve got a bad feeling about this.',
        'It\'s a trap!',
        'So this is how liberty dies…with thunderous applause.',
        'Your eyes can deceive you. Don’t trust them.',
        'Never tell me the odds.',
        'You do have your moments. Not many, but you have them.',
        'Now, witness the power of this fully operational battle station.',
        '…Scoundrel. I like that.',
        'Who\'s the more foolish; the fool, or the fool who follows him?',
        'Laugh it up, fuzzball!',
        'A Jedi Knight? Jeez, I’m out of it for a little while, everyone gets delusions of grandeur!',
        'I\'m Luke Skywalker? I\'m here to rescue you!',
        'Boba Fett? Boba Fett? Where?',
        'I suggest a new strategy, R2. Let the Wookiee win.'
    ];

    return {
        greetings: greetings,
        getRandomGreeting: function () {
            return getRandomFromArray(greetings);
        }
    };

});
