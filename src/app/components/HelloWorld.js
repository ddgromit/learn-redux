import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import 'lib/styles/bootstrap';

export default class HelloWorld extends React.Component {
  render() {
    return (
      <div>
        <Button bsStyle="primary">Hello</Button>
        <input />
      </div>
    );
  }
}
