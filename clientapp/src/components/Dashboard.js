import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {
    async componentDidMount(){
        this.props.getSecret();
    }
    render() {
        return (
            <div>
                This is Dashboard component!
                <br />
                {
                    this.props.secret.resource
                }
            </div>
        );
    }

}
function mapStateToProps(state){
    return{
        secret : state.dashboard.secret,
    }
};
export default connect(mapStateToProps,actions)(Dashboard);