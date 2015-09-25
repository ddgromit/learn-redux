import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input';
import { connect } from 'react-redux';
import { increment } from 'app/actions/counter';
import { Link } from 'react-router';
import { pushState } from 'redux-router';

class Counter extends React.Component {
  onClickIncrement() {
    this.props.increment();
  }

  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div>
          <Link to="/hello">Hello</Link>
          Current Pathname: { this.props.pathname }
          <Button onClick={() => this.props.pushState(null, '/hello')}>Dispatch to Hello</Button>
        </div>
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
    count: state.counting.count,
    pathname: state.router.location.pathname,
  };
}

export default connect(select, { pushState, increment })(Counter);
