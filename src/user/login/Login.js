import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'
import Input from 'antd/lib/input'
import 'antd/lib/input/style/css'
import notification from 'antd/lib/notification'
import 'antd/lib/notification/style/css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ACCESS_TOKEN } from '../../constants/constant'
import { login } from '../../util/APIUtils'
import './Login.css'

const FormItem = Form.Item

class Login extends Component {
    componentDidMount() {
        /* Make sure user not logged in */
        if (this.props.isAuthenticated) {
            notification.error({
                message: 'Error',
                description: 'Already logged in!'
            })
            this.props.history.push("/")
        }
    }

    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm) // automatically set this.props.form property
        return (
            <div className="login-container">
                <h1>Login</h1>
                <div>
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        )
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        /* Validate Form */
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values) // Create object to be send to server
                
                login(loginRequest).then(response => {
                    /** 
                     * TODO: Move to use cookies instead of localStorage
                     */
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken)
                    this.props.onLogin()
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'Error',
                            description: 'Your Username or Password is incorrect. Please try again!'
                        })
                    } else {
                        notification.error({
                            message: 'Error',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        })
                    }
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {/* Binding for validation */}
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'Please input your username or email!' }],
                    })(
                    <Input
                        prefix={<Icon type="user" />}
                        size="large"
                        name="usernameOrEmail" 
                        type="text"
                        placeholder="Username or Email" />
                    )}
                </FormItem>
                <FormItem>
                    {/* Binding for validation */}
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="password"
                            type="password"
                            placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {/* TODO: Forgot Password functionality */}
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    Or <Link to="/signup">register now!</Link>
                </FormItem>
            </Form>
        )
    }
}

export default Login