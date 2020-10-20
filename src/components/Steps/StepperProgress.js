import React, { Component } from 'react';
import '../../assets/css/stepperProgress.css'

class StepperProgress extends Component {
    constructor(){
        super();
        this.state= {
            steps: []
            
        }
    }

    componentDidMount() {
        const {steps, currentStepIndex} = this.props;
        const stepsState = steps.map((step, index) => {
            const stepObj = {};
            stepObj.description= step;
            stepObj.completed= false;
            stepObj.highlighted= index === 0 ? true : false;
            stepObj.selected= index === 0 ? true : false;  
            return stepObj; 
        })

        const currentSteps = this.updateStep(currentStepIndex-1,stepsState);
        this.setState({steps: currentSteps})
    }

    componentDidUpdate(prevProps) {
        
        if(prevProps.currentStepIndex !== this.props.currentStepIndex){
            const {steps} = this.state;
            const currentSteps = this.updateStep(this.props.currentStepIndex-1,steps);
            this.setState({steps: currentSteps})
        }
    }

    updateStep(stepNumber , steps){
        

        const newSteps = [...steps];

        let stepCounter = 0;

        while (stepCounter < newSteps.length){
            

            if(stepCounter === stepNumber){    // current step

                newSteps[stepCounter]={
                    ...newSteps[stepCounter],
                    highlighted: true,
                    selected: true,
                    completed: false 
                };
                stepCounter++;
            }
            else if(stepCounter < stepNumber){     // past step
                newSteps[stepCounter] ={
                    ...newSteps[stepCounter],
                    highlighted: false,
                    selected: true,  // make it false
                    completed: true     
                }
                stepCounter++;
            }
            else {      //future step
                newSteps[stepCounter] ={
                    ...newSteps[stepCounter],
                    highlighted: false,
                    selected: false, 
                    completed: false
                }
                stepCounter++;
            }

            
        }

        return newSteps;
    }

    handleClick =(index) => {
       
        const {currentStepIndex} = this.props;
        if(index < currentStepIndex){
            console.log("here")
        }
    }
    render() {

        const {steps}= this.state;
        
        const stepsDisplay = steps.map((step, index) => {
            return (
                <div className="step-wrapper" key={index} onClick={()=> this.handleClick(index)}>         
                    <div className={`step-number ${step.completed ? 'step-number-completed' :( step.selected ? 'step-number-active' : 'step-number-disabled')}`}>{index + 1} </div>
                    <div className={`step-description ${step.highlighted ?'step-description-active' :'' }`}> {step.description} </div>
                    <div className={index !== steps.length - 1 ? "divider-line" :''} />
                </div>
            )
        });
        return (
            <div className="stepper-wrapper-horizontal">
               {stepsDisplay}
                
            </div>
        );
    }
}

export default StepperProgress;

