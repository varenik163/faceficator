import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Upload, Button, Icon, DatePicker, InputNumber } from 'antd'
import 'antd/dist/antd.css';
import actions from '../../redux/api/actions'
import moment from 'moment'
//import 'moment/locale/ru'
import locale from 'antd/lib/date-picker/locale/ru_RU'
//moment.locale('ru');

class Custom extends Component {

	render() {
		const { checkVK } = this.props;

		return <Fragment>
			{checkVK.data && checkVK.data.length ? <div>
					<img src={checkVK.data[0].photo_max} style={{borderRadius: '100%', marginBottom: '20px'}} />
					<h2 style={{color: '#fff'}}>
						{
							checkVK.data[0].first_name + ' '
							+ checkVK.data[0].last_name
					}
					</h2>
				</div>
				: ''}
			<DatePicker />
			{console.log(moment.locale())}
			<Upload>
				<Button type={'primary'} loading={false} >
					<Icon type="upload" /> Click to Upload
				</Button>
				<br/>
				<br/>

			</Upload>
			<InputNumber />
			<Button type={'primary'} loading={checkVK.loading} onClick={() => this.props.checkVk()}>
				Check VK
			</Button>
		</Fragment>
	}
}

Custom.propTypes = {};

export default connect(state => ({
	checkVK: state.checkVK
}), {
	checkVk: actions.checkVK
})(Custom)

