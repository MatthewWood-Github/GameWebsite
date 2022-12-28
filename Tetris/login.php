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
        
        ini_set('display_errors', 1);
        $dbhost = 'localhost:3306';
        $dbuser = 'default';
        $dbpass = 'pass';
        $conn = mysqli_connect($dbhost, $dbuser, $dbpass);
    
        if(! $conn ) {
            die('Could not connect: ' . mysqli_error());
        }

        mysqli_select_db($conn, "hackme");

        if (!empty($_POST['username']))
          {
            if ($result = mysqli_query($conn, "SELECT * from users")) {

                $userid = mysqli_num_rows($result) + 1;
            }

            $username = $_POST['username'];
            $password = $_POST['password'];
            $description = "Overwatch Player";
   
            $query = "INSERT IGNORE INTO users (userid, username, password , description) VALUES ('$userid', '$username', '$password', '$description')";
   
            $connection = mysqli_query($conn, $query);
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
                    <div class="side-link" style="background-color: #dddddd; color: black;">
                        <a href="login.php"> Login </a> </li>
                    </div>
                 </li>
                <li> 
                    <div class="side-link">
                        <a href="content.php"> Content </a> </li>
                    </div>
                </li>
            </ul>
    </nav>

    <div class="center" style="margin-top: 20px; height: 800px; width: 800px;"> 
        <div class="login">
            <h1> Login </h1>
            <form action="content.php" method="POST">
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username"><br>

                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password">

                <input type="submit" id="submit" value="Login" class="submit-button">
            </form>
        </div>

        <div>
        </div>
    </div>

</body>
</html>