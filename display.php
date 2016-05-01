<?PHP 
$query = htmlspecialchars($_GET["lookup"]);//https://sisvsr.mdc.edu/student/openclass/NewOpenSearchSelected.aspx
$url="https://sisvsr.mdc.edu/student/openclass/NewOpenSearchSelected.aspx?Term=".$_GET["Term"]."&campusWanted=".$_GET["campusWanted"]."&timesWanted=ALL&lookup=".$_GET["lookup"];
include 'includes/database.php';
include 'includes/simple_html_dom.php';
// Retrieve username and password from database according to user's input
$stmt = $db->prepare("SELECT * FROM `courses` WHERE `MDC Course Number` LIKE :query");

$resul = $stmt->execute(array(':query'=>$query));
$result = $stmt->fetch();
$num_rows = $stmt->rowCount();
if($num_rows>0){
    
    $subj=$result['Discipline'];
    $title=$result['Course Title'];
    $courseId=$result['MDC Course Number'];
    $cred=$result['Colege Credits'];
    $hscred=($result['HS Credit']=='NC'?0:$result['HS Credit']);
    $prereq=$result['Pre-requisite'];
    $coreq=$result['Co-requisite'];
?>

    
<div class='display'>
        <h1 class='center'>
            <?PHP echo $title; ?>
        </h1>

        <p>
            Subject area: 
            <?PHP echo $subj;?>
        </p>

        <p>
            MDC Course Id: 
            <span class='italic'>
                <a href="<?PHP echo $url?>" target="_blank"><?PHP echo $courseId;?></a>
            </span>
        </p>

        <p>
            College Credits: 
            <?PHP echo $cred;?>
        </p>

        <p>
            High school Credits: 
            <?PHP echo $hscred;?>
        </p>

        <p>
            Pre-requisites: 
            <span class='italic'>
                <?PHP echo $prereq;?>
            </span>
        </p>

        <p>
            Co-requisite: 
            <span class='italic'>
                <?PHP echo $coreq;?>
            </span>
        </p>
        <h2 class="center clear">Description</h2>
    <p class="description">
        <?PHP
        echo file_get_html('https://sisvsr.mdc.edu/student/coursehelp.aspx?ITEM='.$courseId)->find('table tbody',1)->find('tr',3)->find('td',1)->plaintext;
    
        ?>
    </p>
        <!--<button class='right cart' data-id="<?PHP //echo $courseId;?>">
            Save Course
        </button>-->
        <div class="courses">
        <table>
           <thead>
            <th>Reference #</th>
            <th>Instructor</th>
            <th>Open Seats</th>
            <th>Days</th>
            <th>Dates</th>
            <th>Times</th>
            <th>Room</th>
        </thead>
           <tbody>
            <?PHP

//$data = file_get_contents($url) or die("Cannot open URL");
$html=file_get_html($url);
    $data=$html->find('table tbody',5);
    //ignore tr where the first td has a colspan of 5 -> its empty
    //handle composite tr where its a blend course
    //echo $data->plaintext;
    if(!isset($data)){
    echo "<tr class='added'><td colspan='7'>There doesn't seem to be any classes available...</td></tr>";
    }
    else{
    for($r=0,$courseNum=$courseId,$row=$data->find('tr');$r<count($row);$r++){
        
        if( $row[$r]->find('th',0) !== null || ( count($row[$r]->find('td'))==1 && $row[$r]->find('td',0)->colspan!=='12' ) || count($row[$r]->find('td'))==1 ){
            
            //echo $row->plaintext;
            
            continue;
        
        }
        
        //echo count( $row->find('td') ).'----'.( count( $row->find('td') ) == 1 ? $row->find('td',0)->plaintext :' ');
           //if(count($row->find('td'))==5){
            echo "<tr".((count($row)>$r+1&&(count($row[$r+1]->find('td'))==5))?' class="added marg"':'')." data-info='".(getInfo($courseNum,$row,$r))."'>";
        
               for($c=0,$col=$row[$r]->find('td'),$l=count($col);$c<$l;$c++){
               /*echo $num.")".$col[$c]->plaintext;
                   echo"<br>";
                   $num++;*/
                   if(count($row)>$r+1&&(count($col)==5||count($row[$r+1]->find('td'))==5)){
                        //echo "This is one that needs to be appended<br>";
                       switch($c){
                        case 0:
                        case 5:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                           echo "<td class='noborder'>".str_replace("&nbsp;", '', trim($col[$c]->plaintext))."</td>";
                        break;
                       }
                       if($c==11){
                           $r++;
                       echo "</tr><tr class='continued added'><td colspan='3'></td><td>".$row[$r]->find('td')[1]->plaintext."</td><td>".$row[$r]->find('td')[2]->plaintext."</td><td>".$row[$r]->find('td')[3]->plaintext."</td><td>".$row[$r]->find('td')[4]->plaintext."</td></tr><tr class='comment added'><td colspan='7'>".preg_replace_callback('/([.!?])\s*(\w)/', function ($matches) {return strtoupper($matches[1] . ' ' . $matches[2]);}, ucfirst(strtolower(str_replace("&nbsp;", '', $row[$r+1]->find('td',0)->plaintext))))."</td>";
                       }
                   }
                   else if($c==0||$c==5||$c==7||$c==8||$c==9||$c==10||$c==11){
                        echo "<td>".str_replace("&nbsp;", '', $col[$c]->plaintext)."</td>";
                   }
               }
            echo "</tr>";
           //}
           //echo count($row->find('td'))==5?$row->find('td',0)->plaintext:'';
        
        
    }
    }
?>
       </tbody>
        </table>
    </div>
    </div>
<?PHP
}
else{
echo'Err... Something went wrong on our side. Sorry about that!';
}
function getInfo($courseId,$row,$r){
    $col=$row[$r]->find('td');
    if(count($col)<8){return '';}
    $nrow=$row[$r+1]->find('td');
    $bool=count($row)>$r+1&&(count($col)==5||count($nrow)==5);
    $obj=[];
    $obj['courseId']=$courseId;
    $obj['ref']=trim(preg_replace('/\s+/', ' ',$col[0]->plaintext));
    $obj['prof']=trim(preg_replace('/\s+/', ' ',$col[5]->plaintext));
    $obj['space']=trim(preg_replace('/\s+/', ' ',$col[7]->plaintext));
    $obj['days']=trim(preg_replace('/\s+/', ' ',$col[8]->plaintext)).($bool?trim(preg_replace('/\s+/', ' ',$nrow[1]->plaintext)):"");
    $obj['dates']=trim(preg_replace('/\s+/', ' ',$col[9]->plaintext)).($bool?" , ".trim(preg_replace('/\s+/', ' ',$nrow[3]->plaintext)):"");
    $obj['times']=trim(preg_replace('/\s+/', ' ',$col[10]->plaintext)).($bool?" & ".trim(preg_replace('/\s+/', ' ',$nrow[3]->plaintext)):"");
    $obj['room']=str_replace("&nbsp;",'',trim(preg_replace('/\s+/', ' ',$col[11]->plaintext)));
    return json_encode($obj,JSON_UNESCAPED_SLASHES);
}
?>