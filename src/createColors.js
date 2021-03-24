// This service function will create an array of 32768 RGB color objects
// Each color object has the format of { r : 8 , g : 256 , b : 8}

export const createColors = (iterationFactor) => {
  console.log("iterationFactor in createColors Function: ", iterationFactor);
  //colors will hold all the colors
  let colors = [];
  //colorNumber will be the key for object creation purpose only
  let colorNumber = 0;

  //Iterating for Red factor
  for (let r = iterationFactor; r <= 256; r += iterationFactor) {
    //Iterating for Green factor
    for (let g = iterationFactor; g <= 256; g += iterationFactor) {
      //Iterating for Blue factor
      for (let b = iterationFactor; b <= 256; b += iterationFactor) {
        //Putting new color into the colors
        colors[colorNumber] = { r, b, g };
        colorNumber++;
      }
    }
  }
  console.log("number of colors created is: ", colors.length);
  return colors;
};

console.log("Hi, this is node js....");
var colors = [
  { r: 0, b: 250, g: 100 },
  { r: 23, b: 256, g: 24 },
  { r: 0, b: 100, g: 256 },
  { r: 24, b: 16, g: 256 },
  { r: 256, b: 5, g: 34 },
  { r: 1, b: 256, g: 256 },
  { r: 90, b: 0, g: 256 },
  { r: 256, b: 0, g: 23 },
  { r: 256, b: 22, g: 256 },
  { r: 90, b: 256, g: 256 },
  { r: 25, b: 21, g: 256 },
  { r: 190, b: 256, g: 0 },
  { r: 256, b: 32, g: 92 },
  { r: 256, b: 75, g: 256 },
  { r: 256, b: 10, g: 256 },
  { r: 1, b: 256, g: 60 },
  { r: 56, b: 222, g: 256 },
  { r: 25, b: 256, g: 234 },
  { r: 7, b: 256, g: 9 },
  { r: 70, b: 0, g: 0 },
  { r: 256, b: 200, g: 200 },
  { r: 0, b: 256, g: 256 },
  { r: 256, b: 40, g: 256 },
  { r: 0, b: 0, g: 256 },
];

console.log(colors.length);
var filteredColors = colors.filter((color) => colors.indexOf(color) % 2 == 0);
console.log(filteredColors.length);
