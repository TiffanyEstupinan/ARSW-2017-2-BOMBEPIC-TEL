var stompClient = null;
var myplayer = null;
var myposx = null;
var myposy = null;
var ctx = null;
var mymem = null;
var shift = 0;
var currentFrame = 0;
var totalFrames = 2;
var imgs = null;
var ky = null;
var playerA = "images/Bombermans/player1/11.gif";
var playerB = "images/Bombermans/player2/11.gif";
var playerC = "images/Bombermans/player3/11.gif";
var playerD = "images/Bombermans/player4/11.gif";
var nicknameA;
var nicknameB;
var nicknameC;
var nicknameD;
var cont = 0;

/**
 * 
 * Verifica que se ínte en el sentido de la tecla
 */
function selectImage() {
    if (ky === 37) {
        imgs = "images/Bombermans/player1/21.gif";
    } else if (ky === 38) {
        imgs = "images/Bombermans/player1/01.gif";
    } else if (ky === 39) {
        imgs = "images/Bombermans/player1/31.gif";
    } else if (ky === 40) {
        imgs = "images/Bombermans/player1/11.gif";

    }
}

function cargarSala() {
    $.get("/salas/tablero", function (data) {
        var tablero = data[0];

        for (i = 0; i < tablero.length; i++) {
            for (j = 0; j < tablero[i].length; j++) {
                if (tablero[i][j] === "3") {
                    var myObstacle = new bloque(20, 20, "blue", j * 20, i * 20);


                } else if (tablero[i][j] === "0") {
                    var myObstacle = new bloque(20, 20, "black", j * 20, i * 20);

                } else if (tablero[i][j] === "1") {
                    var myObstacle = new bloque(20, 20, "black", j * 20, i * 20);

                    



                } else if (tablero[i][j] === "2") {
                    var myObstacle = new bloque(20, 20, "black", j * 20, i * 20);

                    


                } else if (tablero[i][j] === "A") {
                    var myObstacle = new bloque(20, 20, "black", j * 20, i * 20);

                    var myObstacle = new bomberman(20, 20, "images/Bombermans/player1/11.gif", j * 20, i * 20, "image");

                } else if (tablero[i][j] === "B") {
                    var myObstacle = new bloque(20, 20, "black", j * 20, i * 20);

                    var myObstacle = new bomberman(20, 20, "images/Bombermans/player2/11.gif", j * 20, i * 20, "image");

                } else if (tablero[i][j] === "C") {
                    var myObstacle = new bloque(20, 20, "black", j * 20, i * 20);

                    var myObstacle = new bomberman(20, 20, "images/Bombermans/player3/11.gif", j * 20, i * 20, "image");

                } else if (tablero[i][j] === "D") {
                    var myObstacle = new bloque(20, 20, "black", j * 20, i * 20);

                    var myObstacle = new bomberman(20, 20, "images/Bombermans/player4/11.gif", j * 20, i * 20, "image");

               

            }
        }
        var myObstacle = new bomberman(20, 20, "images/Bombermans/player1/11.gif", 0 * 20, 26 * 20.2, "image");
        var myObstacle = new bomberman(20, 20, "images/Bombermans/player2/11.gif", 0 * 20, 25 * 20.2, "image");
        var myObstacle = new bomberman(20, 20, "images/Bombermans/player3/11.gif", 9 * 20, 26 * 20.2, "image");
        var myObstacle = new bomberman(20, 20, "images/Bombermans/player4/11.gif", 9 * 20, 25 * 20.2, "image");

        

        


    }
    );
}
//cronometro

function connect() {
    var socket = new SockJS('/stompendpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        var $worked = $("#worked");

        function update() {
            
            cont += 1;
            var myTime = $worked.html();
            var ss = myTime.split(":");
            var dt = new Date();
            dt.setHours(0);
            dt.setMinutes(ss[0]);
            dt.setSeconds(ss[1]);

            var dt2 = new Date(dt.valueOf() - 1000);
            var temp = dt2.toTimeString().split(" ");
            var ts = temp[0].split(":");

            $worked.html(ts[1] + ":" + ts[2]);
            if (ts[1] === "00" && ts[2] === "00") {
            } else {
                setTimeout(update, 1000);
            }
        }

        setTimeout(update, 1000);

        stompClient.subscribe('/topic/actualizarJuego.' + sessionStorage.getItem('sala'), function (data) {
            var tablero = JSON.parse(data.body);

            for (i = 0; i < tablero.length; i++) {



                if (tablero[i].key === "A") {
                    var myObstacle = new bomber(20, 20, "images/Bombermans/player1/11.gif", 20 * tablero[i].y, 20 * tablero[i].x, "image");
                    if (myplayer === tablero[i].key) {
                        myposx = tablero[i].x;
                        myposy = tablero[i].y;

                    }

                } else if (tablero[i].key === "B") {
                    var myObstacle = new bomber(20, 20, "images/Bombermans/player2/11.gif", 20 * tablero[i].y, 20 * tablero[i].x, "image");
                    if (myplayer === tablero[i].key) {
                        myposx = tablero[i].x;
                        myposy = tablero[i].y;
                    }

                } else if (tablero[i].key === "C") {
                    var myObstacle = new bomber(20, 20, "images/Bombermans/player3/11.gif", 20 * tablero[i].y, 20 * tablero[i].x, "image");
                    if (myplayer === tablero[i].key) {
                        myposx = tablero[i].x;
                        myposy = tablero[i].y;
                    }

                } else if (tablero[i].key === "D") {
                    var myObstacle = new bomber(20, 20, "images/Bombermans/player4/11.gif", 20 * tablero[i].y, 20 * tablero[i].x, "image");
                    if (myplayer === tablero[i].key) {
                        myposx = tablero[i].x;
                        myposy = tablero[i].y;
                    }

                } else if (tablero[i].key === "0") {
                    var myObstacle = new bloque(20, 20, "black", 20 * tablero[i].y, 20 * tablero[i].x);

                } else if (tablero[i].key === "1") {
                    var myObstacle = new bloque(20, 20, "black", 20 * tablero[i].y, 20 * tablero[i].x);

                    


                } else if (tablero[i].key === "2") {
                    var myObstacle = new bloque(20, 20, "black", 20 * tablero[i].y, 20 * tablero[i].x);

                    


                }
            }

        });

        



        stompClient.subscribe('/topic/findejuego.' + sessionStorage.getItem('sala'), function (data) {
            var gana = data.body;
            var image = new Image();
            image.src = gana;
            image.onload = function () {
                ctx.drawImage(image, 160, 155,400,170);
            };
            $("#buttons").append($('<a href="index.html" class="btn yellow">Volver al inicio</a>'));
			

            disconnect();

        });
        
        
                
        
        stompClient.subscribe('/topic/'+sessionStorage.getItem('sala')+'/'+myplayer, function (data) {
        var positions=JSON.parse(data.body);
        //editar
        myposx = positions[0];
        myposy = positions[1];
        mymem= mymem-1;
        if(myplayer === myplayer.toUpperCase() && mymem===0){
                alert("Game Over");
        }



        });


        cargarSala();




    });
}



