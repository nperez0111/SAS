var ractive = null,
    aa = null,
    date = new Date(),
    aaC = [
        ["ENC1101", "ENC1102"],
        ["LIT2480", "SPC1017"],
        [
            ["ARC2701", "ARH1000", "ARH2050", "DAN2100", "HUM1020", "MUL1010", "PHI2604"],
            ["ARC2702", "ARH2051", "ARH2740", "DAN2130", "LIT2120", "MUL2380", "PHI2010", "THE2000"]
        ],
        //[
        [
            "ANT2410", "DEP2000", "ISS1161", "PSY2012", "CLP1006", "SYG2000"
        ],
        /*
                ["AMH2010", "AMH2020", "ISS1120", "POS2041", "WOH2012", "WOH2022"] Group B fufilled by APUSH and Macro
            ],
        */
        [
            [
                "BOT1010", "BSC1005", "BSC1050", "BSC1084", "BSC2010", "BSC2085", "BSC2250", "HUN1201", "OCB1010", "ZOO1010"
            ],
            [
                "AST1002", "CHM1020", "CHM1025", "CHM1033", "CHM1045", "CHM1046", "CHM2210", "GLY1010", "MET1010", "OCE1001", "PHY1004", "PHY1005", "PHY1025", "PHY2048", "PHY2049", "PHY2053", "PHY2054", "PSC1121", "PSC1515"
            ]
        ],
        [
            "MAD2104", "MAC1105", "MAC1114", "MAC1140", "MAC1147", "MAC2311", "MAC2312", "MAC2313", "MAC2233", "MAP2302", "MAS2103", "MGF1107", "MGF1106", "QMB2100", "STA2023"
        ],
        [

            "AST1002", "BOT1010", "BSC1005", "BSC1050", "BSC1084", "BSC2010", "BSC2011", "BSC2085", "BSC2086", "BSC2250", "CHM1020", "CHM1025", "CHM1033", "CHM1045", "CHM1046", "CHM2210", "GLY1010", "MET1010", "OCE1001", "PHY1004", "PHY1005", "PHY1025", "PHY2048", "PHY2049", "PHY2053", "PHY2054", "PSC1121", "PSC1515", "ZOO1010", "HUN1201", "MAC1105", "MAC1140", "MAC2313", "MAC2312", "MAC2311", "MAC2233", "MAC1147", "MAC1114", "MAD2104", "MAP2302", "MAS2103", "MGF1107", "MGF1106", "QMB2100", "STA2023", "ASL2160C", "ASL2200C", "ACG2021", "AMH2010", "AMH2020", "ANT2410", "ARC2701", "ARH1000", "ARH2050", "COP2270", "CIS1000", "COP1332", "COP1334", "DEP2000", "GEO2420", "HLP1080", "HLP1081", "HSC2400", "HUM1020", "ISS1120", "ISS1161", "ISS2270", "MUL1010", "PHI2604", "CLP1006", "POS2041", "POS2112", "PSY2012", "REL2300", "SYG2000", "WOH2012", "WOH2022"

        ],
        ["CGS1060"],
        ["ASL1150C", "CHI1121", "FRE1121", "GER1121", "ITA1121", "JPN1121", "POR1121", "SPN1121"],
        ["SLS1510"]
    ];
//aaCourse is arr of arrs which if is not a string it is an array which contains strings of courses that are tied together and would be in a select box if displayed

function UpdateTableHeaders() {
    /*$(".persist-area").each(function() {
        console.log('ran');
        var el = $(this),
            offset = el.offset(),
            scrollTop = $(window).scrollTop(),
            floatingHeader = $(".floatingHeader", this);

        if ((scrollTop > offset.top) && (scrollTop < offset.top + el.outerHeight())) {
            floatingHeader.css({
                "visibility": "visible"
            });
        } else {
            floatingHeader.css({
                "visibility": "hidden"
            });
        }*/
    //to not do it on each scroll
    if (!ractive.get('reset')) {
        $(".persist-area").each(function() {

            var floatingHeader = $(".floatingHeader", this);

            $(this).waypoint(function(direction) {

                if (direction === 'down') {
                    floatingHeader.css({
                        "visibility": "visible"
                    });
                    //console.log('went down');
                }
                if (direction === 'up') {
                    floatingHeader.css({
                        "visibility": "hidden"
                    });
                    //console.log('went up');
                }

            });

        });
        $('.subject').each(function(i) {
            $(this).waypoint(function(direction) {
                if (direction === 'down') {
                    // Do stuff
                    $('.floatSub').remove();
                    if (i === $('.subject').length - 1) {
                        return;
                    }
                    $('body').append('<div class="floatSub"><div class="swrap"><span class="tleft">Subject</span><span class="tright">' + $($('.subject')[i]).text() + '</span></div></div>');
                }
                if (direction === 'up') {
                    // Do stuff
                    $('.floatSub').remove();
                    if (i === 0) {
                        return;
                    }
                    $('body').append('<div class="floatSub"><div class="swrap"><span class="tleft">Subject</span><span class="tright">' + $($('.subject')[i - 1]).text() + '</span></div></div>');
                }
            }, {
                offset: 0
            });
        });
        ractive.set('reset', true);
    }

    //});
}


