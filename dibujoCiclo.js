var dib = document.getElementById("dibujito"); //Esta funcion llama a un objeto HTML en el documento en este caso el Canvas
var lienzo = dib.getContext("2d"); //GetContext es una funcion del objeto Canvas que permite obtener el area de dibujo. 2d indica que sea tipo 2d
var ancho = dib.width; //obtenemos el ancho del objeto HTMl Canvas
var alto = dib.height; //obtenemos el alto del objeto HTMl Canvas

var caja_texto = document.getElementById("TxtCantLineas");
var boton = document.getElementById("BtnEjecutar");
boton.addEventListener("click", dibujoPorClick); //Asi se agrega la funcion  que se quiere que ejecute el boton en el evento dibujoPorClick

dibujarBordes("Black", ancho, alto); //Dibujo los bordes del canvas al inicio del programa


//***********************FUNCIONES********************************************

function dibujarLinea(color, Xinicial, Yinicial, Xfinal, Yfinal)  //asi se declara una funcion
{
  lienzo.beginPath(); //Asi se indica iniciar un trazo
  lienzo.strokeStyle = color; //esto es una propiedad o propiedad de lienzo (Contexto 2d de canvas)
  lienzo.moveTo(Xinicial, Yinicial); //Funcion para mover el lapiz a punto inicial
  lienzo.lineTo(Xfinal, Yfinal); //Funcion para mover el lapiz a punto siguiente
  lienzo.stroke(); //Esto ejecuta el trazo.
  lienzo.closePath(); //con esto se finaliza el trazo (levanta el lapiz para iniciar siguiente trazo en punto distinto)
}

//---------------------------------------

function dibujarBordes(col, wid, heig)
{
  dibujarLinea (col, 0, 0, 0, heig);  //Linea borde Vertical izquierdo (si se inicia en pixel 0 ocurre un Antialaizing, la linea se ve mas delagada)
  dibujarLinea (col, 1, 0, 1, heig);  //Linea borde Vertical izquierdo (Para engrosar)

  dibujarLinea (col, wid, 0, wid, heig);  //Linea borde Vertical derecho (si se inicia en pixel 0 ocurre un Antialaizing, la linea se ve mas delagada)
  dibujarLinea (col, (wid - 1), 0, (wid - 1), heig);  //Linea borde Vertical derecho (Para engrosar)

  dibujarLinea (col, 0, heig, wid, heig); //Linea borde horizontal inferior
  dibujarLinea (col, 0, (heig - 1), wid, (heig - 1)); //Linea borde horizontal inferiror (Para engrosar)

  dibujarLinea (col, 0, 0, wid, 0); //Linea borde horizontal superior
  dibujarLinea (col, 0, 1, wid, 1); //Linea borde horizontal superior (Para engrosar)
}

//---------------------------------------

function dibujoPorClick()
{
  lienzo.clearRect(0, 0, ancho, alto);
  dibujarBordes("Black", ancho, alto);

  var lineas = parseInt(caja_texto.value); //Variable para limitar cantidad de lineas a dibujar (30 por el tamaño del canvas 300*300pixeles)
  var l = 0; //Contador de lineas
  var y_ini, x_fin; //contadores para coordenadas en el ciclo.
  var colorDib = "red";
  var espacio = ancho / lineas; //sacamos el dato que sirve para calcular en la ecuacion los espacios a dejar entre cada linea dependiendo del input

  while( l < lineas)
  {
    y_ini = espacio * l;
    x_fin = espacio * (l + 1);
    dibujarLinea (colorDib, 0, y_ini, x_fin, ancho);
    l++;

    // console.log("Linea " + l); linea para ver en consola el contador de lineas
    //Otra forma sencilla de hacer el ciclo
    //y_ini = y_ini + 10;
    //x_fin = x_fin + 10;
  }

  /* Mismo ciclo pero usando FOR
  for( l=0; l < lineas; l++)
  {
    y_ini = espacio * l;
    x_fin = espacio * (l + 1);
    dibujarLinea (colorDib, 0, y_ini, x_fin, ancho);
  }
  */
}
