import React, {Component} from 'react';
import { Redirect } from "react-router-dom";

class StravaRedirect extends Component {
  state = {
    authorizeComplete: false
  }
  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    let tokenURI = new URL(process.env.REACT_APP_TOKEN_URI);
    const params = {
      code: searchParams.get('code')
    }
    Object.keys(params).forEach(key => tokenURI.searchParams.append(key, params[key]));
    fetch(tokenURI)
      .then(res => res.json())
      .then(res => {
        this.props.tokenUpdate(res);
        this.setState({
          authorizeComplete: true
        });
      })
  }
  render() {
    if (this.state.authorizeComplete) return <Redirect to='/' />
    return (
      <div>Handling strava redirect...</div>
    );
  }
}

export default StravaRedirect;
