import React from 'react'
import { Link } from 'react-router-dom'
function Card2 (
{Headline,
 Textline,
}


){
  return (<section className='Janes'>
      <h1>{Headline}</h1>
      <p>{Textline}</p>
    </section>
  );
    
}
export default Card2;

