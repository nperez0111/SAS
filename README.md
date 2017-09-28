# SAS Dual Enrollment Course Picker Web App

![SAS Course Picker](http://nickthesick.com/images/sasBig.jpg)


## What

This is the source code for the SAS Course picker Web App. This allows students of SAS have an easier time picking their Miami Dade College Courses without having to cross reference multiple resources. The main goal of this web app is usability and speed to find courses(because you don't always remember the course number when you need it).

## Why

I went to a high school that you would take college courses at the same time as your high school courses. So every semester we would pick our college courses as a college student would but since we were high school students we were restricted in which courses we could take and did not really have much knowledge of courses that would be useful to our future. I was very frustrated with the process of picking courses as it required cross examining multiple documents in order to find the courses that we could take versus what it is that we needed and would be helpful.

So I set out to make it easier for the students in my school by compiling everything into a website that would help you pick courses and give current info such as available times for the classes. The website basically gave you everything you needed to pick courses and would even help you pick classes as it had a course picker built in that given your prior classes would suggest classes you should take given what is necessary to graduate with an A.A. 

So out of my frustration, I made this web app to scrape my college's website in order to get course times and course descriptions and it was a success, students are still using my website to pick classes to this day even after I graduated.

## How

This website ~~is~~ was setup to scrape information off of the Miami Dade website course picker(Which has an awful interface would not recommend on Yelp) until Miami Dade College decided to block viewing the courses with a login. This probably has a way around it but as I have no use for it anymore I am to leave it unmaintained. Open an issue if you would like me to work on anything, or better yet send a pull request.

### Little more technical now

Every time the display.php function is given enough parameters it makes a request to the Miami Dade website and parses it's HTML into a format that is actually readable(It really was that horrendous). 

A poor design choice at the time is that every time the page is loaded it has to render all of the courses and their metadata. If I was to do this again I'd probably either look into server side rendering or at least loading what is needed via AJAX and caching results. (You don't always need the 328 classes)