$(document).ready(function() {
    ractive = new Ractive({
        el: 'table',
        template: '#what',
        data: {
            course: courses,
            sort: function(array, column) {
                array = array.slice(); // clone, so we don't modify the underlying data
                if (array.length == ractive.get('course').length && ractive.get('lastSortedBy') == column) {
                    //this is to not repeatedly sort if its the same set of results
                    return ractive.get('course');
                }
                ractive.set('lastSortedBy', column);
                return array.sort(function(a, b) {
                    return a[column] < b[column] ? -1 : 1;
                });
            },
            sortColumn: 'num',
            lastSortedBy: '',
            priorIsSubj: function(index, curSubj, course) {
                return index <= course.length ? curSubj ? course[index - 1].subject.toLowerCase() == curSubj.toLowerCase() : false : false;
            },
            reset: false,
            select: [date.getMonth() + 1 > 2 && date.getMonth() + 1 < 6 ? (date.getFullYear() - 1) + "-3%2BSummer%2B%2B" + date.getFullYear() : date.getMonth() + 1 > 5 && date.getMonth() + 1 < 10 ? date.getFullYear() + "-1%2BFall%2B%2B" + date.getFullYear() : date.getFullYear() + "-2%2BSpring%2B%2B" + (date.getFullYear() + 1), '200'],
            selectTerm: [
                [(date.getFullYear() - 1) + "-3%2BSummer%2B%2B" + date.getFullYear(), "Summer A/B"],
                [date.getFullYear() + "-2%2BSpring%2B%2B" + (date.getFullYear() + 1), "Spring"],
                [date.getFullYear() + "-1%2BFall%2B%2B" + date.getFullYear(), "Fall"]
            ],
            selectCampus: ['All Campuses', 'North', 'Kendall', 'Wolfson', 'Medical', 'Homestead', 'Inter American', 'Hialeah', 'West', 'Virtual'],
            howMany: function(index, curSubj) {
                var c = 0;
                for (var l = this.get('course').length, i = index; i < l; i++) {
                    if (this.get('priorIsSubj')(i + 1, curSubj, this.get('course'))) {
                        c++;
                    } else {
                        break;
                    }
                }
                return c;
            },
            cache: {
                set: function(prop, val) {
                    this[prop] = val;
                    this.arr.push(prop);
                },
                get: function(prop) {
                    return this[prop] || null;
                },
                arr: [],
                clear: function() {
                    for (var key in this.arr) {
                        this[key] = null;
                    }
                    this.arr = [];
                }
            },
            ssort: function(column) {
                $('.' + ractive.get('sortColumn').slice(0, -1)).removeClass('sorted');
                $('.' + column.slice(0, -1)).addClass('sorted');
                ractive.set('sortColumn', column);
                ractive.set('course', ractive.get('sort')(ractive.get('course'), column));
                if (!ractive.get('reset')) {
                    ractive.set('reset', true);
                }
                ractive.update();
            }

        }
    });
    ractive.on('sort', function(event, column) {
        console.log('sorting...');
        this.set('sortColumn', column);
        //console.log(this.get('sort')(this.get('course'), column));
        this.set('course', this.get('sort')(this.get('course'), column));
        if (!ractive.get('reset')) {
            ractive.set('reset', true);
        }
    });

    /*var sticky = new Waypoint.Sticky({
        element: $('.header')[0]
    });*/
    $("#search").keyup(debounce(searchPlease, 300));

    /*$(".link").click(function() {

        $.ajax({ //create an ajax request to load_page.php
            type: "GET",
            url: ("display.php?q=" + $(this).attr('data-courseId')),
            dataType: "html", //expect html to be returned                
            success: function(response) {
                //$("#responsecontainer").html(response); 
                alert(response);
            }

        });
    });*/


    /*$('label').click(function(event) {
        if ($(this).prop("for")) {

            var checkbox = $(("#" + $(this).prop("for"))),
                bool = $(checkbox).prop('checked'),
                nam = $(checkbox).data("name") ? $(checkbox).data("name") : $(checkbox).prop("name");

            $("input:checkbox[name='" + nam + "']").prop('checked', false);

            $(checkbox).prop('checked', !bool);

            $("select[name='" + $(checkbox).prop("name") + "']").val("");

            event.preventDefault();
            return false;
        }
    });*/

    ractive.on('complete', function() {
        var clonedHeaderRow;

        $(".persist-area").each(function() {
            clonedHeaderRow = $(".persist-header", this);
            clonedHeaderRow
                .before(clonedHeaderRow.clone())
                .addClass("floatingHeader");
            $('.floatingHeader .sortable').each(function(i) {
                var test = ['.subject', '.title', 'tr td:last-child'];
                $(this).css("width", $(test[i]).eq(0).outerWidth() + 'px');
            });

        });
        window.addEventListener("scroll", function(event) {
            debounce(UpdateTableHeaders(), 400);
        });
        window.addEventListener('resize', function(event) {
            debounce(function() {
                $('.floatingHeader .sortable').each(function(i) {
                    var test = ['.subject', '.title', 'tr td:last-child'];
                    $(this).css("width", $(test[i]).eq(0).outerWidth() + 'px');
                });
                $('.floatingHeader').each(function(i) {
                    $(this).css({
                        "width": $($('.persist-header').get(i)).width() + "px"
                    });
                });
                $("label[for='Term']").height($("label[for='CAMPUS']").height());
            }, 400)
        });

        $('#pick').featherlight({
            targetAttr: 'href',
            afterOpen: function(event) { //fi
                $('.realwrap').remove();
                aa.insert($('.featherlight-content'));
                forPick();
                $('html, body').addClass('noscroll');
                $('#hook').removeClass('hidden');
            },
            afterClose: function(event) {
                $('html, body').removeClass('noscroll');
                $('#hook').addClass('hidden');
                aa.insert($('#hook'));
                /*$('.featherlight-content').empty();*/
            }
        });
        $('#cartbtn').featherlight({
            targetAttr: 'href',
            afterOpen: function(event) { //fi
                $('.cartcl').remove();
                cart.insert($('.featherlight-content'));
                $('html, body').addClass('noscroll');
                $('#carter').removeClass('hidden');

            },
            afterClose: function(event) {
                $('html, body').removeClass('noscroll');
                $('#carter').addClass('hidden');
                cart.insert($('#carter'));
            }
        });
        $('.linky').featherlight({
            targetAttr: 'href',
            afterOpen: function(event) {
                $('html, body').addClass('noscroll');
                $('.floatSub, .floatingHeader').css('visibility', 'hidden');
                addButtonEv();
            },
            afterClose: function(event) {
                $('html, body').removeClass('noscroll');
                UpdateTableHeaders();
            }
        });

    });
    /*$('.ripple').on('click', function(event) {


        var $div = $('<div></div>'),
            btnOffset = $(this).offset(),
            xPos = event.pageX - btnOffset.left,
            yPos = event.pageY - btnOffset.top;



        $div.addClass('ripple-effect');
        var $ripple = $(".ripple-effect");

        $ripple.css({
            height: $(this).height(),
            width: $(this).height()
        });
        $div
            .css({
                top: yPos - ($ripple.height() / 2),
                left: xPos - ($ripple.width() / 2),
                background: $(this).data("ripple-color")
            })
            .appendTo($(this));

        window.setTimeout(function() {
            $div.remove();
        }, 2000);
    });*/
    aa = new Ractive({
        el: 'hook',
        template: '#aa',
        data: {
            aaCourses: aaC,
            nameSelected: [
                ["Communications (6 Credits)", []],
                ["Oral Communications (3 Credits)", []],
                ["Humanities (Group A [3 Credits])", [], "Humanities (Group B [3 Credits])", []],
                ["Behavioral/Social Sciences (3 Credits)", [] /*, "Behavioral/Social Sciences (Group B [3 Credits])", []*/ ],
                ["Natural Sciences (Group A [3 Credits])", [], "Natural Sciences (Group B [3 Credits])", []],
                ["Mathematics (6 Credits)", []],
                ["General Education Elective (3 Credits) ", []],
                ["Computer Competency (4 Credits)", []],
                ["Foreign Language Competency (4 Credits)", []],
                ["First Year Experience Seminar (3 Credits)", []],
                ["Electives (24 Credits)", []]
            ],
            isStr: function(pos) {
                return jQuery.type(pos) == "string";
            },
            rmvSpaces: function(str) {
                return str.replace(/\s+/g, '');
            },
            finder: function(courseId, what, suppressWarning) {
                //find props of obj by course id
                var c = courses;
                for (var i = c.length - 1; i; i--) {
                    if (c[i].num == courseId) {
                        return c[i][what];
                    }
                }
                suppressWarning ? true : console.warn("Could not find property %s within:%s", what, courseId);
                return "Could not find Property";
            },
            compl: function(category, group) {
                //console.log(category + ':' + group);
                var amntOfCred = [
                        6, 3, [3, 3],
                        3, [3, 3], 6, 3, 4, 4, 3
                    ],
                    cater = aa ? aa.get('nameSelected')[toInt(category)][toInt(group)] : [],
                    finder = aa ? aa.get('finder') : function(a, b) {
                        return 0;
                    },
                    count = 0;
                //console.log(cater);
                if (cater.length > 0) {
                    for (var i = 0, l = cater.length; i < l; i++) {
                        //console.log(finder(cater[i], 'cred'));
                        count += toInt(finder(cater[i], 'cred'));
                    }
                } else {
                    return false;
                }
                //console.log(Array.isArray(amntOfCred[category]) ? count >= amntOfCred[category][(group - 1) / 2] : count >= amntOfCred[category]);
                return Array.isArray(amntOfCred[category]) ? count >= amntOfCred[category][(group - 1) / 2] : count >= amntOfCred[category];

            },
            comfort: {
                math: 0,
                science: 0,
                level: ['It gives me the Heebee-Jeebees', 'Ehhhhhhh and ughhhh', "I can do it?", 'Neither here or there', 'Pretty good about it', 'I practically invented it']
            },
            posCourse: (aa ? aa.get('needed')() : []),
            needed: function() {
                var listOfNeededClasses = [],
                    isCompleted = function(courseId) {

                        for (var i = 0, c = 1, names = aa ? aa.get('nameSelected') : [], finder = aa ? aa.get('finder') : 'None', l = names.length - 1, completed = aa ? aa.get('compl') : true, isArray = false; i < l; i++) {

                            if (names[i].length > 2 && isArray === false) {

                                isArray = true;

                            } else if (names[i].length > 2 && isArray === null) {

                                c += 2;

                            }

                            //to handle the arrays
                            //console.log('%s : %s', i, c);
                            //console.log(names[i][c]);
                            for (var curcourse in names[i][c]) {

                                //console.log(names[i][c][curcourse]);
                                if (names[i][c][curcourse] == courseId) {

                                    return true;

                                }

                            }
                            //to handle the arrays
                            if (isArray) {

                                i -= 1;
                                isArray = null;

                            } else if (isArray === null) {

                                c -= 2;
                                isArray = false;

                            }

                        }

                        return false;

                    },
                    test = function(course) {
                        if (finder(course, 'courseReq') == 'None') {

                            //if no course PreReq add it
                            //console.log(finder(course, 'courseReq'));
                            return true;

                        } else if (finder(course, 'courseReq').length < 9 && isCompleted(finder(course, 'courseReq'))) {

                            // if course Prereq is a single one and is fufilled then add it
                            //console.log(finder(course, 'courseReq'));
                            return true;


                        } else {

                            if (finder(course, 'courseReq').split(' or ').length == 1) {

                                //if its not an or one(two choice) then attempt to extract it via its ', '

                                var arr = finder(course, 'courseReq').split(' , '),
                                    comp = true;

                                if (arr.length) {
                                    //console.log(arr);
                                    for (var preReq = 0; preReq < arr.length; preReq++) {

                                        if (!isCompleted(arr[preReq])) {

                                            comp = false;

                                        }

                                    }
                                    //console.log(comp);
                                    if (comp) {
                                        //console.log(finder(course, 'courseReq'));
                                        return true;

                                    }
                                }
                            } else {
                                var arr = finder(course, 'courseReq').split(' or '),
                                    comp = false,
                                    arrOfComp = [];

                                //if its an or one or if it is something else just add it by default

                                if (arr.length > 0) {
                                    //console.log(arr);
                                    for (var posCourse in arr) {
                                        if (arr[posCourse].length > 9) {
                                            arr[posCourse] = arr[posCourse].split(' , ');
                                            var newComp = true;
                                            for (var innerCourse in arr[posCourse]) {
                                                if (!isCompleted(arr[posCourse][innerCourse])) {
                                                    newComp = false;
                                                }
                                            }
                                            arrOfComp.push(newComp);
                                        } else if (isCompleted(arr[posCourse])) {
                                            arrOfComp.push(newComp);
                                        }
                                    }

                                    for (var tester in arrOfComp) {
                                        if (arrOfComp[tester]) {
                                            //console.log('was set to true?')
                                            comp = true;
                                        }
                                    }

                                }
                                if (comp) {
                                    //console.log(finder(course, 'courseReq'));
                                    return true;
                                }

                            }
                        }
                        return false;
                    };



                for (var i = 0, c = 1, names = aa ? aa.get('nameSelected') : [], finder = aa ? aa.get('finder') : 'None', l = names.length - 1, completed = aa ? aa.get('compl') : true, isArray = false; i < l; i++) {

                    if (names[i].length > 2 && isArray === false) {

                        isArray = true;

                    } else if (names[i].length > 2 && isArray === null) {

                        c += 2;

                    }
                    //to handle the arrays

                    if (!completed(i, c)) {
                        //console.log(i + ':' + c);

                        for (var course = 0, allCourses = aa ? aa.get('aaCourses') : [], allCoursesLength = isArray === false ? allCourses[i].length : allCourses[i][c == 1 ? 0 : 1].length; course < allCoursesLength; course++) {

                            if (isArray === false && listOfNeededClasses.indexOf(allCourses[i][course]) == -1 && !isCompleted(allCourses[i][course])) {

                                //console.log('length at %s and cur index of %s with val %s', allCoursesLength, course, allCourses[i][course]);
                                if (!aa.get('compl')(i, 1) && test(allCourses[i][course])) {
                                    listOfNeededClasses.push(allCourses[i][course]);
                                }


                            } else if ((isArray === true || isArray === null) && listOfNeededClasses.indexOf(allCourses[course]) == -1) {

                                //console.log('length at %s and cur index of %s with val %s', allCoursesLength, course, allCourses[i][course]);
                                if (!aa.get('compl')(i, ((c == 1 ? 0 : 1) * 2) + 1) && test(allCourses[i][c == 1 ? 0 : 1][course])) {
                                    listOfNeededClasses.push(allCourses[i][c == 1 ? 0 : 1][course]);
                                }

                            }

                        }

                    }

                    //to handle the arrays
                    if (isArray) {

                        i -= 1;
                        isArray = null;

                    } else if (isArray === null) {

                        c -= 2;
                        isArray = false;

                    }

                }


                var map = [],
                    result = [],
                    /*
                                        categories = function(courseId) {
                                            var count = 0;
                                            for (var r = 0, list = aa ? aa.get('aaCourses') : [], rL = list.length; r < rL; r++) {

                                                if (Array.isArray(list[r][0])) {

                                                    for (var c = 0, cL = list[r].length; c < cL; c++) {

                                                        for (var curcourse in list[r][c]) {

                                                            if (list[r][c][curcourse] == courseId) {

                                                                count++;

                                                            }

                                                        }

                                                    }

                                                } else {

                                                    for (var c = 0, cL = list[r].length; c < cL; c++) {

                                                        if (list[r][c] == courseId) {

                                                            count++;

                                                        }

                                                    }

                                                }
                                            }
                                            return count;
                                        },*/
                    preReqed = function(courseId) {
                        var c = courses,
                            count = 0;
                        for (var i = c.length - 1; i; i--) {
                            var Req = c[i].courseReq;
                            if (Req == courseId) {
                                count++;
                            } else if (Req.length > 9) {
                                for (var arr = Req.split(', '), pos = 0; pos < arr.length; pos++) {
                                    if (arr[pos] == courseId) {
                                        count++;
                                    }
                                }
                            }
                        }
                        //console.log(count + ':' + courseId);
                        count += aa ? (aa.get('itFulfills')(courseId).length * 2) + 1 : 0;
                        //console.log(count + ':' + courseId);
                        return count;
                    };
                for (var i = 0, length = listOfNeededClasses.length; i < length; i++) {
                    map.push({
                        index: i, // remember the index within the original array
                        value: preReqed(listOfNeededClasses[i]) // evaluate the element to count how many times it was used as a preReq
                    });
                }
                // sorting the map containing the reduced values
                map.sort(function(a, b) {
                    return a.value < b.value ? 1 : -1;
                });
                // copy values in right order
                for (var i = 0, length = map.length; i < length; i++) {
                    result.push(listOfNeededClasses[map[i].index]);
                }
                //before return need to further sort and filter values
                return result;
            },
            itFulfills: function(courseId) {
                var arr = [];
                for (var i = 0, c = 0, coursesThatFulfill = aa ? aa.get('aaCourses') : [], name = aa ? aa.get('nameSelected') : 'None', l = coursesThatFulfill.length - 1, isArray = false; i < l; i++) {
                    if (coursesThatFulfill[i].length == 2 && isArray === false) {
                        isArray = true;
                    } else if (coursesThatFulfill[i].length == 2 && isArray === null) {
                        c += 2;
                    }
                    //to handle the arrays
                    if (isArray === false) {
                        for (var curcourse in coursesThatFulfill[i]) {
                            //console.log(coursesThatFulfill[i][curcourse]);
                            if (coursesThatFulfill[i][curcourse] == courseId) {
                                arr.push(name[i][0]);
                            }
                        }
                    } else {
                        for (var curcourse in coursesThatFulfill[i][c == 2 ? 1 : 0]) {
                            if (coursesThatFulfill[i][c == 2 ? 1 : 0][curcourse] == courseId) {
                                arr.push(name[i][c]);
                            }
                        }
                    }
                    //to handle the arrays
                    if (isArray) {
                        i -= 1;
                        isArray = null;
                    } else if (isArray === null) {
                        c -= 2;
                        isArray = false;
                    }
                }
                return arr.length === 0 ? aa ? aa.get('nameSelected')[aa.get('nameSelected').length - 1][0] : 'Electives' : arr;
            },
            getSelect: function() {
                return ractive.get('select');
            }
        }

    });
    aa.on('delete', function(event, index) {
        //on delete event remove the element from the array to update the ui
        var arr = aa.get('nameSelected');
        arr[arr.length - 1][1].splice(toInt(index), 1);
        if (supportsLocalStorage()) {
            var past = localStorage.setObj('pastCourses', arr);
        }
    });
    aa.on('complete', function() {
        if (supportsLocalStorage()) {
            var past = localStorage.getObj('pastCourses');
            if (past) {
                aa.set('nameSelected', past);
                for (var arr = aa.get('nameSelected'), i = 0, l = arr.length - 1; i < l; i++) {
                    if (arr[i].length > 2) {
                        //console.log('made it here');
                        for (var group = 0, gl = arr[i].length; group < gl; group += 2) {
                            for (var gcourseId = 0, gcl = arr[i][group + 1].length; gcourseId < gcl; gcourseId++) {
                                //console.log(arr[i][group + 1][gcourseId]);
                                $('input[data-name="' + arr[i][group] + '"][data-id="' + arr[i][group + 1][gcourseId] + '"]').prop('checked', true);
                            }
                        }
                    } else {
                        for (var courseId = 0, cl = arr[i][1].length; courseId < cl; courseId++) {
                            $('input[data-name="' + arr[i][0] + '"][data-id="' + arr[i][1][courseId] + '"]').prop('checked', true);
                        }
                    }
                }

            }
            aa.set('posCourse', aa.get('needed')());
            aa.update();
        }

    });
    cart = new Ractive({
        el: 'carter',
        template: '#cart',
        data: {
            inCart: [],
            addItem: function(classy) {
                var inCart = cart.get('inCart');

                if (cart.get('isInCart')(classy)) {
                    return true;
                }
                inCart.push(classy);
                inCart.sort(function(a, b) {
                    return a.courseId < b.courseId ? -1 : 1;
                });
                // just add it
                if (supportsLocalStorage()) {
                    localStorage.setObj('cart', inCart);
                }
                return true;

            },
            removeItem: function(index) {
                cart.get('inCart').splice(index, 1);
                cart.get('inCart').sort(function(a, b) {
                    return a.courseId < b.courseId ? -1 : 1;
                });
                if (supportsLocalStorage()) {
                    localStorage.setObj('cart', cart.get('inCart'));
                }
            },
            getSelect: function() {
                return ractive.get('select');
            },
            isInCart: function(classy) {
                var inCart = cart.get('inCart');

                if (inCart.length) {
                    for (var li = inCart.length; li; li--) {
                        if (inCart[li - 1].ref == classy.ref) {
                            //class is already in the cart don't add
                            return true;
                        }
                    }
                }
                return false;
            },
            prevIs: function(index) {
                if (index == 0) {
                    return false;
                }
                var i = cart.get('inCart');
                return i[index].courseId == i[index - 1].courseId;
            },
            howManyAft: function(index) {
                var count = 0;
                for (var i = index, cartly = cart.get('inCart'), l = cartly.length; i < l; i++) {
                    if (cartly[i].courseId == cartly[index].courseId) {
                        count++;
                    }
                }
                return count;
            }
        }
    });

    cart.on('delete', function(event, index) {
        cart.get('removeItem')(index);
    });
    cart.on('complete', function() {
        if (supportsLocalStorage()) {
            var past = localStorage.getObj('cart');
            if (past) {
                cart.set('inCart', past);
            }
        }
    });

});

