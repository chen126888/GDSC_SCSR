/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';

const useAxiosConfig = axios.create({
  baseURL: process.env.PUBLIC_URL,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * useAxiosEffect
 *  A axios hook which you can set default value for response
 * when loading is failed or not yet loaded, and do side effect 
 * like useEffect doing for once.
 * @param {Object} axiosParams 
 * @param {String} axiosParams.method the axios method
 * @param {String} axiosParams.url the url of data you want
 * @param {String} axiosParams.header the headers of axios
 * @param {String} axiosParams.data the data when request and post
 * @param {Function} axios.sideEffect the side effect you want to execute when 
 *  loaded successfully.
 * @returns { Object, String, Boolen }
**/
const useAxiosEffect = (axiosParams) => {
  const [response, setResponse] = useState(
    clsx(axiosParams.responeDefault) ? axiosParams.responeDefault : undefined
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async (params) => {
    try {
      const result = await useAxiosConfig.request(params);
      setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
    if (clsx(axiosParams.sideEffect)) {
      axiosParams.sideEffect()
    }
    console.log(axios.defaults.baseURL);
  }, []); // execute once only

  return { response, error, loading };

}

useAxiosEffect.defaultProps = {
  url: process.env.PUBLIC_URL+'/dummyCourseData.json',
  responeDefault: undefined,
  sideEffect: () => {},
}

/**
 * useAxios
 *  A Normal axios hook
 * @param {Object} axiosParams 
 * @returns { Object, String, Boolen }
 */
const useAxios = (axiosParams) => useAxiosEffect({
  ...axiosParams,
  responeDefault: undefined,
  sideEffect: () => {},
})

export { useAxiosEffect, useAxios }