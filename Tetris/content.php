<!DOCTYPE html>
<html>
<head>
        <meta charset='utf-8'>
        <title> Play Tetris </title>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />
        <link rel="stylesheet" href="default.css">
</head>

<body>

    <?php
        
        ini_set('display_errors', 0);
        $dbhost = 'localhost:3306';
        $dbuser = 'default';
        $dbpass = 'pass';
        $conn = mysqli_connect($dbhost, $dbuser, $dbpass);
    
        if(! $conn ) {
            die('Could not connect: ' . mysqli_error());
        }

        mysqli_select_db($conn, "hackme");
        
        $user = $_POST['username'];
        $password = $_POST['password'];
  
        if (!empty($_POST['username'] && !empty($_POST['username'])))
        {
            $loginQuery = "SELECT * FROM users WHERE username='$user' and password='$password'";

            $userResult = (mysqli_query($conn, $loginQuery));

            $row = mysqli_fetch_array($userResult);
            $content = $row['description'];
        }
    ?>

    <nav class="navbar">
        <img src="favicon.png" alt="favicon" width="32", height="32" style="float: left; margin-left: 12px; margin-top: 6px">
        <div class="centerNavbarElements">
            <ul class="center">
                <li> <a href="index.php"> Home </a> </li>
                <li> <a href="tetris.php"> Play </a> </li>
                <li> <a href="login.php"> Login </a> </li>
            </ul>
        <div>
    </nav>

    <nav style="width: auto; height; 400px;">
            <ul>
                <li> 
                    <div class="side-link">
                        <a href="signup.php"> Signup </a> </li>
                    </div>
                <li> 
                    <div class="side-link">
                        <a href="login.php"> Login </a> </li>
                    </div>
                 </li>
                <li> 
                    <div class="side-link" style="background-color: #dddddd; color: black;">
                        <a href="content.php"> Content </a> </li>
                    </div>
                </li>
            </ul>
    </nav>

    <div class="center" style="margin-top: 20px; height: 800px; width: 66%;"> 
        <div class="login">
            <h1> Content </h1>
            <!-- <table cellspacing="2px" cellpadding="2px" width=90%> 
                <tr> 
                    <td> userid </td> 
                    <td> username </td> 
                    <td> password </td> 
                    <td> description </td> 
                </tr>
            </table> -->
            <?php if (!empty($content)): echo($content)?>
            <?php else: ?>
            Secret...
            <?php endif; ?>
        </div>

        <div>
        </div>
    </div>

</body>
</html>