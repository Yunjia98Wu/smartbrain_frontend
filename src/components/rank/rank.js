import React from 'react';

const Rank= ({name,entries}) =>{
     return (
     <div>
        <div className='white f2'>
          {name}
           
        </div>
        <div className='white f4'>
          {'your entries is '}
           
        </div>
        <div className='white f2'>
          {entries}
        </div>
     </div>
     );
}
export default Rank;