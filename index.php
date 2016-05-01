<?PHP /*session_start();
if (!isset($_SESSION['loggedin']) || !$_SESSION['loggedin'] == true) {
    header('Location: signin.php');
}*/ ?>
<!doctype html>
<html lang="en">
<head>
		<meta charset="Utf-8">
        <title>Miami Dade Dual-Enrollment Approved Courses</title>
        
		<meta content="This is to help Dual enrollment students be able to choose their Miami Dade Courses quicker and easier than ever!" name="description">
		<meta property="og:title" content="Choose Miami Dade Dual enrollment courses easier!"/>
		<meta name="keywords" content="Miami Dade, Dual enrollment, SAS, Courses" />
		<meta name="Author" content="Nicholas Perez" />
		<meta name="HandheldFriendly" content="True">
        <!--<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">-->
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
		<meta name="viewport" content="width=device-width, initial-scale=1">  
    
        <link rel="stylesheet" href="css/normalize.css">
    	<link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/featherlight.min.css">
        
        <link rel="apple-touch-icon" href="images/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" href="images/favicon.png">
        <link rel="apple-touch-startup-image" href="images/splashp.png" />
        <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-61069332-2', 'auto');
  ga('send', 'pageview');

</script>
    </head>
    
    <body>
       <header>
        <img src="images/logo.jpg" alt="MDC Logo" />
        <h1>Dual-Enrollment Approved Courses</h1>
    </header>
    <div>
        <label for="search">Let's get started</label>
        <input type='search' id="search" name='search' value="" placeholder="Search by Courses, Subjects, Course IDs..." id="search" autocomplete="off">
    </div>
        <div id="selectClass">
            
        </div>
    
    <div id="table">
        <p style="padding:0 5%;text-align:center">
            Loading....<span style="display:block;width:30px;height:30px;margin:0 auto;" class='loader'></span>
        </p>
        <noscript style="padding:0 5%;">Seems like you don't have any Javascript enabled! You should probably either enable JavaScript or try in a <a href="https://whatbrowser.org/">different browser</a>.</noscript>
        </div>
        <footer><p>Made by Nick the Sick for SAS</p></footer>
        <div id="hook" class="hidden"></div>
        <div id="carter" class="hidden"></div>
        <script id="aa" type="text/ractive">
        <div class="realwrap">
        <div id="step1" class="display">
        <div class="wrap">
        <h1 class="center">Previous Courses</h1>
        <p class="full"><strong>Please select ALL previous courses you have taken and leave empty any groups that you have not fufilled for your AA. Any extra courses can be selected at the bottom of this page as electives.</strong></p>
        </div>
            {{#each aaCourses: row}}
                
                {{#if (isStr(aaCourses[row][0]))}}
                <fieldset>
                    
                    <legend>{{nameSelected[row][0]}} :</legend>
                    
                    {{#each aaCourses[row]:column}}
                    
                        {{#if (isStr(aaCourses[row][column]))}}
                        
                            <div class="checkRow">
                            <label class="label--checkbox" for="{{aaCourses[row][column]+''+row}}">
                            <input type="checkbox" class="checkers" data-name="{{nameSelected[row][0]}}" id="{{aaCourses[row][column]+''+row}}" data-row="{{row}}" data-id="{{aaCourses[row][column]}}">
                            
                                {{aaCourses[row][column]}} - {{finder(aaCourses[row][column],'name')}} - ({{finder(aaCourses[row][column],"cred")}} Credits)
                            </label>
                            </div>
                        
                        {{else}}<!--not used-->
                        
                            <select name="{{nameSelected[row][0]}}" class="select" data-row="{{row}}"  data-id="{{aaCourses[row][column]}}">
                                <option value="" selected>{{aaCourses[row][column][0].slice(0,3)}}* - Not Selected</option>
                                {{#each aaCourses[row][column]:option}}
                                
                                    <option value="{{aaCourses[row][column][option]}}">{{aaCourses[row][column][option]+' - '+finder(aaCourses[row][column][option],'name')+' - ('+finder(aaCourses[row][column][option],'cred')}} Credits)</option>
                                
                                {{/each}}
                            
                            </select>
                        
                        {{/if}}
                    
                    {{/each}}
                    
                </fieldset>
                
                {{else}}
                
                    {{#each aaCourses[row]: group}}
                    
                        <fieldset>
                            <legend>{{nameSelected[row][group*2]}} :</legend>
                            
                            {{#each aaCourses[row][group]: column}}
                            
                                        {{#if (isStr(aaCourses[row][group][column]))}}

                                    <div class="checkRow">
                                        <label class="label--checkbox" for="{{row+""+aaCourses[row][group][column]}}">
                                        
                                        <input type="checkbox" class="checkers" data-name="{{nameSelected[row][group*2]}}" id="{{row+""+aaCourses[row][group][column]}}" data-row="{{row}}" data-group="{{group}}" data-id="{{aaCourses[row][group][column]}}">
                                        
                                        {{aaCourses[row][group][column]}} - {{finder(aaCourses[row][group][column],'name')}} - ({{finder(aaCourses[row][group][column],"cred")}} Credits)
                                        </label>
            </div>

                                {{else}}<!--not used-->

                                    <select name="{{nameSelected[row][group*2]}}" data-row="{{row}}" data-group="{{group}}" class="select" data-id="{{aaCourses[row][group][column]}}">
                                    <option value="" selected>{{aaCourses[row][group][column][0].slice(0,3)}}* - Not Selected</option>
                                        {{#each aaCourses[row][group][column]:option}}

                                            <option value="{{aaCourses[row][group][column][option]}}">{{aaCourses[row][group][column][option]+' - '+finder(aaCourses[row][group][column][option],'name')+' - ('+finder(aaCourses[row][group][column][option],'cred')}} Credits)</option>

                                        {{/each}}

                                    </select>

                                {{/if}}
                            
                            {{/each}}
                            
                        </fieldset>    
                    
                    {{/each}}
                
                {{/if}}
            {{/each}}
            
            <div class="electives">
                <fieldset>
                    <legend>{{nameSelected[nameSelected.length-1][0]}} :</legend>
                        <label for="electives" class="block">Search for any electives you have taken :</label>
                        
                        <input type="text" id="electives">
                        
                        <div id="resulter"></div>
                        
                        {{#if nameSelected[nameSelected.length-1][1].length}}
                            {{#each nameSelected[nameSelected.length-1][1]:i}}
                                <div class="electiveRow">
                                    <p>
                                {{nameSelected[nameSelected.length-1][1][i]}} - {{finder(nameSelected[nameSelected.length-1][1][i],'name',true)}} - ({{finder(nameSelected[nameSelected.length-1][1][i],'cred',true)}} Credits)
                                    </p>
                                    
                                <span on-tap="delete:{{i}}" class="electiveDel">X</span>
                                
                                </div>
                            {{/each}}
                        {{else}}
                            <p>You have not selected any electives...</p>
                            <p>You can select them by typing its Course ID/Course Title in the search box above.</p>
                        {{/if}}
                        
                </fieldset>
            </div>
            <button class="ripple right navigate" data-to="2" data-current="1">Next</button>
            <!--Need to put some margin here for scroll on input focus for small screens-->
        </div>
        <div id="step2" class="display hidden wrap">
            
            <!--<p class="full">So we will need to collect a little more info to choose a good course for you. this will be for answering some questions about how comfortable you are in subjects that you have yet to complete for your AA.</p>
            <label for="mathInp">How comfortable are you with Math?<span class="right">{{comfort.level[comfort.math]}}</span><input type="range" min="0" max="5" id="mathInp" value="{{comfort.math}}"></label>-->
            <h2 class="center">Best courses to take based upon your AA Selections</h2>
            <p>Based on the selections you chose in the previous screen, the algorithm (based on all courses that you are able to take and sorted by how many credits it provides as well as how many categories it fulfills) picked these course specifically for you to be able to complete your AA. Courses that would help you the most are at the highest ranked.</p>
            <div class="posCourses">
            <ol>
            {{#each needed():course}}
                <li class="posCourse">
                    <a href='display.php?Term={{getSelect()[0]}}&campusWanted={{getSelect()[1]}}&lookup={{finder(this,'num')}}' >
                    {{course+1}}.) {{finder(this,'name')}} - {{this}} ({{finder(this,'cred')}} Credits)
                    </a>
                </li>
            {{/each}}
            </ol>
            </div>
            <button class="ripple left navigate" data-to="1" data-current="2">Back</button>
            <button class="ripple right navigate" data-to="3" data-current="2">Next</button><br><br>
        </div>
        <div id="step3" class="display hidden wrap">
        <h1 class="center">AA Progress</h1>
            <p class="full">You can click on any course in order to see more info of the course. The courses that you indicated that you have taken are displayed grayed out and tabbed in for easy locating.</p>
            
            {{#each aaCourses: cat}}
                {{#if (isStr(this[0]))}}
                    <div class="fufillmentSect">
                        {{>fufillmentTitle}}
                        <ul class="fufillment">
                            {{#each aaCourses[cat]:i}}
                                {{#if Array.isArray(this)}}
                                    {{#each aaCourses[cat][i]:cor}}
                                        {{>displayCourse}}
                                    {{/each}}
                                {{else}}
                                    {{>displayCourse}}
                                {{/if}}
                            {{/each}}
                        </ul>
                    </div>
                {{else}}
                    {{#each aaCourses[cat]: group}}
                    <div class="fufillmentSect">
                        {{>fufillmentTitle}}
                        <ul class="fufillment">
                        {{#each aaCourses[cat][group]:i}}
                            {{#if Array.isArray(this)}}
                                {{#each aaCourses[cat][group][i]:cor}}
                                    {{>displayCourse}}
                                {{/each}}
                            {{else}}
                                {{>displayCourse}}
                            {{/if}}
                            {{/each}}
                        </ul>
                    </div>
                    {{/each}}
                {{/if}}
            {{/each}}
            
            {{#partial displayCourse}}
                <li class="fufillmentLi {{(nameSelected[cat][group||group==0?((group*2)+1):1].indexOf(this)>-1)?'isSelected' : 'notSelected'}} ">
                    <a href='display.php?Term={{getSelect()[0]}}&campusWanted={{getSelect()[1]}}&lookup={{finder(this,'num')}}' >
                    {{finder(this,'name')}} - {{this}} ({{finder(this,'cred')}} Credits)
                    </a>
                </li>
            {{/partial}}

            {{#partial fufillmentTitle}}
            <h2>
                {{group||group==0 ? nameSelected[cat][((group*2))].slice(0,-22) : nameSelected[cat][0].slice(0,-12) }}
                
                {{group||group==0?'(Group '+(group==0?'A':'B')+')':''}}
                
                is 
                
                {{compl(cat,group||group==0?(group*2)+1:1)?'':'not'}}
                
                fufilled!
            </h2>
            {{/partial}}
            
            <button class="ripple left navigate" data-to="2" data-current="3">Back</button>
            <br><br><br>
            </div>
        </div>
        </script>
        
        <script id="cart" type="text/ractive">
        
            <div class="wrap cartcl">
                <h1 class="center">Saved Courses</h1>
                {{#if inCart.length}}
                <div class="courses">
                <table>
                <thead><tr><th>Course</th><th>Reference Num</th><th>Proffesor</th><th>Days</th><th>Times</th><th>Room #</th><th>Seats available</th><th>Delete?</th></tr></thead>
                <tbody>
                
                {{#each inCart:i}}
                
                    <tr class="itm added">
                        {{#if prevIs(i)}}
                        {{else}}
                        <td class="subject smaller" rowspan={{howManyAft(i)}}>{{inCart[i].courseId}}</td>
                        {{/if}}
                        <td>{{inCart[i].ref}}</td>
                        <td>{{inCart[i].prof}}</td>
                        <td>{{inCart[i].days}}</td>
                        <td>{{inCart[i].times}}</td>
                        <td>{{inCart[i].room}}</td>
                        <td>{{inCart[i].space}}</td>
                        <td><span on-tap="delete:{{i}}" class="itmDel">X</span></td>
                    </tr>
                
                {{/each}}
                </tbody>
                </table>
                </div>
                {{else}}
                    <p>You haven't selected any Courses Yet!</p>
                    <p>To select a course just open the course info and click on the "Save This Course" button on the individual class you want.</p>
                {{/if}}
            </div>
        
        </script>
        
        <script id="what" type='text/ractive'>
            <div class="options">
                <div class="select">
                    <label for="Term">
                        Select your Term
                    </label>

                    <select name="Term" id="Term" value="{{select[0]}}">


                        {{#each selectTerm: option}}

                        <option value="{{selectTerm[option][0]}}" {{selectTerm[option][0]==select[0]? 'selected': ''}}>{{selectTerm[option][1]}}</option>

                        {{/each}}


                    </select>
                    <button href="#hook" id='pick'><svg version="1.1" id="pickIco" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="32.5 32.94 35 35" style="enable-background:new 32.5 32.94 35 35;" xml:space="preserve">
<path style="fill:#3B6497;" d="M50,32.94c-9.649,0-17.5,7.851-17.5,17.5c0,9.648,7.851,17.5,17.5,17.5c9.648,0,17.5-7.852,17.5-17.5
	C67.5,40.791,59.648,32.94,50,32.94 M50,64.939c-7.995,0-14.5-6.506-14.5-14.5c0-7.995,6.505-14.5,14.5-14.5s14.5,6.505,14.5,14.5
	C64.5,58.436,57.995,64.939,50,64.939"/>
<path style="fill:#3B6497;" d="M58.925,44.875c-0.649-0.516-1.592-0.407-2.106,0.242l-6.902,8.703l-4.131-4.405
	c-0.565-0.605-1.515-0.635-2.12-0.069c-0.604,0.567-0.635,1.515-0.068,2.12l5.319,5.675c0.284,0.303,0.681,0.475,1.094,0.475
	c0.021,0,0.041,0,0.062-0.001c0.436-0.019,0.843-0.226,1.114-0.566l7.983-10.066C59.684,46.333,59.574,45.39,58.925,44.875"/>
</svg>Pick a Class for me!</button>
                </div>


                <div class="select">

                    <label for="CAMPUS">
                        Select your campus
                    </label>


                    <select name="campusWanted" value="{{select[1]}}">

                        {{#each selectCampus: option}}

                        <option value="{{selectCampus[option]==selectCampus[selectCampus.length-1]?'33':(option*10)}}0" {{selectCampus[option]==select[1]? 'selected': ''}}>{{selectCampus[option]}}</option>

                        {{/each}}

                    </select>
                    
                    <button href="#carter" id='cartbtn'><svg version="1.1" id="cartIco" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
	 y="0px" viewBox="290.492 736.939 33.016 35.002"
	 style="enable-background:new 290.492 736.939 33.016 35.002;" xml:space="preserve">
<path style="fill:#3B6497;" d="M318.145,745.305c-0.828,0-1.5,0.672-1.5,1.5v23.637c0,0.827,0.672,1.5,1.5,1.5
	c0.83,0,1.5-0.673,1.5-1.5v-23.637C319.645,745.977,318.975,745.305,318.145,745.305"/>
<path style="fill:#3B6497;" d="M322.008,749.98c-0.829,0-1.5,0.672-1.5,1.5v18.96c0,0.827,0.671,1.5,1.5,1.5s1.5-0.673,1.5-1.5
	v-18.96C323.508,750.652,322.837,749.98,322.008,749.98"/>
<path style="fill:#3B6497;" d="M307.422,747.091h-9.18c-0.829,0-1.5,0.672-1.5,1.5c0,0.827,0.671,1.5,1.5,1.5h9.18
	c0.828,0,1.5-0.673,1.5-1.5C308.922,747.763,308.25,747.091,307.422,747.091"/>
<path style="fill:#3B6497;" d="M307.422,752.94h-9.18c-0.829,0-1.5,0.672-1.5,1.5c0,0.826,0.671,1.5,1.5,1.5h9.18
	c0.828,0,1.5-0.674,1.5-1.5C308.922,753.612,308.25,752.94,307.422,752.94"/>
<path style="fill:#3B6497;" d="M304.54,758.79h-6.146c-0.828,0-1.5,0.672-1.5,1.5c0,0.827,0.672,1.5,1.5,1.5h6.146
	c0.828,0,1.5-0.673,1.5-1.5C306.04,759.462,305.368,758.79,304.54,758.79"/>
<path style="fill:#3B6497;" d="M312.136,736.939H293.82c-1.835,0-3.328,1.492-3.328,3.327v28.346c0,1.835,1.493,3.327,3.328,3.327
	h18.315c1.836,0,3.329-1.492,3.329-3.327v-28.346C315.465,738.433,313.973,736.939,312.136,736.939 M312.465,768.612
	c0,0.181-0.146,0.327-0.329,0.327H293.82c-0.181,0-0.328-0.146-0.328-0.327v-28.346c0-0.18,0.147-0.327,0.328-0.327h18.315
	c0.182,0,0.329,0.147,0.329,0.327L312.465,768.612L312.465,768.612z"/>
</svg>View Saved Courses</button>
                    
                </div>
                
        </div>
        {{#if course.length}} 
    
      
        <table class='superheroes persist-area'>
            <thead><tr class="persist-header">
        <th class='sortable subjec {{ sortColumn === "subject" ? "sorted" : "" }}' onclick="ractive.get('ssort')('subject')">
          Subject
        </th>

        <th class='sortable nam {{ sortColumn === "name" ? "sorted" : "" }}'  onclick="ractive.get('ssort')('name')">
            Course Title
        </th>

        <th class='sortable nu {{ sortColumn === "num" ? "sorted" : "" }}'  onclick="ractive.get('ssort')('num')">
          Course ID
        </th>
        </tr>
      </thead>
      <tbody>
            {{#each course: nummy}}
            
            <tr class="link{{(nummy>0&&priorIsSubj(nummy,subject,course))?'':' bTop'}}">
            
              {{#if (nummy>0&&priorIsSubj(nummy,subject,course))}}
                {{else}}
                <td class="subject" rowspan="{{howMany(nummy,subject)}}"><a href='display.php?Term={{select[0]}}&campusWanted={{select[1]}}&lookup={{num}}' class="linky">{{subject}}</a></td>
                {{/if}}
              
              <td class="title"><a href='display.php?Term={{select[0]}}&campusWanted={{select[1]}}&lookup={{num}}' class="linky">{{name}}</a></td>
              
              <td><a href='display.php?Term={{select[0]}}&campusWanted={{select[1]}}&lookup={{num}}' class="linky">{{num}}</a></td>
              
            </tr>
            
          {{/each}}
          </tbody>
        </table>
      {{else}}
        <p class="center">Sorry no results for that search...</p>
      {{/if}}

    </script>
        <script src="scripts/jquery-1.7.2.min.js"></script>
		<script src='http://cdn.ractivejs.org/latest/ractive.js'></script>
		<script src="scripts/ractive-events-tap.js"></script>
		<script src="scripts/jquery.waypoints.min.js"></script>
		<script src="scripts/sticky.min.js"></script>
		<script src="scripts/jquery.autocomplete.min.js"></script>
		<script src="scripts/featherlight.min.js" type="text/javascript" charset="utf-8"></script>
		<script>
    var courses= [<?php 
include 'includes/database.php';

$str="";

foreach($db->query('SELECT * FROM courses') as $row) {
	$str.='{subject:"'.str_replace(array("\r", "\n"), ' ', $row['Discipline']).'",num:"'
        .str_replace(array("\r", "\n", "'"), ' ', $row['MDC Course Number']).'",name:"'
        .str_replace(array("\r", "\n", "'"), ' ', $row['Course Title']).'",courseReq:"'
        .str_replace(array("\r", "\n", "'"), ' ', $row['Pre-requisite']).'",cred:"'
        .str_replace(array("\r", "\n", "'"), ' ', $row['Colege Credits']).'"},
        ';
}
echo substr($str, 0, -1);;

 ?>];
            
    </script>
    
    <script src="scripts/scripts.js"></script>
    </body>
    
</html>