function isUnique(something, arr) {
    if (arr.length) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i][0] == something.data || arr[i][1] == something.value) {
                return false;
            }
        }
    }
    return true;
}

function searchPlease() {
    console.time("search speed");

    var query = $("#search").val(),
        cache = ractive.get('cache'),
        beenCached = cache.get(query) !== null,
        trimmed = ractive.get('sort')(trimCourses(query, cache), ractive.get('sortColumn'));

    /*cache.set(query, trimmed);
    ractive.set('cache', cache);*/
    ractive.set('course', trimmed);

    if (!ractive.get('reset')) {
        ractive.set('reset', true);
    }
    console.timeEnd("search speed");
    $('.linky').featherlight({
        targetAttr: 'href',
        afterOpen: function(event) {
            $('html, body').addClass('noscroll');
            $('.floatSub, .floatingHeader').css('visibility', 'hidden');
            addButtonEv();
        },
        afterClose: function(event) {
            $('html, body').removeClass('noscroll');
            UpdateTableHeaders();
        }
    });
}

function trimCourses(query, cache) {

    var q = query.toLowerCase()
        /*,
                cachedletterbefore = cache.get(q.slice(0, -1)),
                cachedthisbefore = cache.get(q)*/
        ,
        cs = /*q.length && cachedletterbefore ? cachedletterbefore.slice() : */ courses.slice();
    /*if (cachedthisbefore) {
        //console.log('Hit Fast Cache');
        return cachedthisbefore;
    }
    //console.log(cachedletterbefore ? "Hit Letter before's cache" : "Cache miss");
    /*if (q.length) {
        for (var l = cs.length; l >= 0; l -= 4) {
            var obj = cs[l - 1];
            if (obj) {
                if (obj.subject.toLowerCase().indexOf(q) !== -1 ||
                    obj.name.toLowerCase().indexOf(q) !== -1 ||
                    obj.num.toLowerCase().indexOf(q) !== -1) {

                } else {
                    cs.splice(l - 1, 1);
                }
            }
            var obj = cs[l - 2];
            if (obj) {
                if (obj.subject.toLowerCase().indexOf(q) !== -1 ||
                    obj.name.toLowerCase().indexOf(q) !== -1 ||
                    obj.num.toLowerCase().indexOf(q) !== -1) {

                } else {
                    cs.splice(l - 2, 1);
                }
            }
            var obj = cs[l - 3];
            if (obj) {
                if (obj.subject.toLowerCase().indexOf(q) !== -1 ||
                    obj.name.toLowerCase().indexOf(q) !== -1 ||
                    obj.num.toLowerCase().indexOf(q) !== -1) {

                } else {
                    cs.splice(l - 3, 1);
                }
            }
            var obj = cs[l - 4];
            if (obj) {
                if (obj.subject.toLowerCase().indexOf(q) !== -1 ||
                    obj.name.toLowerCase().indexOf(q) !== -1 ||
                    obj.num.toLowerCase().indexOf(q) !== -1) {

                } else {
                    cs.splice(l - 4, 1);
                }
            }

        }
    }*/
    var arr = $.grep(cs, function(obj, index) {
        return obj.subject.toLowerCase().indexOf(q) !== -1 ||
            obj.name.toLowerCase().indexOf(q) !== -1 ||
            obj.num.toLowerCase().indexOf(q) !== -1;
    });

    return arr;
}

