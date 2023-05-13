import React from 'react';
import { useContext,useEffect } from 'react';
import noteContext from '../context/notes/noteContext';


export const About = () => {
  //used for understanding of context api
  // const a = useContext(noteContext)

  // //using useEffect Hook to change the state
  // useEffect(() => {    
  //     a.update();
  //     //eslint-disable-next-line
  // },[])  

  return (
    // using the context we can access the name here
    <div>This is About  and he is in class </div>
  )
}
export default About