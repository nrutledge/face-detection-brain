import React from 'react';




  const FaceBoxes = ({faces}) => {
  	return (
  		<div>
  			{
  				faces.map((face, i) => {
            return (
              <div 
                className='absolute ba bw2 b--red f3 b tr f5' 
                style={
                  {
                    id: i,
                    top: face.top,
                    right: face.right,
                    bottom: face.bottom,
                    left: face.left,
                    zIndex: 100,
                    color: '#FF0000'
                  }
              }>
              <div style={{position: 'relative', top: '-50px'}}>{'Age: ' + face.age}</div>
              </div>
            );
  				})
  			}
  		</div>
  	);
  }


export default FaceBoxes;