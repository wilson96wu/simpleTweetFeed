var fs = require("fs");
var TweetFeeder = require('./src/tweetFeeder');
const userFile = './data/user.txt';
const tweetFile = './data/tweet.txt';

var tweetFeeder = new TweetFeeder(fs);

var userData = fs.readFileSync(userFile, 'utf-8');
var tweetData = fs.readFileSync(tweetFile, 'utf-8');

console.log(tweetFeeder.processFeed(userData, tweetData));