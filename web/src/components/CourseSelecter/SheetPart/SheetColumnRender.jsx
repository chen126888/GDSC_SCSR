// Material Components

// Main Components

// Styles

// Hooks and Function

const generateArrange = courseDataObject => {
  let stackArray = Array.from({ length: 24 }, (e, i) => 0);
  let scheduleArray = Array.from({ length: 24 }, (e, i) => []);

  courseDataObject.forEach((e, i) => {
    e.time.forEach((clock, j) => {
      stackArray[clock] += 1;
      scheduleArray[clock].push(i);
    });
  });
  let stackNum = Math.max(...stackArray);

  let positionMatrix = Array.from({ length: stackNum }, (e, i) => (
    Array.from({ length: 24 }, (e, i) => -1)
  ));

  courseDataObject.forEach((e, i) => {
    for (let stackIndex = 0; stackIndex < stackNum; stackIndex++) {
      let isClear = true;
      e.time.forEach((hour, j) => {
        isClear &= (positionMatrix[stackIndex][hour] === -1);
      })

      if (isClear) {
        e.time.forEach((hour, j) => {
          positionMatrix[stackIndex][hour] = i;
        })
        break;
      }
    }

  });

  /**
   * stackArray: 統計每個小時裡有幾門課
   *  - structure:
   *    [ numOfCourse for 00:00, numOfCourse for 01:00, ... ] for 24 hours
   * scheduleArray: 列出這個小時內列選的課程序號矩陣,0在矩陣上表示沒有課程
   *  - structure:
   *    [[ index1 for course at 00:00, index2, ... ] for each stack, ... ] for 24 hours
   *  - positionMatrix: 每一門課在課表上的位置
   * 
   * stackNum: 最高有幾門課排在同一時段
   *  - type: int
   */

  return { stackArray, stackNum, scheduleArray, positionMatrix }
};

const calcCoursePosition = (
  positionMatrix, firstClassTime, stackArray
) => {
  let configMatrix = positionMatrix.map((stack, i) => {
    let unitConfig = {
      "id": -1,
      "top": 0,
      "left": i,
      "width": 1,
      "height": 0,
    }
    let configColumn = [{ ...unitConfig }];
    let indexConfig = 0;
    let lastIndex = -1;
    stack.forEach((courseIndex, i) => {
      configColumn[indexConfig]["top"] = i;
      if (courseIndex === lastIndex) {
        if (courseIndex !== -1) {
          configColumn[indexConfig]["height"] += 1;
          configColumn[indexConfig]["id"] = courseIndex;
        }
      } else {
        if ((courseIndex === -1) || (lastIndex !== -1)) {
          indexConfig += 1;
          configColumn[indexConfig] = { ...unitConfig };
        }
        if (courseIndex !== -1) {
          configColumn[indexConfig]["height"] += 1;
          configColumn[indexConfig]["id"] = courseIndex;
        }
      };
      lastIndex = courseIndex;
    });
    configColumn.pop();
    configColumn.forEach((config, i) => {
      config["top"] -= config["height"] + firstClassTime
    })
    console.log(configColumn)
    return configColumn
  });
  return configMatrix
};

const rowDisplayRuleBound = stackArray => {
  let firstClassTime = 6;
  let lastClassTime = 21;

  for (let stackIndex = 0; stackIndex < 24; stackIndex++) {
    if (stackArray[stackIndex] !== 0) {
      firstClassTime = stackIndex;
      break;
    }
  }
  for (let stackIndex = 0; stackIndex < 24; stackIndex++) {
    if (stackArray[23 - stackIndex] !== 0) {
      lastClassTime = 23 - stackIndex;
      break;
    }
  }

  return { firstClassTime, lastClassTime }
}

const rowDisplayRuleRange = ({
  firstClassTime, lastClassTime
}) => Array.from({ length: 24 }, (e, i) => (
  (firstClassTime <= i) && (i <= lastClassTime)
));



let dummyData = [
  {
    "name": "blabla1",
    "time": [8, 9, 10],
    "state": "selected",
    "info": {
      "teacher": "Prof.blabla",
      "note": "say bla",
    }
  }, {
    "name": "blabla2",
    "time": [9, 10, 11],
    "state": "selected",
    "info": {
      "teacher": "Prof.blabla",
      "note": "say bla",
    }
  }, {
    "name": "blabla3",
    "time": [11, 12, 13],
    "state": "selected",
    "info": {
      "teacher": "Prof.blabla",
      "note": "say bla",
    }
  }, {
    "name": "blabla4",
    "time": [15, 16, 17],
    "state": "selected",
    "info": {
      "teacher": "Prof.blabla",
      "note": "say bla",
    }
  },
]

let dummyAllData = {
  "Mon": [
    {
      "name": "blabla1",
      "time": [8, 9, 10],
      "state": "selected",
      "info": {
        "teacher": "Prof.blabla",
        "note": "say bla",
      }
    }, {
      "name": "blabla2",
      "time": [9, 10, 11],
      "state": "selected",
      "info": {
        "teacher": "Prof.blabla",
        "note": "say bla",
      }
    }, {
      "name": "blabla3",
      "time": [11, 12, 13],
      "state": "selected",
      "info": {
        "teacher": "Prof.blabla",
        "note": "say bla",
      }
    }, {
      "name": "blabla4",
      "time": [15, 16, 17],
      "state": "selected",
      "info": {
        "teacher": "Prof.blabla",
        "note": "say bla",
      }
    },
  ],
  "Tue": [
    {
      "name": "blabla1",
      "time": [8, 9, 10],
      "state": "selected",
      "info": {
        "teacher": "Prof.blabla",
        "note": "say bla",
      }
    }, {
      "name": "blabla2",
      "time": [9, 10, 11],
      "state": "selected",
      "info": {
        "teacher": "Prof.blabla",
        "note": "say bla",
      }
    }, {
      "name": "blabla3",
      "time": [11, 12, 13],
      "state": "selected",
      "info": {
        "teacher": "Prof.blabla",
        "note": "say bla",
      }
    }, {
      "name": "blabla4",
      "time": [15, 16, 17],
      "state": "selected",
      "info": {
        "teacher": "Prof.blabla",
        "note": "say bla",
      }
    },
  ],
  "Wed": [

  ],
  "Thu": [

  ],
  "Fri": [
  ],
  "Sat": [
  ],
  "Sun": [

  ]
}

export {
  generateArrange, calcCoursePosition,
  rowDisplayRuleBound, rowDisplayRuleRange,
  dummyData, dummyAllData
};