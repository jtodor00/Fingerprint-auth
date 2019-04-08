import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class VerifyPhone extends Component {
    render() {
        return (
            <div className="container text-center">
                <h2>Please scan code with your phone:</h2>
                <br />
                <img src={this.props.data_url} alt="qrCode"/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        data_url : state.auth.data_url,
    }
};
export default connect(mapStateToProps,actions)(VerifyPhone);