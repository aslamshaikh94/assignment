import React, {useState, useEffect} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useHistory} from "react-router-dom";


const Login = (props)=>{
	const [user, setUser] = useState({})
	const [users, setUsers] = useState([])
	let history = useHistory()

	useEffect(()=>{
		let idslength = localStorage.getItem('nextUniqueId')
		let userdata=[]
		for(let i=0; i<idslength; i++){			
			 let user = localStorage.getItem(i)
			 let data = JSON.parse(user)
			 if(user) userdata.push({...data, id:i})
		}
			setUsers(userdata)	
	},[])

	const changeInput =(e)=>{
		let name = e.target.name;
		let value = e.target.value;
		setUser({
			...user,
			[name] : value
		})		
	}
	
	const loginUser = ()=>{	
		users.forEach((item)=>{
			if(user.username===item.username && user.password===item.password){
				localStorage.setItem('auth', true)
				history.push('/')				
			}		
		})
		
	}

	return(
			<React.Fragment>
				<Form>			      
	        <Form.Group>
	          <Form.Control placeholder="Username" name="username" onChange={e=>changeInput(e)} />
	        </Form.Group>
	        <Form.Group>
	          <Form.Control placeholder="Password" name="password" onChange={e=>changeInput(e)} />
	        </Form.Group>
				  <Button block type="button" className="login" onClick={e=>loginUser(e)}>Login</Button>
				</Form>
			</React.Fragment>
		)
}

export default Login;