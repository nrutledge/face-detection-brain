import React from 'react';

const Navigation = ({ isSignedIn, onRouteChange }) => {
	if (isSignedIn) {
		return(
			<nav>
				<p onClick={() => onRouteChange('signIn')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
			</nav>
		);
	} else {
		return(
			<nav></nav>
		);		
	}



};

export default Navigation;