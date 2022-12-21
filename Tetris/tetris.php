<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'>
        <title> Play Tetris </title>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />
        <link rel="stylesheet" href="default.css">
    </head>
    <body>
        <nav class="navbar">
        <img src="favicon.png" alt="favicon" width="32", height="32" style="float: left; margin-left: 12px; margin-top: 6px;">
            <div class="centerNavbarElements">
                <ul class="center">
                    <li> <a href="index.php"> Home </a> </li>
                    <li> <a href="tetris.php"> Play </a> </li>
                    <li> <a href="#"> FAQ </a> </li>
                </ul>
            <div>
        </nav>

        <div class="center" style="margin-top: 20px; width: 734px;">
            <div class="held" id="held"> 
                <div class="small-box" id="score" style="margin-top: 230px; margin-left: -6px; background-image: url('Assets/queue/score.png');"> 
                    <p class="score-text"> </p>
                </div>
                <div class="small-box" id="level" style="margin-top: 20px; margin-left: -6px; background-image: url('Assets/queue/level.png');"> 

                </div>
                <div class="small-box" id="lines" style="margin-top: 20px; margin-left: -6px; background-image: url('Assets/queue/lines.png');">

                 </div>
            </div>
            <div class="grid" id="grid"> </div>
            <div class="queue" id="queue"> </div>
        </div>
            
        
    <script src="tetris-logic.js"></script>
    </body>
</html>