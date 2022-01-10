// Material Components
import Button from '@mui/material/Button';
// Main Components
import { SaveIcon, SendIcon, SavingIcon } from '../../image/CourseBar/Function';
// Styles
import { makeStyles, createStyles } from '@mui/styles';
// Hooks and Function
import { useState, Fragment } from 'react';
import { useAxiosEffect } from '../../hooks/useAxios';
import PropTypes from 'prop-types';
import clsx from 'clsx';


function SaveButton (props) {

  const [ syncState, setSyncState ] = useState(false);
  const { response: contents, loading, error } = useAxiosEffect({
    method: 'POST',
    url: '/dummyPost.json',
    headers: {
      accept: "application/json",
    },
    data: JSON.stringify([{
      "Mon": [], "Tue": [], "Wed": [], "Thu": [],
      "Fri": [], "Sat": [], "Sun": []
    }]),
  });

  if (clsx(error)) {
    console.log(error);
  }

  return (
    <Button color='antiPrimary' >
      <SaveIcon fontSize='large' color='primary' />
    </Button>
  )
}

export { SaveButton };

