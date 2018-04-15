import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
	return(
		<div className="ma0 ml2 mt3">
			<Tilt className="Tilt" options={{ max : 40 }} style={{ height: 150, width: 300 }} >
 				<div className="Tilt-inner flex items-center">
 					<img alt='logo' src={brain} />
 					<h3>Face Detection Brain</h3>
 				</div>
			</Tilt>
		</div>
	);
};

export default Logo;