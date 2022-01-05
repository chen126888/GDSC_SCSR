// Material Components
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// Main Components

// Styles

// Hooks and Function
import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

const ColumnItem = props => {
    const data = props.data;
    return (
        <Grid item>
            <Button variant="contained">
                {data.name}
            </Button>
        </Grid>
    );
};

const RouteMapColumnItems = props => {
    const columnItems = [];
    const data = props.data;
    // console.log(data)
    for (let i = 0; i < data.length; i++) {
        columnItems.push(<ColumnItem data={data[i]} />)
    }
    return (
        <Grid container direction="column">
        {columnItems}
        </Grid>
    );
};

const RouteMapColumn = props => {
    const data = props.data;
    // console.log(data)
    // console.log(data.courses)
    return (
        <Grid item>
            <div>{data.semester}</div>
            <RouteMapColumnItems data={data.courses}/>
        </Grid>
    )
};

const RouteMap = props => {
    const gridItems = [];
    for (let i = 0; i < props.data.length; i++) {
        gridItems.push(
            <Grid item>
                <RouteMapColumn data={props.data[i]}/>
            </Grid>
        );
    }
    return (
        <Grid container spacing={2} justifyContent="space-evenly">
        {gridItems}
        </Grid>
    )
};

export default RouteMap;