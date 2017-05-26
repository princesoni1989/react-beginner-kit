import React, {Component} from 'react';
import '../styles/core.scss';

class App extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='app-container'>
        {this.props.children}
      </div>
    );
  }
}

export default App;
