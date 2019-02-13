import 'antd/lib/button/style/css'
import Layout from 'antd/lib/layout'
import 'antd/lib/layout/style/css'
import notification from 'antd/lib/notification'
import 'antd/lib/notification/style/css'
import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import AppHeader from '../common/AppHeader'
import LoadingIndicator from '../common/LoadingIndicator'
import NotFound from '../common/NotFound'
import { ACCESS_TOKEN } from '../constants/constant'
import Login from '../user/login/Login'
import Profile from '../user/profile/Profile'
import Signup from '../user/signup/Signup'
import { getCurrentUser } from '../util/APIUtils'
import './App.css'

const { Content } = Layout

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentUser: null,
			isAuthenticated: false,
			isLoading: false
		}
		this.handleLogout = this.handleLogout.bind(this)
		this.loadCurrentUser = this.loadCurrentUser.bind(this)
		this.handleLogin = this.handleLogin.bind(this)

		notification.config({
			placement: 'topRight',
			top: 70,
			duration: 3
		})
	}

	/* Load user details */
	loadCurrentUser() {
		this.setState({
			isLoading: true
		})
		getCurrentUser().then(response => {
			this.setState({
				currentUser: response,
				isAuthenticated: true,
				isLoading: false
			})
		}).catch(error => {
			this.setState({
				isLoading: false
			})
		})
	}

	componentDidMount() {
		this.loadCurrentUser()
	}

	/* Handle successful logout */
	handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
		localStorage.removeItem(ACCESS_TOKEN)

		this.setState({
			currentUser: null,
			isAuthenticated: false
		})

		this.props.history.push(redirectTo)
		
		notification[notificationType]({
			message: 'Success',
			description: description,
		})
	}

	/* Handle successful login */
	handleLogin() {
		notification.success({
			message: 'Success',
			description: "You're successfully logged in.",
		})
		this.loadCurrentUser()
		this.props.history.push("/")
	}

	render() {
		if(this.state.isLoading) {
			return <LoadingIndicator />
		}
		return (
			<Layout className="App">
				<AppHeader isAuthenticated={this.state.isAuthenticated} 
					currentUser={this.state.currentUser} 
					onLogout={this.handleLogout} />
				<Content>
					<Switch>
						<Route exact path="/" 
							render={() =>
								<h2>Sample Implementation of Authentication using JWT</h2>
							}>
						</Route>
						<Route path="/login" 
							render={(props) => <Login isAuthenticated={this.state.isAuthenticated} onLogin={this.handleLogin} {...props} />}>
						</Route>
						<Route path="/signup" 
							render={(props) => <Signup isAuthenticated={this.state.isAuthenticated} {...props} />}>
						</Route>
						<Route path="/users/:username" 
							render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props} />}>
						</Route>
						{/* Not defined route goes here */}
						<Route component={NotFound}></Route>
					</Switch>
				</Content>
			</Layout>
		)
	}
}

export default withRouter(App)