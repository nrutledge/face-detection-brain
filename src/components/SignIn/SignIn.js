import React from 'react';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('https://fierce-ravine-76640.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(res => res.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="w-90 mw6 center br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5" style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
				<main className="pa4 black-80">
				  <div className="measure center">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Log In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email"
				        	name="email-address" 
				        	id="email-address" 
				        	onChange={this.onEmailChange}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password" 
				        	onChange={this.onPasswordChange}
				        />
				      </div>	
				    </fieldset>
				    <div className="">
				      <input 				      	
				      	className="ma2 b ph3 pv2 input-reset ba br2 b--black bg-transparent grow pointer f6 dib"
				      	type="submit"
				      	value="Log In" 
				      	onClick={this.onSubmitSignIn}
				      />
				    </div>
				    <p onClick={() => onRouteChange('signUp')} className="pointer">Sign Up</p>
				  </div>
				</main>
			</article>
		);		
	}
}

export default SignIn;