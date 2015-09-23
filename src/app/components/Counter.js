import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input';
import { connect } from 'react-redux';
import { increment } from 'app/actions/counter';

class Counter extends React.Component {
  onClickIncrement() {
    this.props.dispatch(increment());
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Counter</h1>
          Value:
          <Input type="text" readOnly={true} value={this.props.count} />
          <Button
            bsStyle="primary"
            onClick={this.onClickIncrement.bind(this)}>Increment</Button>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    count: state.count,
  };
}

export default connect(select)(Counter);
