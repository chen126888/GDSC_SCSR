// Material Components

// Main Components
import CourseItem from './SheetItem';
// Styles

// Hooks and Function

const rowDisplayRuleBound = stackArray => {
  let firstClassTime = 10;
  let lastClassTime = 15;

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

const generateArrange = courseDataObject => {
  let stackArray = Array.from({ length: 24 }, (e, i) => 0);
  let scheduleArray = Array.from({ length: 24 }, (e, i) => []);

  if (courseDataObject.length !== 0) {
    courseDataObject.forEach((e, i) => {
      e.time.forEach((clock, j) => {
        stackArray[clock] += 1;
        scheduleArray[clock].push(i);
      });
    });
  };

  let stackNum = Math.max(...stackArray);
  let positionMatrix = Array.from({ length: stackNum }, (e, i) => (
    Array.from({ length: 24 }, (e, i) => -1)
  ));

  if (courseDataObject.length !== 0) {
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
  };
  let { firstClassTime, lastClassTime } = rowDisplayRuleBound(stackArray);

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

  return {
    stackArray, stackNum, firstClassTime, lastClassTime, positionMatrix
  }
};

const calcCoursePosition = (
  positionMatrix, firstClassTime, itemHeight, stackArray, stackNum
) => {
  let configMatrix = positionMatrix.map((stack, i) => {
    let unitConfig = {
      "id": -1,
      "top": 0,
      "left": i,
      "width": stackNum > 2 ? 40 : stackNum > 1 ? 50 : 100,
      "height": 0,
      "itemHeight": itemHeight,
      "isFullWidth": true,
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
          configColumn[indexConfig]["isFullWidth"] &= (stackArray[i] === 1);
        }
      } else {
        if ((courseIndex === -1) || (lastIndex !== -1)) {
          indexConfig += 1;
          configColumn[indexConfig] = { ...unitConfig };
        }
        if (courseIndex !== -1) {
          configColumn[indexConfig]["height"] += 1;
          configColumn[indexConfig]["id"] = courseIndex;
          configColumn[indexConfig]["isFullWidth"] &= (stackArray[i] === 1);
        }
      };
      lastIndex = courseIndex;
    });
    configColumn.pop();
    configColumn.forEach((config, i) => {
      config["top"] -= config["height"] + firstClassTime
    })
    return configColumn
  });
  return configMatrix
};

const renderColumn = (
  courseDataObject, positionMatrix,
  weekFirstClassTime, itemHeight, stackArray, stackNum
) => {
  let configMatrix = calcCoursePosition(
    positionMatrix, weekFirstClassTime, itemHeight, stackArray, stackNum
  );

  let renderResult = [];
  configMatrix.forEach((column, i) => {
    column.forEach((courseConfig, j) => {
      renderResult.push(
        <CourseItem
          key={`${i}-${j}`}
          courseTitle={courseDataObject[courseConfig.id].name}
          courseState={courseDataObject[courseConfig.id].state}
          itemConfig={courseConfig}
          courseInfo={courseDataObject[courseConfig.id].info_simple}
          courseTime={courseDataObject[courseConfig.id].time}
        />
      )
    })
  })
  return renderResult
};

let dummyData = [
  {
    "name": "blabla1",
    "time": [5, 9, 10],
    "state": "selected",
    "info_simple": {
      "teacher": "Prof.blabla",
      "course_id": "",
      "type":"",
    },
  }, {
    "name": "blabla2",
    "time": [9, 10, 11],
    "state": "selected",
    "info_simple": {
      "teacher": "Prof.blabla",
      "course_id": "",
      "type":"",
    },
  },
]

let dummyWeekData = {
  "Mon": [
    {
      "name": "blabla1",
      "time": [5, 9, 10],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    }, {
      "name": "blabla2",
      "time": [9, 10, 11],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    },
  ],
  "Tue": [
    {
      "name": "blabla1",
      "time": [5, 9, 10],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    }, {
      "name": "blabla2",
      "time": [9, 10, 11],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    },
  ],
  "Wed": [
    {
      "name": "blabla1",
      "time": [5, 9, 10],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    }, {
      "name": "blabla2",
      "time": [9, 10, 11],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    },
  ],
  "Thu": [
    {
      "name": "blabla1",
      "time": [5, 9, 10],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    }, {
      "name": "blabla2",
      "time": [9, 10, 11],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    },
  ],
  "Fri": [
    {
      "name": "blabla1",
      "time": [5, 9, 10],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    }, {
      "name": "blabla2",
      "time": [9, 10, 11],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    },
  ],
  "Sat": [
    {
      "name": "blabla1",
      "time": [5, 9, 10],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    }, {
      "name": "blabla2",
      "time": [9, 10, 11],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    },
  ],
  "Sun": [
    {
      "name": "blabla1",
      "time": [5, 9, 10],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    }, {
      "name": "blabla2",
      "time": [9, 10, 11],
      "state": "selected",
      "info_simple": {
        "teacher": "Prof.blabla",
        "course_id": "",
        "type":"",
      },
    },
  ]
}

export {
  generateArrange, calcCoursePosition,
  rowDisplayRuleBound, renderColumn,
  dummyData, dummyWeekData
};