function courseOpen(Item, Year) {
    var It = 'https://sisvsr.mdc.edu/student/coursehelp.aspx?ITEM=' + Item + '&Year=' + Year,
        Msg = open(It, 'COURSEHELP', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised=yes,copyhistory=no,width=367,height=200');
    Msg.focus();
}

/*function findIn(arr) {
    var arrs = [];
    for (var r = 0; r < arr.length; r++) {
        arrs[r] = [];
        for (var c = 0; c < arr[r].length; c++) {
            if (trimCourses(arr[r][c]).length) {
                arrs[r].push(arr[r][c]);
            }
        }
    }
    console.log(JSON.stringify(arrs));
    return arrs;
}*/

function forPick() {


    //aa.on('complete', function() {
    /*$(".checkers").change(function() {
        /*$("input:checkbox[data-row='" + $(this).data("row") + "']").not(this).prop('checked', false);
        $("select[data-row='" + $(this).data("row") + "']").val("");*/
    /*

        if (typeof $(this).data('group') != "undefined") {
            aa.get('nameSelected')[toInt($(this).data('row'))].splice((toInt($(this).data('group'))) * 2 + 1, 1, aa.get('nameSelected')[toInt($(this).data('row'))][toInt($(this).data('group')) * 2 + 1] == $(this).data('id') ? "" : $(this).data('id'));
        } else {
            aa.get('nameSelected')[toInt($(this).data('row'))].splice(1, 1, aa.get('nameSelected')[toInt($(this).data('row'))][1] == $(this).data('id') ? "" : $(this).data('id'));
        }
        //set in aa ractive the value that is currently being selected

    }); */
    /* Problematic may need to do a loop through each select
        $('.aaSelect').multipleSelect({
            selectAll: false,
            placeHolder: $(".aaSelect").multipleSelect("getSelects", "text")[0].slice(0, 3) + '*'
        });*/


    $('.checkers').change(function() {
        /*if is a checkbox the id determines the val if is select then the val is the val
        c is either 1 or the location of the group atrribute depending on whether the group attribute exists or not
        */
        var arr = aa.get('nameSelected'),
            r = toInt($(this).data('row')),
            c = typeof $(this).data('group') != "undefined" ? (toInt($(this).data('group'))) * 2 + 1 : 1,
            val = /*$(this).val() == "on" || $(this).val() == "off" ?*/ $(this).data('id') /*: $(this).val()*/ ,
            index = arr[r][c].indexOf(val),
            existsAlready = index > -1,
            isFuffilled = aa.get('compl')(r, c),
            possibles = aa.get('aaCourses');

        /*if (val !== "on" || val !== "off") {
            //remove from name selected the possibles of the select to set the only one selected later
            var possibles = $(this).data('id').split(',');
            for (var i = possibles.length - 1; i; i--) {
                if (arr[r][c].indexOf(possibles[i]) > -1) {
                    arr[r][c].splice(arr[r][c].indexOf(possibles[i]), 1);
                }
            }
            if (val === "") {
                return;
            } //two present problems what if the user wants to select multiple from the same select box? should we take out the select boxes then? how about the problem that the checkbox doesn't show that it's checked despite being stored in localstorage
        }*/



        /*if (existsAlready) {
            console.log('removing at %s,%s AKA %s', r, c, arr[r][0]);
            arr[r][c].splice(index, 1);
            if (isFuffilled) {

            }else{
                console.log('gonna have to find something to replace it possibly')
            }
        } else {
            if (isFuffilled) {
                if (r == arr.length - 3) {
                    //is gened
                    console.log('is gened')
                } else if (possibles[possibles.length - 2].indexOf(val) > -1 && arr[arr.length - 3][1].indexOf(val) == -1) {
                    //exists in gened 
                    console.log('adding %s to gened', val);
                    arr[arr.length - 3][1].push(val);
                    $('input[data-name="' + arr[arr.length - 3][0] + '"][data-id="' + val + '"]').prop('checked', true);
                } else if (arr[arr.length - 3][1].indexOf(val) > -1) {
                    //is currently in gened should be deleted
                    console.log('removing %s from Gened', val);
                    arr[arr.length - 3][1].splice(arr[arr.length - 1][1].indexOf(val), 1);

                } else {
                    var existsInElectives = $(this).val() == "on";

                    if (existsInElectives) {
                        console.log('removing %s from electives', val);
                    } else {
                        console.log('append %s to electives', val);
                    }
                }
            } else {
                console.log('adding to %s,%s AKA %s', r, c, arr[r][0]);
                arr[r][c].push(val);
            }
        }
        */
        console.log('%s,%s', r, c);
        if (existsAlready) {
            arr[r][c].splice(index, 1);
            //console.log('exists');
        } else {
            //console.log('adding');
            arr[r][c].push(val);
        }

        if (supportsLocalStorage()) {
            var past = localStorage.setObj('pastCourses', arr);
        }
        //console.log('%s,%s', r, c);
        aa.set('posCourse', aa.get('needed')());
        aa.update();
        //console.log('%s,%s', r, c);
        $('.fufillmentLi a,.posCourse a').featherlight({
            targetAttr: 'href',
            afterOpen: function(event) {
                $('html, body').addClass('noscroll');
                $('.floatSub, .floatingHeader').css('visibility', 'hidden');
                addButtonEv();
            }
        });
        //set in aa ractive the value that is currently being selected whether it is from a checkbox or select group

    });


    $('#elective').blur(function() {
        $('.floatSub, .floatingHeader').css('visibility', 'hidden');
    });
    $('#electives').devbridgeAutocomplete({
        lookup: checkStor.get(),
        onSelect: function(suggestion) {
            var electives = aa.get('nameSelected')[aa.get('nameSelected').length - 1][1];
            if (isUnique(suggestion, electives)) {
                //if is a unique suggestion then add it to the electives arr
                electives.push(suggestion.data);
            }
            if (supportsLocalStorage()) {
                var past = localStorage.setObj('pastCourses', aa.get('nameSelected'));
            }
            $('#electives').val("");
            //clear the input
        },
        appendTo: $("#resulter"),
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            //sort by both data and value A.K.A by course num and course title
            return suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1 || suggestion.data.toLowerCase().indexOf(queryLowerCase) !== -1;
        },
        formatResult: function(suggestion, currentValue) {
            var pattern = '(' + $.Autocomplete.utils.escapeRegExChars(currentValue) + ')';
            //highlight both data and value that match current value
            return suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>') + " (" + suggestion.data.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>') + ")";
        }
    });
    $('button.navigate').click(function() {
        var toLeft = $('#step' + $(this).data('current')),
            toRight = $('#step' + $(this).data('to'));
        $('.featherlight-content').animate({
            'scrollTop': 0
        }, 800);
        if (toInt($(this).data('current')) < toInt($(this).data('to'))) {
            toLeft.css({
                left: 0
            }).animate({
                left: -toLeft.outerWidth(),
                height: toRight.outerHeight()
            }, 800, function() {
                $(this).removeAttr('style').hide();
            });
            toRight.show().css({
                right: -$(this).outerWidth()
            }).animate({
                right: 0
            }, 800);
        } else {
            toLeft.css({
                right: 0
            }).animate({
                right: -toLeft.outerWidth(),
                height: toRight.outerHeight()
            }, 800, function() {
                $(this).removeAttr('style').hide();
            });
            toRight.show().css({
                left: -$(this).outerWidth()
            }).animate({
                left: 0
            }, 800);
        }
    });
    $('.fufillmentLi a,.posCourse a').featherlight({
        targetAttr: 'href',
        afterOpen: function(event) {
            $('html, body').addClass('noscroll');
            $('.floatSub, .floatingHeader').css('visibility', 'hidden');
            addButtonEv();
        }
    });
}

