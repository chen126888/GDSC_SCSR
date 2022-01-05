// Material Components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// Main Components
import TabLabel from './CourseRouteTabLabel';
import CourseRouteTabBar from './CourseRouteTabBar';
import RouteMap from "./CourseRouteMap";
import { DummybuttonCustom } from '../Main/DummyComponent';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/styles';
import MinimizeIcon from '@mui/icons-material/Minimize';
// Hooks and Function
import { useState, Fragment } from 'react';
import { useAxiosEffect } from '../../hooks/useAxios';
import { childPropsGiver } from '../FancyFrame/FrameFunctions';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => createStyles({
    tabBarItem: {
      fontSize: theme.spacing(3),
    },
    tabMain: {
      flexGrow: 14,
      overflowY: "scroll",
      /** scrollbar hidden */
      "-ms-overflow-style": 'none',
      "scrollbar-width": 'none',
      "&::-webkit-scrollbar": {
        display: 'none'
      },
      borderBottomLeftRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      padding: theme.spacing(2),
      boxShadow: `inset ${theme.spacing(0)}px ${theme.spacing(1)}px ${theme.spacing(1)}px rgba(0, 0, 0, 0.25)`,
    },
    tabFrame: {
      overflowY: "scroll",
      /** scrollbar hidden */
      "-ms-overflow-style": 'none',
      "scrollbar-width": 'none',
      "&::-webkit-scrollbar": {
        display: 'none'
      },
      height: '100%',
      width: "100%",
      margin: 0,
      padding: 0,
    },
    tabContent: {
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
  
      
    },
    Button: props => ({
      // borderTopLeftRadius: theme.spacing(props.spacingLv),
      color: 'white !important',
      height: '100%',
    }),
  
  }));

 const dummyRouteMapData = [
    {
        "semester": "Freshman-Fall",
        "courses": [
            {
                "name": "aaa00101",
                "typeGroup": "",
                "prerequisiteGroup": [0],
                "note": "",
            },
            {
                "name": "aaa00201",
                "typeGroup": "",
                "prerequisiteGroup": [1],
                "note": "",
            },
        ]
    },
    {
        "semester": "Freshman-Spring",
        "courses": [
            {
                "name": "aaa00102",
                "typeGroup": "",
                "prerequisiteGroup": [0],
                "note": "",
            },
            {
                "name": "aaa00202",
                "typeGroup": "",
                "prerequisiteGroup": [1, 2],
                "note": "",
            },
        ]
    },
    {
        "semester": "Sophomore-Fall",
        "courses": [
            {
                "name": "bbb00101",
                "typeGroup": "",
                "prerequisiteGroup": [0],
                "note": "",
            },
            {
                "name": "bbb00201",
                "typeGroup": "",
                "prerequisiteGroup": [2],
                "note": "",
            },
            {
                "name": "bbb00301",
                "typeGroup": "A",
                "prerequisiteGroup": [0],
                "note": "",
            },
        ]
    },
    {
        "semester": "Sophomore-Spring",
        "courses": [
            { "name": "bbb00102" },
            { "name": "bbb00202" }
        ]
    },
    {
        "semester": "Junior-Fall",
        "courses": [
            { "name": "ccc00101" },
            { "name": "ccc00201" }
        ]
    },
    {
        "semester": "Junior-Spring",
        "courses": [
            { "name": "ccc00102" },
            { "name": "ccc00202" }
        ]
    },
    {
        "semester": "Senior-Fall",
        "courses": [
            { "name": "ddd00101" },
            { "name": "ddd00201" }
        ]
    },
    {
        "semester": "Senior-Spring",
        "courses": [
            { "name": "ddd00102" },
            { "name": "ddd00202" }
        ]
    }
]

  const RouteTabs = ({ BarTaker, frameSize }) => {
    const classes = useStyles();
    const [ labels, setLables ] = useState([1,2]);

    const { response: contents, loading, error } = useAxiosEffect({
        method: 'GET',
        url: '/dummyRouteMapData.json',
        headers: {
          accept: "application/json",
        },
        responeDefault: [
            {
                "semester": "default",
                "courses": [
                    {
                        "name": "default",
                        "typeGroup": "",
                        "prerequisiteGroup": [0],
                        "note": ""
                    }
                ]
            }
        ],
        sideEffect: () => {
          setLables(contents.length);
        }
    });

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => setValue(newValue);
  
    // Bar Add
    const TabBarWithProps = childPropsGiver(BarTaker, {
      buttonCustom: [
        (<DummybuttonCustom key={0} />),
        (<DummybuttonCustom key={1} />)
      ],
      panelCustom: (
        <CourseRouteTabBar
          onChange={handleChange}
          labels={labels}
          value={value}
        />
      ),
    })

    const TabMain = (
      <Box component="main" className={classes.tabMain} >
        <RouteMap data={contents}/>
      </Box>
    );

    return (
    <Fragment >
        {TabBarWithProps}
        {TabMain}
    </Fragment>
    );
  }

  export default RouteTabs;