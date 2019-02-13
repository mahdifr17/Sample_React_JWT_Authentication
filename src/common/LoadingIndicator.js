import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'
import Spin from 'antd/lib/spin'
import 'antd/lib/spin/style/css'
import React from 'react'

export default function LoadingIndicator(props) {
    const antIcon = <Icon type="loading-3-quarters" style={{ fontSize: 30 }} spin />
    return (
        <Spin indicator={antIcon} style = {{display: 'block', textAlign: 'center', marginTop: 30}} />
    )
}