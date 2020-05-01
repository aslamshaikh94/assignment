import React from 'react';
import { Container } from 'react-bootstrap';
import '../assets/css/header.css';
import {NavLink, useHistory } from "react-router-dom";



const Header = (props)=>{
	let history = useHistory();	
	const logout =()=>{
		localStorage.setItem('auth', false)
		history.push('/auth')
	}
	return (
			<header>
				<Container fluid>
				<div className="row d-flex align-items-center justify-content-between">
					<div>
						<NavLink to="/">Logo</NavLink>
					</div>
					<div>
						<ul className="navlink">							
							<li> {
											localStorage.getItem('auth') !== 'true'? 
											<NavLink to="/auth/login">My Account</NavLink> 
											:<button className="btn navlink" onClick={e=>logout(e)}>Logout</button> 
										}
							</li>
						</ul>
					</div>
				</div>
				</Container>
			</header>
		)
}

export default Header