function bomberman(width, height, color, x, y, type) {

    var image = new Image();
    image.src = color;
    image.onload = function () {
        ctx.drawImage(image, x, y, width, height);
    };

}


function bomber(width, height, color, x, y, type) {

    var image = new Image();
    image.src = color;
    //image.onload = function(){
    ctx.drawImage(image, x, y, width, height);
    //};

}



function isUpperCase(str) {
    return str === str.toUpperCase();
}



function bloque(width, height, color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}




function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    //setConnected(false);
    console.log("Disconnected");
}

function moverPersonaje(key) {
    if (36 < key && key < 41) {
        ky = key;
        stompClient.send("/app/mover." + sessionStorage.getItem('sala'), {}, JSON.stringify({x: myposx, y: myposy, k: key, mem: mymem}));
    }

}

$(document).ready(
        function () {
            console.info('loading script!...');
            connect();
            canvas = document.getElementById('cnv');
            ctx = canvas.getContext('2d');


            window.addEventListener('keydown', function (e) {
                key = e.keyCode;
                moverPersonaje(key);
                console.log(key);
            });
            window.addEventListener('keyup', function (e) {
                key = false;
            });



            $.get("/salas/" + sessionStorage.getItem('sala') + "/" + sessionStorage.getItem('identificador'), function (data) {
                myplayer = data;

                
                if (data === data.toUpperCase()) {
                    mymem = 2;
                    if (data === 'A') {
                        myposx = 23;
                        myposy = 1;
                    } else if (data === 'B') {
                        myposx = 1;
                        myposy = 1;
                    } else if (data === 'D') {
                        myposx = 1;
                        myposy = 34;
                    } else if (data === 'C') {
                        myposx = 23;
                        myposy = 34;
                    }
                } 

            });



        }
);