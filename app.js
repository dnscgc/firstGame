var canvas;
var ctx;
var FPS = 20;
var imgKey;
var imgDoor;

var length = 25;
var width = 25;

var stage = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 6, 0],
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 4, 1, 1, 0],
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 4, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0],
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 2, 0, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 7, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function drawStage() {
  for (y = 0; y < 20; y++) {
    for (x = 0; x < 20; x++) {
      if (stage[y][x] == 1) {
        //camimno
        color = "#b3701b";
      }

      if (stage[y][x] == 0) {
        //muros
        color = "#2cad2a";
      }

      if (stage[y][x] == 2) {
        //pase secreto
        color = "#2cad2a";
      }

      if (stage[y][x] === 3 ||stage[y][x] === 6||stage[y][x] === 7) {
        //Llave1
        color = "#b3701b";
      }

      if (stage[y][x] == 4) {
        //puerta secreta
        color = "#2cad2a";
      }

      if (stage[y][x] == 5) {
        //puerta salida
        color = "#2cad2a";
      }

      ctx.fillStyle = color;
      ctx.fillRect(x * width, y * length, width, length);
    }
  }
}

function cleanCanvas() {
  canvas.width = "500";
  canvas.height = "500";
};

function Key(x, y) {
  this.x = x;
  this.y = y;
  this.width = 8;
  this.length = 17;
  this.collected = false;

  this.draw = function() {
    
    if (!this.collected){
      ctx.drawImage(imgKey, this.x, this.y);
    } 
  };

  this.clear = function() {
    this.collected = true;
  };

};

function Door(x, y) {
  this.x = x;
  this.y = y;
  this.visible = false;

  this.draw = function() {
    if(this.visible){
      ctx.drawImage(imgDoor, this.x, this.y);
    }
  }

  this.discover = function(){
    this.visible = true;
  }
}

function Player() {
  this.x = 1;
  this.y = 1;
  this.color = "#000000";
  this.key = 0;
  this.sDoor = false;
  this.eDoor = false;

  this.draw = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x * width , this.y * length, width, length);
  };

  this.path = function(x,y){

    var border = false;

    if (stage[y][x] == 0||stage[y][x] == 4||stage[y][x] == 5){
        border = true;
    }
    if (stage[y][x] == 4 && this.sDoor == true){
      border = false;
    }
    if (stage[y][x] == 5 && this.eDoor == true){
      border = false;
    }
    return border;
  }

    this.moveUp = function(){

        if (this.path(this.x, (this.y-1)) == false){
            this.y --; 
        } 

        this.objectAnalisis();

    };

    this.moveDown = function(){

        if (this.path(this.x, (this.y+1)) == false){
            this.y ++;
        }

        this.objectAnalisis();

    };

    this.moveLeft = function(){

        if (this.path((this.x-1), this.y) == false){
            this.x --;
        }

        this.objectAnalisis();

    };

    this.moveRight = function(){

        if (this.path((this.x+1), this.y) == false){
            this.x ++;
        }

       this.objectAnalisis();

    };

    this.objectAnalisis = function(){

      var object = stage[this.y][this.x];

      if (object == 3) {
        this.key ++;

        console.log("keys"+this.key);
        console.log("posicio" + stage[this.y][this.x]);

        llave1.clear();
        stage[this.y][this.x] = 1;

        console.log("posicion" + stage[this.y][this.x]);

        this.sDoor = true;

        console.log("puerta secreta activa?" + this.sDoor);

        if(this.key == 3){
          this.eDoor = true;
          exitDoor.discover();
          console.log(this.eDoor);
        }
        else {console.log("faltan llaves")}
      }

      if (object == 6) {
        this.key ++;
        
        console.log("keys"+this.key);
        console.log("posicio" + stage[this.y][this.x]);

        llave2.clear();
        stage[this.y][this.x] = 1;

        console.log("posicion" + stage[this.y][this.x]);

        this.sDoor = true;

        console.log("puerta secreta activa?" + this.sDoor);
        

        if(this.key == 3){
          this.eDoor = true;
          exitDoor.discover();
          console.log(this.eDoor);
        }
        else {console.log("faltan llaves")}
      }

      if (object == 7) {
        this.key ++;

        console.log("keys"+this.key);
        console.log("posicio" + stage[this.y][this.x]);
       
        llave3.clear();
        stage[this.y][this.x] = 1;

        console.log("posicion" + stage[this.y][this.x]);
        console.log("puerta secreta activa?" + this.sDoor);


        if(this.key == 3){
          this.eDoor = true;
          exitDoor.discover();
          console.log("edoor" + this.eDoor);
        } 
        else {console.log("faltan llaves")}
      }
      
      if (object == 4 && this.sDoor == true) {

        secretDoor1.discover();
        secretDoor2.discover();

        //puerta secreta
        if (this.x == 6 && this.y == 13){
          this.x =16;
          this.y= 3;
        } else{
          this.x = 6;
          this.y = 13;

        };
      };

      if (object == 5 && this.eDoor == true) {

        //puerta salida
        alert("Felicitaciones, has completado el nivel");

        
      };
    };

};

  // this.move = {
  //   selfy: this.y,
  //   selfx: this.x,
    

  //   up: function () {
  //       this.selfy --; 
  //   },

  //   down: function () {
  //           this.selfy ++;
  //   },

  //   left: function () {
  //         this.selfx --;
  //   },

  //   right: function () {
  //         this.selfx ++;
  //   }

  // };

function principal() {

  cleanCanvas();
  drawStage();
  player1.draw();
  
  llave1.draw();
  llave2.draw();
  llave3.draw();
  secretDoor2.draw();
  secretDoor1.draw();
  exitDoor.draw();
  
}

function inicializa() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  imgDoor = new Image();
  imgDoor.src = "imagenes/puertita2.jpg";
  imgKey = new Image();
  imgKey.src = "imagenes/llavesita2.jpg";
   
  console.log("inicializo");

  setInterval(function(){

  principal();


  },1000/FPS)
}

var player1 = new Player();

var secretDoor1= new Door(150, 325);
var secretDoor2= new Door(400, 75);
var exitDoor= new Door(450, 225);

var llave1 = new Key(35, 454);
var llave2 = new Key(459, 29);
var llave3 = new Key(459, 454);



document.addEventListener("keydown", function (tecla) {
    //para repasar codigo de cada tecla;
    //console.log(tecla.key);

    switch (tecla.key) {
          case "Down":
          case "ArrowDown":
            player1.moveDown();
            break;
          case "Up":
          case "ArrowUp":
            player1.moveUp();
            break;
          case "Left":
          case "ArrowLeft":
            player1.moveLeft();
            break;
          case "Right":
          case "ArrowRight":
            player1.moveRight();
            break;
          default:
            return;
        };
  });
