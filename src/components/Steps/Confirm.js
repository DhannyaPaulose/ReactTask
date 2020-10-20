import React, { Component } from "react";
import * as actions from '../../actions';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon} from '@iconify/react';
import checkIcon from '@iconify/icons-simple-line-icons/check';

class Confirm extends Component {
    state = {
        username : '',
        refNo : ''  
    }

    componentDidMount() {
        let name = localStorage.getItem("task-username");
        this.setState({username : name});
    }
 
    render() {

        return (
            <div className="step-container">
                
                <div className="container-body">
                    <div className="form_confirm">
                        <div className="center">

                            <Icon icon={checkIcon} color="#6ADA77" width="100px" height="100px" />
                            <h1> Success </h1>

                            <h2>{this.state.username} , Your application has been submitted. </h2>
                            <h2> Referece No is {this.state.refNo}</h2>
                            
                            <Link to='/' style={{textDecoration:'none', color:'#fff', fontSize:'14px'}} >
                                <button className="buttonOK" >
                                    OK
                                
                                </button> 
                            </Link>
                        </div>
                        
                    </div>
                        
                </div>
            </div>
            
        );
    }
}

function mapStateToProps(state) {
	return {
        users: state.users || []
	};
}

export default connect(mapStateToProps, actions)(Confirm);