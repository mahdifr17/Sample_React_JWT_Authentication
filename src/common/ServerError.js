import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ServerError.css'

class ServerError extends Component {
    render() {
        return (
            <div className="server-error-page">
                <h1 className="title">
                    500
                </h1>
                <div className="desc">
                    Oops! Something went wrong at our Server. Why don't you go back?
                </div>
                <Link to="/"><Button type="primary" size="large">Go Back</Button></Link>
            </div>
        )
    }
}

export default ServerError