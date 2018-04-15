import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Particles from 'react-particles-js';
import './App.css';

// This is a test change.

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
      input: '',
      imageURL: '',
      faceInfo: [],
      route: 'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''  
      }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    fetch('http://localhost:3000/')
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined     
    }});
  }

  convertFaceData = (data) => {
    const regions = data.outputs[0].data.regions;
    console.log(regions);

    const convertedData = regions.map((region) => {
      const age = region.data.face.age_appearance.concepts[0].name;
      const box = region.region_info.bounding_box;
      const top = (box.top_row * 100) + '%';
      const right = ((1 - box.right_col) * 100) + '%';
      const bottom = ((1 - box.bottom_row) * 100) + '%';
      const left = (box.left_col * 100) + '%';
      return {
        age: age,
        top: top,
        right: right,
        bottom: bottom,
        left: left

      }
    });
    this.setState({faceInfo: convertedData});
    console.log(convertedData);
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onImageSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch('http://localhost:3000/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id,
        imageURL: this.state.input  
      })
    })
      .then(res => res.json())
      .then(data => {
        const { faceData, entries} = data;
        this.setState(Object.assign(this.state.user, {entries: entries})); 
        this.convertFaceData(faceData);
      })
      .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({isSignedIn: true})
    } else {
      this.setState(initialState);
    }
    this.setState({route: route});
  };

  render() {
    const { route, imageURL, faceInfo, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <div className="flex justify-between">
          <Logo />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        </div>
        { 
          route === 'home' ? (
            <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm 
                imageURL={imageURL}
                onInputChange={this.onInputChange} 
                onImageSubmit={this.onImageSubmit} 
              />
              <FaceRecognition imageURL={imageURL} faces={faceInfo}/>                  
            </div> 
          ) : (   
            route === 'signIn' ? (
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            ) : (
              <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )      
          )
        }
      </div>
    );
  }
}

export default App;
