import React from 'react';
import './Facerecognition.css';
const Facerecognition= ({box,imageurl}) =>{
	return (
     <div className='Center ma'>
       <div className='absolute mt2'>
        <img id='inputimage' alt='detect image' width='500px' height='auto' src={imageurl}/>
        <div className='boundbox' style={{top: box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
        </div>
     </div>
	);
}
export default Facerecognition;