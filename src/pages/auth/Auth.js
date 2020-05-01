import React, {useState, lazy, Suspense} from 'react';
import {Radio} from 'custom-input-aslam';
import 'custom-input-aslam/build/index.css';

import '../../assets/css/auth.css';

const Register =  lazy(()=> import('./components/Register'));
const Login =  lazy(()=> import('./components/Login'));

const Auth = (props)=>{

	const [authForm, setAuthForm] = useState('Login')
	const clickHandle = ()=>{
		setAuthForm(authForm==="Register"? "Login" : "Register")
	}
	const form = authForm==="Login"? <Register/> : <Login history={props} />
	return(
			<main className="auth d-flex align-items-center justify-content-center">
				<div className="authform">
						<h2 className="text-center">{authForm==="Login"? 'Register':'Login'}</h2>						
					<div className="d-flex">
						<Radio label="Register" value="register" name="auth" onChange={e=>clickHandle(e)} checked />
						<Radio label="Login" value="login" name="auth" onChange={e=>clickHandle(e)} />													
					</div>				
					<Suspense fallback={<div>Loading...</div>}>
		        {form}
		      </Suspense>
				</div>
			</main>
		)
}

export default Auth;