<?php
  $Y = date('Y'); $m = date('m'); $d = date('d');
  if(isset($_POST['string'])){
    $target_dir = "uploads/".$Y."/".$m."/".$d."/".$_POST['pd_id'];
    if (!file_exists($target_dir)) {
        mkdir   ($target_dir, 0777, true);
    }
    $file = $target_dir."/config.json";
    if(file_put_contents($file, $_POST['string'])) {
      echo "http://tools.x7.org/drawerconfig/current/uploader/".$file;
    } else {
      echo "error: file not written";
    }
  } else {
    echo "error: here's what you sent up:\n";
    echo $_POST;
  }
?>
