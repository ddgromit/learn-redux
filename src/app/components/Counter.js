import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input';

export default class HelloWorld extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  onClickIncrement() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Counter</h1>
          Value:
          <Input type="text" readOnly={true} value={this.state.count} />
          <Button
            bsStyle="primary"
            onClick={this.onClickIncrement.bind(this)}>Increment</Button>
        </div>
      </div>
    );
  }
}
