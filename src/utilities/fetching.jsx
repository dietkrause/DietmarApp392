import React, { useState, useEffect } from 'react';


function useFetching(url) {
    // status 0: loading
    // status 1: error
    // status 2: success
  
    const [data, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const result = {"status":0,"data":null,"message":""};
  
    useEffect(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setCourses(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, [url]);
  
    if (loading) {
      result.status = 0;
      result.message = "Loading..."
      return result;
    }
  
    if (error) {
      result.status = 1
      result.message = error.message
      return result;
    }
    result.status = 2;
    result.data = data;
    result.message = "200 OK";
    //console.log(result.data);
    return result;
  }
  
  export default useFetching;