function addButtonEv() {
    setTimeout(function() {
        $('.courses tr[data-info]').each(function(i) {
            if (cart.get('isInCart')($(this).data('info'))) {
                $(this).addClass('saved');
            } else {
                $(this).click(function() {
                    cart.get('addItem')($(this).data('info'));
                    $(this).addClass('saved');
                });
            }
        });
    }, 800);

}

function supportsLocalStorage() {
    try {
        return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
        return false;
    }
}

Storage.prototype.setObj = function(key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObj = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
};

function toInt(inter) {
        return parseInt(inter, 10);
    }
    /*
     * memoize.js
     * by @philogb and @addyosmani
     * with further optimizations by @mathias
     * and @DmitryBaranovsk
     * perf tests: http://bit.ly/q3zpG3
     * Released under an MIT license.
     */
function memoize(fn) {
    return function() {
        var args = Array.prototype.slice.call(arguments),
            hash = "",
            i = args.length;
        currentArg = null;
        while (i--) {
            currentArg = args[i];
            hash += (currentArg === Object(currentArg)) ?
                JSON.stringify(currentArg) : currentArg;
            fn.memoize || (fn.memoize = {});
        }
        return (hash in fn.memoize) ? fn.memoize[hash] :
            fn.memoize[hash] = fn.apply(this, args);
    };
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
/*
//finds all repeated coourses to check database
(function(){var ret=[];
for(var i=courses.length-1,arr=[];i;i--){
if(arr.indexOf(courses[i].num)==-1){
arr.push(courses[i].num);
}
else{ret.push(courses[i].num)}
}return ret;})()
*/
checkStor = {
    arr: [],
    get: function() {
        //console.log('checkstor get called');
        if (checkStor.arr.length < 1) {
            return checkStor.set();
        } else {
            //console.log('checkstor returned');
            return checkStor.arr;
        }
    },
    set: function() {
        //console.log('checkstor set called');
        var c = courses;

        for (var i = c.length - 1; i; i--) {
            checkStor.arr.unshift({
                "value": c[i].name,
                "data": c[i].num
            });
        }
        return checkStor.arr;
    }
}
