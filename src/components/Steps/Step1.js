import React, { Component } from "react";
import * as actions from '../../actions';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StepHeader from './StepHeader';

class Step1 extends Component {
    state = {
        users: [],
        vefify_method: '',
        card_no: '',
        card_pin: '',
        account_no: '',
        verify_method_error: {},
        card_no_error: {},
        card_pin_error: {},
        account_no_error: {}
    }

    

    componentDidMount() {
    }


    handleChangeVerifyMethod = (e) => {
      
        this.setState({ vefify_method: e.currentTarget.value , card_no : '', card_pin : '' , account_no :''});
    }

    handleChangeCardNo = (e) => {
        let { value, maxLength } = e.currentTarget;

        if (value.length > maxLength) {
            value = value.slice(0, maxLength)
        }

        this.setState({ card_no: value })
    }

    handleChangePin = (e) => {
        let { value, maxLength } = e.currentTarget;

        if (value.length > maxLength) {
            value = value.slice(0, maxLength)
        }

        this.setState({ card_pin: value })
    }

    handleChangeAccountNo = (e) => {
        let { value, maxLength } = e.currentTarget;

        if (value.length > maxLength) {
            value = value.slice(0, maxLength)
        }

        this.setState({ account_no: value })
    }
    formatNumberInput = (e) => {
        let checkIfNum;
        if (e.key !== undefined) {
            checkIfNum = e.key === "e" || e.key === "E" || e.key === "." || e.key === "+" || e.key === "-";
        }
        else if (e.keyCode !== undefined) {
            // Check keycodes if it's a "e" (69), "." (190), "+" (187) or "-" (189)
            checkIfNum = e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189;
        }
        return checkIfNum && e.preventDefault();
    }


    validateInput = () =>{
        const { vefify_method, card_no, card_pin, account_no } = this.state;
        const validateVerificationMethod = "Select Verification Method"
        const validateMessageCardNo = "16 digit number";
        const validateMessagePin = "4 digit pin";
        const validateAccountNo = "10 characters aphanumeric account number";

        
        let card_no_error = {},
            card_pin_error = {},
            account_no_error = {},
            verify_method_error= {};
         
        let formIsValid = true;

        console.log("vefify_method+++++ ", vefify_method , vefify_method !== '')
        
        if(vefify_method === ''){

            verify_method_error = {
                error : validateVerificationMethod
            };
            formIsValid = false;
        }
        else if(vefify_method === 'Card'){
            if(card_no.length !== 16){
                card_no_error = {
                    error : validateMessageCardNo
                };
                formIsValid = false;
            }
            if(card_pin.length !== 4){
                card_pin_error = {
                    error : validateMessagePin
                };
                formIsValid = false;
            }
        }
        else if(vefify_method === 'Account'){
            if(account_no.length !== 10){
                account_no_error = {
                    error : validateAccountNo
                };
                formIsValid = false;
            }
        }

        this.setState({
            verify_method_error,
            card_no_error,
            card_pin_error,
            account_no_error
        })

        console.log("vaidating formIsValid++++++ ", formIsValid)

        if(formIsValid){
            this.handleClickVerifyMethod();
        }
    }
    handleClickVerifyMethod = () => {
        const { card_no, card_pin, account_no, vefify_method} = this.state;

        const configVerifyDetails = {};

        if(vefify_method === 'Card' ){
            configVerifyDetails.type= 'card';
            configVerifyDetails.card_no = card_no;
            configVerifyDetails.card_pin = card_pin;
        }
        else if(vefify_method === 'Account'){
            configVerifyDetails.type= 'account';
            configVerifyDetails.account_no = account_no;
        }

        this.props.checkCardInSystem(configVerifyDetails);
        document.location = "/details";
    }

    render() {
        const { users } = this.props;
        const state = this.state;
     
        return (

            <div className="step-container">
                <StepHeader stepNo={1} />

                <div className="container-body">

                    <div className="form">
                        <p> Please specify how you would like to verify your Identity?</p>

                        <input type="radio"
                            id="ver_method"
                            value="Card"
                            checked={state.vefify_method === 'Card'}
                            onChange={this.handleChangeVerifyMethod}
                            className="radio-input" />
                        <span className="radio-name">Credit Card/Debit Card</span>

                        <input type="radio"
                            id="ver_method"
                            value="Account"
                            checked={state.vefify_method === 'Account'}
                            onChange={this.handleChangeVerifyMethod}
                            className="radio-input" />
                        <span className="radio-name">Account Number</span>

                        {this.state.verify_method_error &&
								this.state.verify_method_error.error && (
									<div className="error">
										{this.state.verify_method_error && this.state.verify_method_error.error ? (
											`* ${this.state.verify_method_error.error}`
										) : (
											""
										)}
									</div>
							)}

                        {state.vefify_method === 'Card' && 
                                <div className="method-container">
                                    <label> Card No  </label>
                                    <input type="number"
                                        onChange={this.handleChangeCardNo}
                                        maxLength="16"
                                        value={state.card_no}
                                        onKeyDown={this.formatNumberInput}
                                    />

                                {this.state.card_no_error &&
								this.state.card_no_error.error && (
									<div className="error">
										{this.state.card_no_error && this.state.card_no_error.error ? (
											`* ${this.state.card_no_error.error}`
										) : (
											""
										)}
									</div>
							    )}

                                    <label>  PIN  </label>
                                    <input type="password"
                                        onChange={this.handleChangePin}
                                        maxLength="4"
                                        value={state.card_pin}
                                        onKeyDown={this.formatNumberInput}
                                    />

                                {this.state.card_pin_error &&
								this.state.card_pin_error.error && (
									<div className="error">
										{this.state.card_pin_error && this.state.card_pin_error.error ? (
											`* ${this.state.card_pin_error.error}`
										) : (
											""
										)}
									</div>
							    )}

                                </div>
                            }

                        {state.vefify_method === 'Account' && (
                            <div className="method-container">
                                <label> Account Number  </label>
                                <input type="text"
                                    onChange={this.handleChangeAccountNo}
                                    maxLength="10"
                                    value={state.account_no} 
                                />

                                {this.state.account_no_error &&
								this.state.account_no_error.error && (
									<div className="error">
										{this.state.account_no_error && this.state.account_no_error.error ? (
											`* ${this.state.account_no_error.error}`
										) : (
											""
										)}
									</div>
							    )}

                            </div>
                        )}

                    </div>
            
                {((state.vefify_method === 'Account' && state.account_no !== '') || (state.vefify_method === 'Card' && state.card_no !== '')) && 

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={this.validateInput}>

                        {/* <Link to='/details' style={{ textDecoration: 'none', color: '#fff' }} > */}
                            <button className="arrow-button" id="btnNext"  >
                                NEXT
                            </button>
                        {/* </Link> */}

                    </div>

                    }

                    <hr />

                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users || [],
        user: state.user || []
    };
}

export default connect(mapStateToProps, actions)(Step1);