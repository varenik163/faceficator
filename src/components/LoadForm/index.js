import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Custom extends Component {

	render() {
		return <div>

		</div>
	}
}

Custom.propTypes = {};

export default connect(state => ({}), {})(Custom)

