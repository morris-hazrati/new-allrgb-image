import React, { Component } from "react";

const Pixel = (props) => {
  //helper function to change the format of the color to be pass as props
  const formatColor = (colorObject) => {
    let rFactor = colorObject.r;
    let gFactor = colorObject.g;
    let bFactor = colorObject.b;

    return `rgb(${rFactor}, ${gFactor}, ${bFactor})`;
  };

  let w = props.pixelWidth;
  // let w;
  // if (props.iterationFactor === 8) {
  //   w = 4;
  // }
  // if (props.iterationFactor === 16) {
  //   w = 32;
  // }
  // switch (props.iterationFactor) {
  //   case 8:
  //     w = 4;
  //   case 16:
  //     w = 32;
  // }
  // let w = (props.iterationFactor / 8) ** 3 * (props.iterationFactor / 2);
  // console.log("w is: ", w);
  return (
    // const { color } = this.props;

    //a div with the sizes of 1*1 pixel
    <div
      style={{
        display: "inline-block",
        margin: 0,
        height: w,
        width: w,

        //use template literals to pass the color dynamically
        backgroundColor: `${formatColor(props.color)}`,
      }}
      className="App"
    ></div>
  );
};

export default Pixel;
