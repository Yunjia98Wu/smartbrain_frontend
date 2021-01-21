import React from 'react';
import './Imagelineform.css';
const Imagelineform= ({onInputChange,onButtonSubmit}) =>{
	return (
     <div>
     	<p className="f3">
     	{'This smart brain will detect face for your image'}
     	</p>
     	<div className='Center'>
     	 <div className=' form Center pa4 br3 shadow-5'>
     	   <input type='tex' className='f4 pa2 center w-70' onChange={onInputChange}/>
     	   
     	   <button className='f4 center link ph3 w-30 bg-light-pink' onClick={onButtonSubmit}>detect</button>
     	 </div>
     	</div>
     </div>
	);
}
export default Imagelineform;