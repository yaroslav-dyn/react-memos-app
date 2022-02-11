import React from 'react';
import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();

  const redirectMain = () => {
    history.push('/');
  }
   return (
    <div>
      <h2>About Page</h2>
      <button onClick={redirectMain}>Go to Home</button>
    </div>
   )

}//

export default About;
