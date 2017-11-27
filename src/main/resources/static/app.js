
var prueba2=null;



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
    var prueba=null;
//    var playerA = "images/Bombermans/player1/11.gif";
//    var playerB = "images/Bombermans/player2/11.gif";
//    var playerC = "images/Bombermans/player3/11.gif";
//    var playerD = "images/Bombermans/player4/11.gif";
    var nicknameA;
    var nicknameB;
    var nicknameC;
    var nicknameD;
    var fil=28;
    var col=36;
    var cont=0
    var puntos=0;
    
    
    
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
        
        var isUpperCase =function(str) {
                cadena = str;
                return cadena.toUpperCase();
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
                if (31 < key && key < 41) {
                    ky = key
     
                    
                    //alert("MOVER PERSONAJE !!");
                    stompClient.send("/app/mover." + sessionStorage.getItem('sala'), {}, JSON.stringify({x: myposx, y: myposy, key: ky, memo: mymem}));
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
         console.log("Cargando sala...");
         $.get("/salas/tablero", function (data) {
             
             var tablero = data[0];
             //console.log(tablero);
             for (i = 0; i < fil; i++) {
                 for (j = 0; j < col; j++) {
                     if (tablero[i][j] === "3") {
                               bloque(20, 20, "purple", j * 20, i * 20);
     

                     } else if (tablero[i][j] === "2") {
                        bloque(20, 20, "red", j * 20, i * 20);
                        
                     } else if (tablero[i][j] === "4") {
                        bloque(20, 20, "green", j * 20, i * 20);

                //DIBUJANDO JUGADORES        

                     } else if (tablero[i][j] === "A") {
                        bloque(20, 20, "yellow", j * 30, i * 30);
                        bomberman(20, 20, "images/Bombermans/Player1/11.gif", j * 20, i * 20, "image");


                     } else if (tablero[i][j] === "B") {
                       bloque(20, 20, "blue", j * 20, i * 20);
                       bomberman(20, 20, "images/Bombermans/Player2/11.gif", j * 20, i * 20, "image");
                        
                        
                     } else if (tablero[i][j] === "C") {
                         bloque(20, 20, "red", j * 20, i * 20);
                         bomberman(20, 20, "images/Bombermans/Player3/11.gif", j * 20, i * 20, "image");
                         
                         

                    } else if (tablero[i][j] === "D") {
                        bloque(20, 20, "green", j * 20, i * 20);
                        bomberman(20, 20, "images/Bombermans/Player4/11.gif", j * 20, i * 20, "image");
                 }
             }}
             
             $.get("/salas/" + sessionStorage.getItem('sala') + "/info", function (data) {
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
                   prueba2=JSON.parse(data.body);
                   
                   
                   
                        console.log(tablero[0].key)   
     //SE MUEVE A***************************************************************************                    
                        if (tablero[0].key === "A" )
                        {   //console.log("a mover el bote A"  );
                            console.log(tablero[0].key);
                            console.log(myplayer === tablero[0].key +"sjhdjksahdjkashjkas");
                            var myObstacle = new bomber(20, 20, "images/Bombermans/Player1/11.gif", 20 * tablero[i].y, 20 * tablero[i].x, "image");
                           if (myplayer === tablero[0].key) {
                                    myposx = tablero[0].x;
                                    myposy = tablero[0].y;
                                } 
                            var myObstacle = new bloque(20, 20, "yellow", 20 * tablero[1].y, 20 * tablero[1].x);
                        console.log(myplayer);    
                        if (myplayer==="A"){
                                puntos+=1;
                                $("#puntaje").text(puntos);
                            }
                         
                                                      
                            
                        }
                        else if (tablero[0].key === "B" )
                        {   //console.log("a mover el bote A"  );
                            console.log(tablero[0].key);
                            console.log(myplayer === tablero[0].key +"sjhdjksahdjkashjkas");
                            var myObstacle = new bomber(20, 20, "images/Bombermans/Player2/11.gif", 20 * tablero[i].y, 20 * tablero[i].x, "image");
                           if (myplayer === tablero[0].key) {
                                    myposx = tablero[0].x;
                                    myposy = tablero[0].y;
                                } 
                            var myObstacle = new bloque(20, 20, "green", 20 * tablero[1].y, 20 * tablero[1].x);
                            if (myplayer==="B"){
                                puntos+=1;
                                $("#puntaje").text(puntos);
                            }
                         
                                                      
                            
                        }
                         else if (tablero[0].key === "C" )
                        {   //console.log("a mover el bote A"  );
                            console.log(tablero[0].key);
                            console.log(myplayer === tablero[0].key +"sjhdjksahdjkashjkas");
                            var myObstacle = new bomber(20, 20, "images/Bombermans/Player3/11.gif", 20 * tablero[i].y, 20 * tablero[i].x, "image");
                           if (myplayer === tablero[0].key) {
                                    myposx = tablero[0].x;
                                    myposy = tablero[0].y;
                                } 
                            var myObstacle = new bloque(20, 20, "red", 20 * tablero[1].y, 20 * tablero[1].x);
                            if (myplayer==="C"){
                                puntos+=1;
                                $("#puntaje").text(puntos);
                            }
                         
                                                      
                            
                        } 
                        
                         else if (tablero[0].key === "D" )
                        {   //console.log("a mover el bote A"  );
                            console.log(tablero[0].key);
                            console.log(myplayer === tablero[0].key +"sjhdjksahdjkashjkas");
                            var myObstacle = new bomber(20, 20, "images/Bombermans/Player4/11.gif", 20 * tablero[i].y, 20 * tablero[i].x, "image");
                           if (myplayer === tablero[0].key) {
                                    myposx = tablero[0].x;
                                    myposy = tablero[0].y;
                                } 
                            var myObstacle = new bloque(20, 20, "blue", 20 * tablero[1].y, 20 * tablero[1].x);
                            if (myplayer==="D"){
                                puntos+=1;
                                $("#puntaje").text(puntos);
                            }
                         
                                                      
                            
                        }
  
                        
                        
                        if (tablero[i].key === "1") {
                            var myObstacle = new bloque(20, 20, "black", 20 * tablero[i].y, 20 * tablero[i].x);
                        }
                        if (tablero[i].key === "2") {
                            var myObstacle = new bloque(20, 20, "black", 20 * tablero[i].y, 20 * tablero[i].x);
                        }
                         if (tablero[i].key === "3") {
                            var myObstacle = new bloque(20, 20, "purple", 20 * tablero[i].y, 20 * tablero[i].x);
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
                    
                    this.connect();
                    canvas = document.getElementById('cnv');
                    ctx = canvas.getContext('2d');


                    window.addEventListener('keydown', function (e) {
                        key = e.keyCode;
                        moverPersonaje(key);



                        //console.log(key);
                    });
                    window.addEventListener('keyup', function (e) {
                        key = false;
                    });



                    //$.get("/salas/" + sessionStorage.getItem('sala')+ "/info" , function (data) {
                      
                       $.get("/salas/" + sessionStorage.getItem('sala') + "/" + sessionStorage.getItem('identificador'), function (data){ 
                           console.log(data+"data"); 
                           myplayer = data;
                             
                            mymem = 2;
                            if (data === 'B') {
                               myposx = 26;
                               myposy = 1;
                            } else if (data === 'A') {
                                myposx = 1;
                                myposy = 1;
                            } else if (data === 'C') {
                                myposx = 1;
                                myposy = 34;
                            } else if (data === 'D') {
                                myposx = 26;
                                myposy = 34;
                            }
                        

            });


        }
    
    
};


})();

