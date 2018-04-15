import React from 'react';
import FaceBoxes from '../FaceBoxes/FaceBoxes';

const FaceRecognition = ({ imageURL, faces }) => {
	return (
		<div className='mb4 w-90 w-75-m w-50-l center'>
			<div className='relative'>
				<img id='image' alt='' src={imageURL} style={{width: 'min-content'}}/>
				<FaceBoxes faces={faces} />   
			</div>
		</div>
	);
}

export default FaceRecognition;