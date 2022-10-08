import React from 'react'
import { useSelector } from 'react-redux';

function Courses() {
  
  const user = useSelector((state) => state.userDetails.user);

  return (
    <div>
        <div className='py-3 card m-3 rounded shadow'>
            <h5 className='text-success fs-2 text-normal fw-400 mx-3'>
                Courses <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </h5>
            
        </div>
    </div>
  )
}

export default Courses