import React from 'react';

const ImageLinkForm = ({ imageURL, onInputChange, onImageSubmit }) => {
	return (
		<div className='mb4 w-90 mw7 center'>
			<p className="f4 mt0">
				{'Add an image URL below and the Magic Brain will guess the age of whoever is in the photo.'}
			</p>
			<div className='form pa4 br3 shadow-5 center' style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
				<input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
				<button className="f4 w-30 grow link ph3 pv2 dib white bg-light-purple" onClick={onImageSubmit}>Submit</button>
			</div>
		</div>
	);
};

export default ImageLinkForm;