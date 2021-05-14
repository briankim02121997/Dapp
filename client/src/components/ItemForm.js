import React from 'react';
import {Field, reduxForm} from 'redux-form';

class ItemForm extends React.Component {

    renderError = ({error, submitFailed, touched}) => {
        return (submitFailed || touched) && error ? 
        (
            <div className="ui error message">
                <div className="header">
                    {error}
                </div>
            </div>
        ) : null;
    }

    renderInput = ({input, label, meta}) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    render(){
        return (
            <form 
                onSubmit={this.props.handleSubmit(this.props.onSubmit)} 
                className="ui form error"
            >
                <Field name="identifier" label="Enter Identifier" component={this.renderInput} />
                <Field name="priceInWei" label="Enter Price of Item (Wei)" component={this.renderInput} />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if(!formValues.identifier) errors.identifier = "Identifier must not be empty";
    if(!formValues.priceInWei) errors.priceInWei = "Price must not be empty";
    
    return errors;
};

export default reduxForm({
    form: "itemForm",
    validate
})(ItemForm);