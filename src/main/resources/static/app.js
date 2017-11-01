




var app =(function(){

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
//    var playerA = "images/Bombermans/player1/11.gif";
//    var playerB = "images/Bombermans/player2/11.gif";
//    var playerC = "images/Bombermans/player3/11.gif";
//    var playerD = "images/Bombermans/player4/11.gif";
    var nicknameA;
    var nicknameB;
    var nicknameC;
    var nicknameD;
    var fil=26;
    var col=37;
    var cont=0;
    
    
    
    var  selectImage=function() {
        if (ky === 37) {
            imgs = "images/Bombermans/Player1/21.gif";
        } else if (ky === 38) {
            imgs = "images/Bombermans/Player1/01.gif";
        } else if (ky === 39) {
            imgs = "images/Bombermans/Player1/31.gif";
        } else if (ky === 40) {
            imgs = "images/Bombermans/Player1/11.gif";

        }
      };
      
      var bomberman= function(width, height, color, x, y, type) {

            var image = new Image();
            image.src = color;
            image.onload = function () {
                ctx.drawImage(image, x, y, width, height);
            };

        };
        
        
      var bomber=function(width, height, color, x, y, type) {

            var image = new Image();
            image.src = color;
            //image.onload = function(){
            ctx.drawImage(image, x, y, width, height);
            //};

        };
        
        var isUpperCase=function(str) {
                return str === str.toUpperCase();
            };
            
    
           
         var bloque=function(width, height, color, x, y) {
                ctx.fillStyle = color;
                ctx.fillRect(x, y, width, height);
             };
             
        var disconnect=function() {
            if (stompClient != null) {
                  stompClient.disconnect();
              }
              //setConnected(false);
              console.log("Disconnected");
          };
          
         var moverPersonaje= function(key) {
                if (36 < key && key < 41) {
                    ky = key;
                    stompClient.send("/app/mover." + sessionStorage.getItem('sala'), {}, JSON.stringify({x: myposx, y: myposy, k: key, mem: mymem}));
                         }

                };
return {
    
    ///**
// * 
// *  Flecha izquierda 	37 	
//    Flecha arriba 	38 	
//    Flecha derecha 	39 	
//    Flecha abajo 	40 	
// */
   
      
//3 es un obstaculo
////0 un espacio en blanco
////2 pared rompible
////letras en mayusculas son jugadores


    cargarsalas:function () {
        var salaid= sessionStorage.getItem('sala');
         console.log("heyyyy");
         $.get("/salas/"+ salaid+ "/tablero", function (data) {
             var tablero = data[0];

             for (i = 0; i < fil; i++) {
                 for (j = 0; j < col; j++) {
                     if (tablero[i][j] === "3") {
                               bloque(20, 20, "blue", j * 20, i * 20);
                           


                     } else if (tablero[i][j] === "0") {
                        bloque(20, 20, "black", j * 20, i * 20);


                     } else if (tablero[i][j] === "2") {
                        bloque(20, 20, "black", j * 20, i * 20);




                     } else if (tablero[i][j] === "A") {
                        bloque(20, 20, "black", j * 20, i * 20);

                         bomberman(20, 20, "images/Bombermans/Player1/11.gif", j * 20, i * 20, "image");

                     } else if (tablero[i][j] === "B") {
                       bloque(20, 20, "black", j * 20, i * 20);
                        bomberman(20, 20, "images/Bombermans/Player2/11.gif", j * 20, i * 20, "image");
                     } else if (tablero[i][j] === "C") {
                         bloque(20, 20, "black", j * 20, i * 20);

                         bomberman(20, 20, "images/Bombermans/Player3/11.gif", j * 20, i * 20, "image");

                    } else if (tablero[i][j] === "D") {
                        bloque(20, 20, "black", j * 20, i * 20);

                        bomberman(20, 20, "images/Bombermans/Player4/11.gif", j * 20, i * 20, "image");


                 }
             }}
             var myObstacle = new bomberman(20, 20, "images/Bombermans/Player1/11.gif", 0 * 20, 26 * 20.2, "image");
             var myObstacle = new bomberman(20, 20, "images/Bombermans/Player2/11.gif", 0 * 20, 25 * 20.2, "image");
             var myObstacle = new bomberman(20, 20, "images/Bombermans/Player3/11.gif", 9 * 20, 26 * 20.2, "image");
             var myObstacle = new bomberman(20, 20, "images/Bombermans/Player4/11.gif", 9 * 20, 25 * 20.2, "image");

            $.get("/salas/" + sessionStorage.getItem(salaid) + "/info", function (data) {
                for (i = 0; i < data.length; i++) {
                     if (data[i].alias === "A") {
                         ctx.font = "bold 18px sans-serif";
                         ctx.fillStyle = "white";
                         nameA=data[i].nombre;
                         ctx.fillText(data[i].nombre+" L= 2", 20, 540);

                     } else if (data[i].alias === "B") {
                         nameB=data[i].nombre;
                         ctx.font = "bold 18px sans-serif";
                         ctx.fillStyle = "white";
                         ctx.fillText(data[i].nombre +" L= 2", 20, 520);

                     } else if (data[i].nombre === "C") {
                         ctx.font = "bold 18px sans-serif";
                        ctx.fillStyle = "white";
                         ctx.fillText(data[i].nombre, 380, 540);
                     } else if (data[i].nombre === "D") {
                        ctx.font = "bold 18px sans-serif";
                         ctx.fillStyle = "white";
                         ctx.fillText(data[i].nombre, 380, 520);
                     }
                 }

            }  );



         } );},
     
     connect:function () {
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
                };

                setTimeout(update, 1000);

                stompClient.subscribe('/topic/actualizarJuego.' + sessionStorage.getItem('sala'), function (data) {
                    var tablero = JSON.parse(data.body);

                   for (i = 0; i < tablero.length; i++) {



                        if (tablero[i].key === "A") {
                            var myObstacle = new bomber(20, 20, "images/Bombermans/Player1/11.gif", 20 * tablero[i].y, 20 * tablero[i].x, "image");
                            if (myplayer === tablero[i].key) {
                                myposx = tablero[i].x;
                                myposy = tablero[i].y;

                           }

                        } else if (tablero[i].key === "B") {
                           var myObstacle = new bomber(20, 20, "images/Bombermans/Player2/11.gif", 20 * tablero[i].y, 20 * tablero[i].x, "image");
                           if (myplayer === tablero[i].key) {
                                myposx = tablero[i].x;
                                myposy = tablero[i].y;
                            }

                        } else if (tablero[i].key === "C") {
                            var myObstacle = new bomber(20, 20, "images/Bombermans/Player3/11.gif", 20 * tablero[i].y, 20 * tablero[i].x, "image");
                            if (myplayer === tablero[i].key) {
                                myposx = tablero[i].x;
                                myposy = tablero[i].y;
                            }

                        } else if (tablero[i].key === "D") {
                            var myObstacle = new bomber(20, 20, "images/Bombermans/Player4/11.gif", 20 * tablero[i].y, 20 * tablero[i].x, "image");
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


                   // disconnect();

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

                
                
                

            });
            this.cargarsalas();
           },
           
    
                
                
        init: function () {
                    console.info('loading script!...');
                    alert('Que comience el Juego!!!!!');
                    this.connect();
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



                    $.get("/salas/" + sessionStorage.getItem('sala') , function (data) {
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
    
    
};


})();

