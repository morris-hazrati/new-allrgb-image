import Pixel from "./pixel";
import React, { Component } from "react";
import { createColors } from "./createColors";
import "./App.css";

class App extends Component {
  state = {
    iterationFactor: 8,
    imageWidth: 1024,
    pixelWidth: 4,
    colors: [
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
    ],
  };
  componentDidMount() {
    console.log(this.state.iterationFactor);
    const newColors = createColors(this.state.iterationFactor);
    this.setState({ colors: newColors });
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  handleSortRed = () => {
    const sortedColors = this.state.colors.sort((c1, c2) =>
      c1.r < c2.r ? 1 : -1
    );
    this.setState({ colors: sortedColors });
  };

  handleSortGreen = () => {
    const sortedColors = this.state.colors.sort((c1, c2) =>
      c1.g < c2.g ? 1 : -1
    );
    this.setState({ colors: sortedColors });
  };

  handleSortBlue = () => {
    const sortedColors = this.state.colors.sort((c1, c2) =>
      c1.b < c2.b ? 1 : -1
    );
    this.setState({ colors: sortedColors });
  };

  handleShuffle = () => {
    // // console.log("shuffle clicked");
    // const test = [1, 2, 3, 4, 5];
    // // const colors = { ...this.state.colors };
    // // console.log("Before shuffling: ", this.state.colors[0]);
    // // console.log("test before: ", test);
    // // const shuffledColors = this.shuffleArray(colors);
    // const testShuffled = this.shuffleArray(test);
    // // console.log("test after: ", testShuffled);
    // // this.setState({ colors: shuffledColors });

    let shuffledColors = this.shuffleArray(this.state.colors);
    // console.log("After shuffling: ", shuffledColors[0]);
    this.setState({ colors: shuffledColors });
  };

  handleDecreaseColors = () => {
    console.log("Decrease clicked");
    console.log(
      "color numbers before: ",
      this.state.colors.length,
      this.state.pixelWidth
    );
    var decreasedColors = this.state.colors.filter(
      (color) => this.state.colors.indexOf(color) % 4 == 0
    );

    let newPixelWidth = this.state.pixelWidth * 2;

    this.setState({ pixelWidth: newPixelWidth });

    // const newColors = createColors(newIterationFactor);
    this.setState({ colors: decreasedColors });
    console.log("color numbers after: ", decreasedColors.length, newPixelWidth);

    // this.setState({ iterationFactor: newIterationFactor });
  };

  handleDecreaseImage = () => {
    console.log("Decrease image clicked!!!");
    console.log("imageWidth before: ", this.state.imageWidth);
    const newImageWidth = this.state.imageWidth / 2;
    this.setState({ imageWidth: newImageWidth });
    console.log("imageWidth after: ", this.state.imageWidth);
    const newPixelWidth = this.state.pixelWidth / 2;
    this.setState({ pixelWidth: newPixelWidth });
  };

  handleIncreaseImage = () => {
    console.log("Decrease image clicked!!!");
    console.log("imageWidth before: ", this.state.imageWidth);
    const newImageWidth = this.state.imageWidth * 2;
    this.setState({ imageWidth: newImageWidth });
    console.log("imageWidth after: ", this.state.imageWidth);
    const newPixelWidth = this.state.pixelWidth * 2;
    this.setState({ pixelWidth: newPixelWidth });
  };

  handleReset = () => {
    const newColors = createColors(this.state.iterationFactor);
    this.setState({ colors: newColors });
    this.setState({ pixelWidth: 4 });
    this.setState({ imageWidth: 1024 });
  };

  render() {
    const pixelWidth = this.state.imageWidth / 256;
    console.log("pixelwidth: ", pixelWidth);
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <div className="btns-container">
                  <button
                    onClick={this.handleSortRed}
                    className="btn btn-primary"
                  >
                    Sort Red
                  </button>
                  <button
                    onClick={this.handleSortGreen}
                    className="btn btn-primary"
                  >
                    Sort Green
                  </button>
                  <button
                    onClick={this.handleSortBlue}
                    className="btn btn-primary"
                  >
                    Sort Blue
                  </button>
                </div>
              </div>
              <div className="col-sm">
                <span className="badge badge-success">
                  Total Number of Colors: {this.state.colors.length}
                </span>
                <span className="badge badge-success">
                  The Image Size: {this.state.imageWidth}px X{" "}
                  {this.state.imageWidth / 2}px
                </span>
              </div>
              <div className="col-sm">
                <div className="btns-container">
                  <button
                    onClick={this.handleShuffle}
                    className="btn btn-primary"
                  >
                    Shuffle Colors
                  </button>
                  <button
                    onClick={this.handleDecreaseColors}
                    className="btn btn-primary"
                    disabled={this.state.colors.length === 2 ? true : false}
                  >
                    Decrease Colors
                  </button>
                  <button
                    onClick={this.handleDecreaseImage}
                    className="btn btn-primary"
                    disabled={this.state.imageWidth === 64 ? true : false}
                  >
                    Shrink
                  </button>
                  <button
                    onClick={this.handleIncreaseImage}
                    className="btn btn-primary"
                    disabled={this.state.imageWidth === 1024 ? true : false}
                  >
                    Enlarge
                  </button>
                  <button
                    onClick={this.handleReset}
                    className="btn btn-primary"
                    disabled={
                      this.state.colors.length === 32768 &&
                      this.state.imageWidth === 1024
                        ? true
                        : false
                    }
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              width: this.state.imageWidth,
              hieght: this.state.imageWidth / 2,
              backgroundColor: "yellow",
              //to have pixel components to cover like bricks, flex style used
              display: "flex",
              //to be wrap to the next line, flexwrap used
              flexWrap: "wrap-reverse",
            }}
          >
            {this.state.colors.map((color) => (
              <Pixel
                key={`${color.r}+${color.g}+${color.b}`}
                iterationFactor={this.state.iterationFactor}
                color={color}
                pixelWidth={this.state.pixelWidth}
              />
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
