import Dropdown from 'antd/lib/dropdown'
import 'antd/lib/dropdown/style/css'
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'
import Layout from 'antd/lib/layout'
import 'antd/lib/layout/style/css'
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './AppHeader.css'

const { Header } = Layout
    
class AppHeader extends Component {
    constructor(props) {
        super(props)
        this.handleMenuClick = this.handleMenuClick.bind(this)
    }

    handleMenuClick({ key }) {
        if(key === "logout") {
            this.props.onLogout()
        }
    }

    render() {
        let menuItems
        /* Navbar if the user has logged in */
        if(this.props.isAuthenticated) {
            menuItems = [
                <Menu.Item key="/">
                    <Link to="/">
                        <Icon type="home"/>
                        Home
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/profile" className="profile-menu">
                    <ProfileDropdownMenu
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>
            ]
        } 
        /* Navbar if the user is not logged in */
        else {
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">
                        <Icon type="login" />
                        Login
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/signup">
                    <Link to="/signup">
                        <Icon type="user-add" />
                        Signup
                    </Link>
                </Menu.Item>
            ]
        }

        return (
            <Header>
                <Menu
                    mode="horizontal"
                    theme="dark"
                    selectedKeys={[this.props.location.pathname]}
                    style={{ lineHeight: '64px' }} >
                        {menuItems}
                </Menu>
            </Header>
        )
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick}>
            <Menu.Item key="user-info" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="username-info">
                    {props.currentUser.username}
                </div>
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item key="profile">
                <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
            </Menu.Item>

            <Menu.Item key="logout">
                Logout
            </Menu.Item>
        </Menu>
    )

    return (
        <Dropdown 
            overlay={dropdownMenu} 
            trigger={['hover']}
            getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
            <div>
                <Icon type="user" /> <Icon type="down" />
            </div>
        </Dropdown>
    )
}

export default withRouter(AppHeader)