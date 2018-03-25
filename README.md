# A simple tweet feed example
```
A simple tweet feed with unit test and Istanbul code coverage.
This project is inspired by https://github.com/gabel/karma-webpack-example
```
## Prerequisite

```
Need to install NodeJs, this demo App is tested on NodeJs 8.9.4.
```
## Description

```
This app will take a list of tweeters in one text file and a list of tweets in another text file, 
figuring out the following/follower relationships among the tweeters. Then it will print out the tweeters 
and his/her tweets in alphabetical order. This app will also purge all the tweets which is not tweeted 
by any of the tweeters in the list.

```
## Installation

```
npm install

```
Might take a bit long to install, please be patient

## Run

```
npm start
```
Output
```
Alan
@Alan: Water Crisis @ CT
Bob
@Alan: Water Crisis @ CT
@Bob: Give me your email address, I'll send you a 5l of water :)
```
## Test

```
npm test
```

Output
```



 Test cases with two tweeters
       ✓ should produce no result if no tweeter and no tweet 
       ✓ should produce no result if no tweet
       ✓ should produce no result if no tweeters
       ✓ should produce no result if no tweet is tweeted by one of the tweeters in the Tweeters list
       ✓ should produce right result with one tweet
       ✓ should produce right result with two tweets
       ✓ should produce right result with two tweets, but one of the tweet is not tweeted by anyone in the tweeters list
 
   fileUtils test suite
     ✓ should throw an Error
     ✓ should return a array
     ✓ should handle LF (line feed)
     ✓ should return 3 records
     ✓ should still return 3 records
 
 
   53 passing (32ms)


```
## Gulp

```
npm run test-gulp
```
or simply "gulp" in the projects directory if you have gulp installed globally

Output
```
-----------------------|----------|----------|----------|----------|----------------|
 src/                  |    95.31 |    86.67 |      100 |    95.31 |                |
  tweetFeeder.js       |    95.31 |    86.67 |      100 |    95.31 |       11,15,18 |
 src/components/tweet/ |    89.86 |    78.13 |      100 |    89.86 |                |
  tweetData.js         |    90.32 |       85 |      100 |    90.32 |       11,15,18 |
  tweetProcessor.js    |    89.47 |    66.67 |      100 |    89.47 |   11,15,18,111 |
 src/components/user/  |     87.5 |    82.05 |      100 |     87.5 |                |
  userData.js          |    79.41 |    82.35 |      100 |    79.41 |... 57,58,75,76 |
  userProcessor.js     |    92.59 |    81.82 |      100 |    92.59 |   11,15,18,116 |
 src/enums/            |    57.14 |       50 |      100 |    57.14 |                |
  errorCode.js         |    57.14 |       50 |      100 |    57.14 |       14,18,21 |
 src/utils/            |       80 |       70 |      100 |       80 |                |
  fileUtils.js         |       80 |       70 |      100 |       80 |       14,18,21 |
-----------------------|----------|----------|----------|----------|----------------|
All files              |    88.89 |    79.49 |      100 |    88.89 |                |
-----------------------|----------|----------|----------|----------|----------------|


=============================== Coverage summary ===============================
Statements   : 88.89% ( 216/243 )
Branches     : 79.49% ( 93/117 )
Functions    : 100% ( 44/44 )
Lines        : 88.89% ( 216/243 )
================================================================================
