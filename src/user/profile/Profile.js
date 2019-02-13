import { Avatar } from 'antd'
import React, { Component } from 'react'
import LoadingIndicator from '../../common/LoadingIndicator'
import NotFound from '../../common/NotFound'
import ServerError from '../../common/ServerError'
import { getUserProfile } from '../../util/APIUtils'
import { getAvatarColor } from '../../util/Colors'
import { formatDate } from '../../util/Helpers'
import './Profile.css'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this)
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        })

        getUserProfile(username).then(response => {
            this.setState({
                user: response,
                isLoading: false
            })
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                })
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                })
            }
        })
    }
      
    componentDidMount() {
        /* Make sure user has already logged in */
        if (this.props.isAuthenticated) {
            this.loadUserProfile(this.props.match.params.username)
        } else {
            this.setState({
                serverError: true,
                isLoading: false
            })
        }
    }

    /* Handle if the user sees the other profile, then move to his profile with button in app header */
    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.username !== prevProps.match.params.username) {
            this.loadUserProfile(this.props.match.params.username)
        }
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />
        }

        if(this.state.notFound) {
            return <NotFound />
        }

        if(this.state.serverError) {
            return <ServerError />
        }

        return (
            <div>
                {
                    this.state.user ? (
                        <div>
                            <div className="user-avatar">
                                <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name)}}>
                                    {this.state.user.name.split(' ').map((val) => {
                                        return val[0]
                                    })}
                                </Avatar>
                            </div>
                            <div className="user-summary">
                                <div className="full-name">{this.state.user.name}</div>
                                <div className="username">@{this.state.user.username}</div>
                                <div className="user-joined">
                                    Joined {formatDate(this.state.user.joinedAt)}
                                </div>
                            </div>
                        </div>
                    ): null
                }
            </div>
        )
    }
}

export default Profile