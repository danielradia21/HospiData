
import * as React from 'react';



export function BtnModal({handleChangeModel}) {



    return ( 
        <div className='flex column hero-modal'>
                    <h1>Chosse a option</h1>
                    <button onClick={()=> handleChangeModel('patient')} className='main-btn'>Join as Patient</button>
                    <button onClick={()=> handleChangeModel('enterKey')} className='main-btn'>Join as Doctor</button>
         </div>
    );
}
