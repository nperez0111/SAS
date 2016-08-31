# SAS Dual Enrollment Course Picker Web App

![SAS Course Picker](http://nickthesick.com/images/sasBig.jpg)


This is the source code for the SAS Course picker Web App. This allows students of SAS have an easier time picking their Miami Dade College Courses without having to cross reference multiple resources. The main goal of this web app is usability and speed to find courses(because you don't always remember the course number when you need it).

## Little more background

This website ~~is~~ was setup to scrape information off of the Miami Dade website course picker(Which has an awful interface would not recommend on Yelp) until Miami Dade College decided to block viewing the courses with a login. This probably has a way around it but as I have no use for it anymore I am to leave it unmaintained. Open an issue if you would like me to work on anything, or better yet send a pull request.

## What's actually going on in the background

Every time the display.php function is given enough parameters it makes a request to the Miami Dade website and parses it's HTML into a format that is actually readable(It really was that horrendous). 

A poor design choice at the time is that every time the page is loaded it has to render all of the courses and their metadata. If I was to do this again I'd probably either look into server side rendering or at least loading what is needed via AJAX and caching results. (You don't always need the 328 classes)
