import React, { Component } from 'react';
import { reduxForm ,Field } from 'redux-form';
import CustomInput from './CustomInput';

import {connect} from 'react-redux';
import {compose} from 'redux';
import * as actions from '../actions';

class SignUp extends Component {
    constructor(props)
    {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    async onSubmit(formdata){
        await this.props.signUp(formdata);
        if(!this.props.errorMessage)
        {
            this.props.history.push('/verifyphone');
        }
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
               <form onSubmit={handleSubmit(this.onSubmit)}>
                   <fieldset>
                       <Field
                            name="email"
                            type="text"
                            id="email"
                            label="Enter your email"
                            placeholder = "example@example.com"
                            component={ CustomInput } />
                   </fieldset>
                   <fieldset>
                       <Field
                            name="password"
                            type="password"
                            id="password"
                            label="Enter your password"
                            placeholder = "Your password"
                            component={ CustomInput } />
                   </fieldset>
                   <button className="btn btn-primary" type="submit">Sign Up</button>
               </form>

               { this.props.errorMessage ? 
               <div className="alert alert-danger">
                { this.props.errorMessage }
               </div> : null }
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        errorMessage : state.auth.errorMessage,
    }
}

export default compose(
    connect(mapStateToProps,actions),
    reduxForm({ form : 'signup' })
)(SignUp)
