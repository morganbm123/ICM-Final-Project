/*

Morgan Mueller
ICM Final Project: 

This project imports my personal Google location data and utilizes latitudes, longitudes, and timestamps
to plot my seasonal travel and locations within a statically hosted mapbox map.

The beginning of this project was heavily influenced by Daniel Shiffman and the coding train earthquake
tracking series.

*/


let mapImg;

//center lat and long
let clat = 40.702710;
let clon = -73.930119;
// let clat = 0;
// let clon = 0;

//let winterCheckbox, springCheckbox, summerCheckbox, fallCheckbox;

 

let movementMethod;

let timelineDate;
let dateObj;

//
let ww = 1024;
let hh = 512;

let zoom = 10;
let earthquakes;

let data;


//load in the map box data
function preload() {

  //load the google json file in
  data = loadJSON("location History.json")

  //load the map image in and personal access key
  mapImg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoibWJtNTU3IiwiYSI6ImNqcDdjaWNhcjBzYmkzcHFzbGVndnlxaW8ifQ.29fPaVXPdaP9HomnlkG-_w');

}


//mercurial calculations for mapping data on a flat surface
function mercX(lon) {
  lon = radians(lon);
  let a = (256 / PI) * pow(2, zoom);
  let b = lon + PI;
  return a * b; 
}
//mercurial calculations for mapping data on a flat surface

function mercY(lat) {
  lat = radians(lat);
  let a = (256 / PI) * pow(2, zoom);
  let b = tan(PI / 4 + lat / 2);
  let c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvas(1024, 512);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapImg, 0, 0);


  let cx = mercX(clon);
  let cy = mercY(clat);



  let locations = data.locations;

  for(let i = 0; i < locations.length / 8; i++){
    //divide both latitude and longitude by 10000000 to revert to normal values
    let lat = (data.locations[i].latitudeE7) / 10000000;
    let lon = (data.locations[i].longitudeE7) / 10000000;
    let msDate = data.locations[i].timestampMs;

    //set the mode of transportation for each part of the object
    let transMode = data.locations[0].activity[1].activity[0];

    //map the lats and longs to coordinates
    movementMethod = transMode[0];
    let x = mercX(lon) - cx;
    let y = mercY(lat) - cy;  


    //convert the timeStamp from unix time to ledgible date and times
    let holderDate;
    dateObj = new Date(msDate * 1000);

    //seet the date object to the number of the month it is in
    holderDate = dateObj.getMonth();
    //let holderDate = dateString.toGMTString();
    //alert(dateString);
    

    //winter
    winterColors(x,y,holderDate);
    
  //spring
    springColors(x,y,holderDate);

    //summer
    summerColors(x, y, holderDate);

    //fall
    fallColors(x,y, holderDate);

  }

  /*
  The following groups of functions act as checks for the timestamps. Meaning depending on the 
  month the location point will be mapped with a different, seasonal, color
  */
  function winterColors( a,  b,  monthHold){
   
    
      if (monthHold == 12 || monthHold == 1 || monthHold == 2 ){
      //  if(movementMethod === 'ON_FOOT'){
        noStroke();
        fill(0,191,255, 75);
        ellipse(a, b, 5, 5);
    }
    
  }

  function springColors(a, b, monthHold){
    if(monthHold == 3 || monthHold == 4 || monthHold == 5 ){
      noStroke();
      fill(60,179,113, 75);
      ellipse(a, b, 5, 5);
    }

  }

  function summerColors(a, b, monthHold){
    if(monthHold == 6 || monthHold == 7 || monthHold == 8 ){
        noStroke();
        fill(220,20,60, 75);
        ellipse(a, b, 5, 5);
    }

  }

  function fallColors(a, b, monthHold){
    if(monthHold == 9 || monthHold == 10 || monthHold == 11 ){
        noStroke();
        fill(255,165,0, 75);
        ellipse(a, b, 5, 5);
    }


  }

}




