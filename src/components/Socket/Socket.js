import React, { Component } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getAlias, actions as userActions } from 'store/modules/user'

const socket = io('localhost')

import Snackbar from 'material-ui/Snackbar'

class Socket extends Component {
  constructor (props) {
    super(props)
    // const { dispatch } = this.props

    socket.emit('visit', getAlias())
    socket.on('updateCounters', alias => this.updateVisitsCounter(alias))

    this.state = {
      openSnackbar: false
    }
  }

  updateVisitsCounter (alias) {
    console.log('updating counters ' + alias)
    if (alias === getAlias()) {
      this.props.updateVisitsCounter()
      this.setState({openSnackbar: true})
      setTimeout(() => {
        this.setState({openSnackbar: false})
      }, 2000)
    }
  }

  render () {
    return (
      <Snackbar
        open={this.state.openSnackbar}
        message='Новый просмотр'
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
       />
    )
  }
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, userActions)(Socket)
