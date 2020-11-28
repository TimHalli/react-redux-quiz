import React, { PureComponent } from "react";
import classes from "./Auth.module.css";
import Button from "./../../components/UI/Button/Button";
import Input from "./../../components/UI/Input/Input";
import {auth} from "./../../store/actions/auth"
import { connect } from 'react-redux'

 class Auth extends PureComponent {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Insert correct email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Password",
        errorMessage: "Insert correct password",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLocaleLowerCase());
}

   loginHandler = () => {
     this.props.auth(
      this.state.formControls.email.value, 
       this.state.formControls.password.value, 
      true
    )
    
  };

   registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value, 
       this.state.formControls.password.value, 
      false
    )
    
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl(value, validation) {

    if (!validation) {
      return true
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    } 

    if (validation.email) {
      isValid = this.validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[ controlName ] = control;
    
    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[ name ].valid && isFormValid;
    })

    this.setState({ ...this.state, formControls, isFormValid });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {

      const control = this.state.formControls[controlName];

      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>

          <form className={classes.AuthForm} onSubmit={this.submitHandler}>
            {this.renderInputs()}

            <Button
              disabled={!this.state.isFormValid}
              type="success"
              onClick={this.loginHandler}
            >
              Sign Ip
            </Button>

            <Button
              disabled={!this.state.isFormValid}
              type="primary"
              onClick={this.registerHandler}
            >
              Sign Up
            </Button>
          </form>
        </div>{" "}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}
export default connect(null, mapDispatchToProps)(Auth)