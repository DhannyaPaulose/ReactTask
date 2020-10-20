import React, { Component} from "react";
import * as actions from '../../actions';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import StepHeader from './StepHeader';

class Step2 extends Component {
    state = {
        // users:[],
        fields: {},
        errors: {
            username: '',
            cpassword: '',
            email: '',
            cemail: '',
            phoneno: '',
            incomplete: ''
        },
        prefCommication: '',
        validated : true
    }

    componentDidMount() {
    }
 

    checkHasValue = (errors) => {
        let  haserror = false;
        
        if(errors['username'] !== '' || errors['cpassword'] !== '' || errors['email'] !== '' || errors['cemail'] !== '' || errors['phoneno'] !== '' || errors['incomplete'] !== '' ){
            haserror = true;
        }

        return haserror;
    }

    RegistrationSubmit = async(e) => {
        
        const {fields, validated, prefCommication, errors} = this.state;
        let updateerrors = errors,
        hasErrors = this.checkHasValue(errors);
        updateerrors.incomplete = "";
       
        if ((fields !== undefined && Object.keys(fields).length === 6) && (prefCommication !== '') && !hasErrors ){
            const updateObject = {
                userName : fields['username'],
                password : fields['password'],
                email : fields['email'],
                mobile : fields['phoneno'],
                prefCommication : prefCommication
            }

            if (validated) {
                localStorage.setItem("task-username",fields['username']);
                await this.props.saveRegisterUser(updateObject)
                    .catch(e => {
                        console.log("Could not save user*** ", e)
                    });

                document.location = "/finish";
            }
        }
        else{
            if(prefCommication === ''){
                updateerrors.prefCommication = "*Select communication method ";
            }
            else{
                updateerrors.prefCommication = "";
            }
            if(fields !== undefined && Object.keys(fields).length !== 6){
                updateerrors.incomplete = "Incomplete Form";
            }
            else{
                updateerrors.incomplete = "";
            }
        }

        this.setState({errors : updateerrors });
    }

    handleChange = (field, e) => {

        let { fields, errors} = this.state;
        let updateerrors = errors;
        let validated = true;
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

        fields[field] = e.target.value;
        updateerrors.incomplete = "";
        switch (field) {
            case 'username':
                if (fields["username"].length > 0) {
                    if (!fields["username"].match(/^[a-zA-Z]+$/)) {
                        validated=false;
                        updateerrors.username = "*Username has to be only characters";
                    }
                }
                else {
                    updateerrors.username = '';
                }
                break;
            case 'cpassword':
                if (fields["password"] !== fields["cpassword"]) {
                    updateerrors.cpassword = "*Passwords does not match";
                    validated = false;
                }
                else {
                    updateerrors.cpassword = "";
                }
                break;
            case 'email':
                if (fields["email"].length > 0) {
                    updateerrors.email = validEmailRegex.test(fields["email"]) ? '' : '*Email is not valid';
                    validated = false;
                }
                else {
                    updateerrors.email = "";
                }
                break;
            case 'cemail':
                if (fields["cemail"] !== fields["email"]) {
                    updateerrors.cemail = '*Emails does not match';
                    validated = false;
                }
                else {
                    updateerrors.cemail = "";
                }
                break;
            case 'phoneno':
                if (fields["phoneno"].length > 0) {
                    if (!fields["phoneno"].match(/^[0-9]+$/) || fields["phoneno"].length !== 10) {
                        updateerrors.phoneno = "*PhoneNo should be 10 digit number";
                        validated = false;
                    }
                    else {
                        updateerrors.phoneno = "";
                    }
                }
                break;
            default:
                break;
        }

        this.setState({ fields, errors: updateerrors , validated});
    }

    handleChangePrefCommication = (e) => {
        this.setState({ prefCommication: e.currentTarget.value });
    }

    render() {
        const { users, user } = this.props;
        const state = this.state;

        return (
            <div className="step-container">
                <StepHeader stepNo={2} />
                <div className="container-body">
                    <div className="form-2">
                        <div className="row ">
                            {(state.errors.incomplete !== undefined && state.errors.incomplete.length > 0) &&
                                <span className="error" >{this.state.errors.incomplete}</span>
                            }
                        </div>
                        <div className="row ">
                            <span> User Name </span>
                            <input type="text" ref="username" name="username" required placeholder="username.." onChange={this.handleChange.bind(this, "username")} value={this.state.fields["username"]} />
                            {(state.errors.username !== undefined && state.errors.username.length > 0) &&
                                <span className="error" >{this.state.errors.username}</span>
                            }
                        </div>

                        <div className="row">
                            <span> Password </span>
                            <input type="password" ref="password" name="password" required placeholder="password.." onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} className="pwd" />
                        </div>

                        <div className="row">
                            <span> Confirm Password </span>
                            <input type="password" ref="cpassword" name="cpassword" required placeholder="confirm password.." onChange={this.handleChange.bind(this, "cpassword")} value={this.state.fields["cpassword"]} className="pwd" />
                            {(state.errors.cpassword !== undefined && state.errors.cpassword.length > 0) &&
                                <span className="error" >{this.state.errors.cpassword}</span>
                            }
                        </div>

                        <div className="row">
                            <span> Email </span>
                            <input type="text" ref="email" name="email" required placeholder="email address.." onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} />
                            {(state.errors.email !== undefined && state.errors.email.length > 0) &&
                                <span className="error" >{this.state.errors["email"]}</span>
                            }
                        </div>

                        <div className="row">
                            <span> Confirm Email </span>
                            <input type="text" ref="cemail" name="cemail" required placeholder="confirm email.." onChange={this.handleChange.bind(this, "cemail")} value={this.state.fields["cemail"]} />
                            {(state.errors.cemail !== undefined && state.errors.cemail.length > 0) &&
                                <span className="error" >{this.state.errors["cemail"]}</span>
                            }
                        </div>

                        <div className="row">
                            <span> Phone No </span>
                            <input type="text" ref="phoneno" name="phoneno" required placeholder="phone no " maxLength="10" onChange={this.handleChange.bind(this, "phoneno")} value={this.state.fields["phoneno"]} />
                            {(state.errors.phoneno !== undefined && state.errors.phoneno.length > 0) &&
                                <span className="error" >{this.state.errors.phoneno}</span>
                            }
                        </div>

                        <div className="row">
                            <span> Send OTP via </span>
                            <input type="radio"
                                value="email"
                                checked={state.prefCommication === 'email'}
                                onChange={this.handleChangePrefCommication}
                                defaultValue={true}
                                className="radio-input" />
                            Email
                            <input type="radio"
                                value="phone"
                                checked={state.prefCommication === 'phone'}
                                onChange={this.handleChangePrefCommication}
                                defaultValue={false}
                                className="radio-input" />
                             Phone

                             {(state.errors.prefCommication !== undefined && state.errors.prefCommication.length > 0) &&
                                <span className="error" >{this.state.errors.prefCommication}</span>
                            }
                        </div>

                        <div style={{ alignItems: 'center' }}>
                            <Link to='/' style={{ textDecoration: 'none', color: '#fff' }} >
                                <button className="arrow-button-back" >
                                    Previous
                            </button>
                            </Link>
                            <button className="arrow-button" onClick={this.RegistrationSubmit}>
                                NEXT
                            </button>

                        </div>
                        <hr />
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        // users: state.users || []
    };
}

export default connect(mapStateToProps, actions)(Step2);