import React, {useState, useEffect} from  'react';
import {Col, Button, InputGroup, Form} from 'react-bootstrap';
import swal from 'sweetalert';
import {useHistory} from "react-router-dom";
import {Checkbox} from 'custom-input-aslam';
import 'custom-input-aslam/build/index.css';



let ck_phone = /^\d{10}$/;
var ck_name = /^[A-Za-z0-9 ]{3,20}$/;
var ck_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
var ck_username = /^[A-Za-z0-9_]{3,20}$/;
var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

const Register = (props)=>{
	const [user, setUser] = useState({
	"fullname":'',
	"phone":'',
	"phonenums":[],
	"email":"",
	"username":"",
	"password":"",
	"cpassword":"",
	"agree":true
	});
	let history = useHistory()
	useEffect(()=>{
		if(props.data) setUser(props.data)
	},[props.data])

	const changeInput =(e)=>{
		let name = e.target.name;
		let value = e.target.value;
		setUser({
			...user,
			[name] : value
		})		
	}
	function addPhone(){
		if(!ck_phone.test(user.phone)){
			swal("Oops !", "Please enter valid phone number!", "error");
		}
		else if(user.phonenums.includes(user.phone)){
			swal("Oops !", "This phone number already exists!", "error");	
		}
		else{
			setUser({...user, phonenums:[...user.phonenums, user.phone]})
		}
	}
	function removePhone(item){
		let phonenums = user.phonenums.filter(e=> e!==item)
		setUser({...user, phonenums:phonenums})		
	}
	const register = (e, type)=>{	
		if(!ck_name.test(user.fullname)){
			swal("Oops !", "Please enter full Name!", "error");
		}
		else if(user.phonenums.length<=0){
			swal("Oops !", "Please enter phone number!", "error");
		}
		else if(!ck_email.test(user.email)){
			swal("Oops !", "Please enter valid email!", "error");
		}
		else if(!ck_username.test(user.username)){
			swal("Oops !", "Please enter valid username!", "error");
		}
		else if(!ck_password.test(user.password)){
			swal("Oops !", "Password must between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character!", "error");
		}
		else if(user.password!==user.cpassword){
			swal("Oops !", "The password and confirmation password do not match!", "error");
		}
		else{
			swal("Oops !", "Success!", "success");
			localStorage.setItem('auth', true)
			history.push('/')
		}
	}
	function checkedAgree(e){
		setUser({...user, agree:!e.target.checked})		
	}
	return(
			<React.Fragment>
					<Form>
						<Form.Row>
			        <Form.Group as={Col} md="12">
			          <Form.Control type="text" placeholder="Full name" 
			          							value={user? user.fullname :''} 
			          							name="fullname" onChange={e=>changeInput(e)}/>
			        </Form.Group>

			        <Form.Group as={Col} md="12">
			        	
			        		{
			        			user.phonenums? 
			        			user.phonenums.map((item,i)=> {			        				
			        				return(
			        						<InputGroup className="mb-3" key={item}>
												    <Form.Control type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone" 
									          							defaultValue={user? user.phone :''} 
									          							readOnly={true}
									          							name="phone"/>
												    <InputGroup.Append>
												      <InputGroup.Text onClick={e=>removePhone(item)}><i className="far fa-times"></i></InputGroup.Text>
												    </InputGroup.Append>
												  </InputGroup>
			        					)
			        			}) 
			        		:null}
			        	
			        	<InputGroup className="mb-3">
							    <Form.Control type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone" 
				          							value={user? user.phone :''} 
				          							name="phone" onChange={e=>changeInput(e)}/>
							    <InputGroup.Append>
							      <InputGroup.Text onClick={e=>addPhone()}><i className="far fa-plus"></i></InputGroup.Text>
							    </InputGroup.Append>
							  </InputGroup>								
			        </Form.Group>

			      </Form.Row>
			      <Form.Row>
			        <Form.Group as={Col} md="12">
			          <Form.Control type="email" placeholder="Email" 
			          							value={user? user.email :''}
			          							name="email" onChange={e=>changeInput(e)} />
			        </Form.Group>
			        <Form.Group as={Col} md="12">
			          <Form.Control placeholder="Username" 
			          							value={user? user.username :''} 
			          							name="username" onChange={e=>changeInput(e)} />
			        </Form.Group>
			        <Form.Group as={Col} md="12">
			          <Form.Control type="password" placeholder="Password"
			          							name="password" onChange={e=>changeInput(e)} />
			        </Form.Group>
			        <Form.Group as={Col} md="12">
			          <Form.Control type="password" placeholder="Confirm Password" 			          							
			          							name="cpassword" onChange={e=>changeInput(e)} />
			        </Form.Group>
			        <Form.Group as={Col} md="12">
			        	<Checkbox label="I agree with Terms & condition check box must be checked" 
			        						value="login" 
			        						name="auth"  
			        						onChange={e=>checkedAgree(e) }
			        						/>
			        </Form.Group>
			      </Form.Row>
			      {
			      	props.useid? 
			      	<Button block type="button" className="login" onClick={e=>register(e, 'update')}>Update User</Button>
			      	:
			      	<Button block type="button" className="login" disabled={user.agree} onClick={e=>register(e)}>Register</Button>
			    	}
					  
					</Form>
			</React.Fragment>
		)
}

export default Register;