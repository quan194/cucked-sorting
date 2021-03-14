import React, { useState, useEffect } from "react";
import {getBubbleSortAnimations} from './bubbleSort'
import {getQuickSortAnimations, doQuickSort, quickSortPartition} from './quickSort'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import "./Visualization.css";
import { makeStyles } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';

function Visualization() {
  const generateButtonStyle = {
    backgroundColor: '#118ab2',
    color: "white",
    fontWeight: "bold",
    marginLeft: "5px",
    marginRight: '5px'
  };

  const useStyle = makeStyles({
    root: {
      minHeight: 200
    }
  })

  const classes = useStyle();

  const [ANIMATION_SPEED_MS, setAnimationSpeed] = useState(100);
  const [array, setArray] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [sorted, setSorted] = useState(false);
  const resetArray = () => {
    setSorted(false);
    const array = [];
    for (let i = 0; i < 50; i++) {
      array.push(Math.floor(Math.random() * 150) + 10);
    }
    setArray(array);
    console.log(array);
  };

  // generate array on load
  useEffect(() => {
    resetArray();
  }, []);

  //bubbleSorting
  const bubbleSort = () => {
    if (sorted === true) {
      return;
    }
    setDisabled(true);
    var animations = getBubbleSortAnimations(array);
    var arrayBar = document.getElementsByClassName("individual-bar");
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        // take index of switching position
        var [oldPosition, newPosition] = animations[i];
        // console.log("old position " + oldPosition);
        // console.log("new position " + newPosition);

        // take style of arrayBar
        var oldBarStyle = arrayBar[oldPosition].style;
        var newBarStyle = arrayBar[newPosition].style;

        // swap the array value, for example array[oldpos] = 81, array[newpos] = 16
        // after swapping, array[oldpos] = 16, array[newpos] = 81
        // console.log("array[oldposition] " + array[oldPosition]);
        // console.log("array[newposition] " + array[newPosition]);
        var tmp = array[oldPosition];
        array[oldPosition] = array[newPosition];
        array[newPosition] = tmp;
        // console.log("array[oldposition] " + array[oldPosition]);
        // console.log("array[newposition] " + array[newPosition]);

        oldBarStyle.height = `${array[oldPosition]}px`;
        // console.log("oldbarStyle.height = array[oldPosition] = " + oldBarStyle.height);
        newBarStyle.height = `${array[newPosition]}px`;
        // console.log("newbarStyle.height = array[newPosition] = " + newBarStyle.height);

        // change color
        oldBarStyle.backgroundColor = "red";
        newBarStyle.backgroundColor = "blue";

        var currentPosition = oldPosition;
        for (let j = 0; j < currentPosition; j++) {
          var jBarStyle = arrayBar[j].style;
          jBarStyle.backgroundColor = "#06d6a0";
        }

        if (i === animations.length - 1) {
          for (let k = 0; k < arrayBar.length; k++) {
            arrayBar[k].style.backgroundColor = "#06d6a0";
            setDisabled(false);
            setSorted(true);
          }
        }
      }, i * (ANIMATION_SPEED_MS/5));
    }
  }

  // quickSorting
  const quickSort = () => {
    if (sorted === true) {
      return;
    }
    setDisabled(true);
    // console.log(disabled);
    var animations = getQuickSortAnimations(array)
    console.log(animations)
    var arrayBar = document.getElementsByClassName("individual-bar");
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() =>{
        // take index of switching position
        var [oldPosition, newPosition] = animations[i];

        // take style of arrayBar
        var oldBarStyle = arrayBar[oldPosition].style;
        var newBarStyle = arrayBar[newPosition].style;

        var tmp = array[oldPosition];
        array[oldPosition] = array[newPosition];
        array[newPosition] = tmp;

        oldBarStyle.height = `${array[oldPosition]}px`;
        newBarStyle.height = `${array[newPosition]}px`;

        oldBarStyle.backgroundColor = "red";
        newBarStyle.backgroundColor = "blue";

        // var [oldPosition, newPosition] = animations[i];

        // var oldBarStyle = arrayBar[oldPosition].style;
        // var newBarStyle = arrayBar[newPosition].style;
        // var index;
        // const dummyAnimations = [];
        // if (array.length > 1) {
        //   index = quickSortPartition(dummyAnimations, array, 0, array.length - 1); //index returned from partition
        //   if (0 < index - 1) {
        //     //more elements on the left side of the pivot
        //     doQuickSort(dummyAnimations, array, 0, index - 1);
        //   }
        //   if (index < array.length) {
        //     //more elements on the right side of the pivot
        //     doQuickSort(dummyAnimations, array, 0, array.length - 1);
        //   }
        // }

        // oldBarStyle.height = `${array[oldPosition]}px`;
        // newBarStyle.height = `${array[newPosition]}px`;

        // oldBarStyle.backgroundColor = "red";
        // newBarStyle.backgroundColor = "blue";

        var currentPosition = oldPosition;
        for (let j = 0; j < currentPosition; j++) {
          var jBarStyle = arrayBar[j].style;
          jBarStyle.backgroundColor = "green";
        }

        if (i === animations.length - 1) {
          for (let k = 0; k < arrayBar.length; k++) {
            arrayBar[k].style.backgroundColor = "#06d6a0";
            setDisabled(false);
            setSorted(true);
          }
        }
      }, i * ANIMATION_SPEED_MS)
    }
  }

  return (
    <div className="total-app-holder">
      <Card className={classes.root}>
        <CardContent>
          <div className="bar-container">
            {array.map((x, idx) => (
              <div
                className="individual-bar"
                key={idx}
                style={{ height: `${x}px` }}
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="buttons">
        <Button variant="contained" style={generateButtonStyle} onClick={resetArray} disabled={disabled}>Generate</Button>
        <Button variant="contained" style={generateButtonStyle} onClick={bubbleSort} disabled={disabled}>BubbleSort</Button>
        <Button variant="contained" style={generateButtonStyle} onClick={quickSort} disabled={disabled}>QuickSort</Button>
        <Button variant="contained" style={generateButtonStyle} onClick={() => {setAnimationSpeed(100)}} disabled={disabled}>Normal Speed</Button>
        <Button variant="contained" style={generateButtonStyle} onClick={() => {setAnimationSpeed(50)}} disabled={disabled}>X2 Speed</Button>
        <Button variant="contained" style={generateButtonStyle} onClick={() => {setAnimationSpeed(25)}} disabled={disabled}>X4 Speed</Button>
      </div>
    </div>
  );
}

export default Visualization;