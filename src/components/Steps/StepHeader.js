import React, { Component } from 'react';
import '../../assets/css/main.css';
import { Icon } from "@iconify/react";
import menu from '@iconify/icons-simple-line-icons/menu';
import '../../assets/css/step.css'

import StepperProgress from './StepperProgress';

class StepHeader extends Component {
    constructor() {
        super();
        this.state = {
            currentStep: ''
        }
    }

    componentDidMount() {
        const { stepNo } = this.props
        this.setState({
            currentStep: stepNo
        })
    }

    componentDidUpdate(prevProps) {

        if (prevProps.stepNo !== this.props.stepNo) {
            this.setState({ currentStep: this.props.stepNo })
        }
    }

    render() {

        const stepsArray = ['Step 1', 'Step 2', 'Step 3'];
        const { currentStep } = this.state;

        return (
            <div className="container-head">
                <div className="right-badge" >
                    <button>
                        <span>RAKBANK USER </span>
                        <Icon icon={menu} style={{ color: '#FFFFFF', fontSize: '10px', cursor: 'pointer', paddingLeft: '90px' }} />
                    </button>
                </div>

                <div className="stepper-container-horizontal">
                    <h3> STEP {currentStep} </h3>
                    <StepperProgress steps={stepsArray} currentStepIndex={currentStep} />
                </div>

            </div>

        );
    }
}

export default StepHeader;