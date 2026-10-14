// Day 7 - Exercise 1: Custom Hook useFetch
// Author: Penumuru Madhu Sudhan Reddy
import { useState,useEffect } from 'react';

export function useFetch<T>(url: string){
  const [data,setData]=useState<T|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);

  useEffect(()=>{
    if(!url){
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(url)
      .then(res=>res.json())
      .then(d=>{
        setData(d);
        setLoading(false);
      })
      .catch(e=>{
        setError(e.message);
        setLoading(false);
      });
  },[url]);

  return { data,loading,error };
}
