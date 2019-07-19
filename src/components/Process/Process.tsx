import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView
} from 'react-native';
import { 
	Button, 
	Overlay
} from 'react-native-elements';
import PropTypes from 'prop-types';
// import LottieView from 'lottie-react-native';

import CommonStyles from "../../utils/CommonStyles";

const STATUS_PROCESS = 'process'
const STATUS_SUCCESS = 'success'
const STATUS_ERROR = 'error'


export default class Process extends React.Component {
	constructor() {
		super();

		this.state = {			
			visible: false,
			status: STATUS_PROCESS
		};

	}

	componentDidMount() {
		// this.processAnimation.play();
    }

	componentWillReceiveProps(nextProps){

		if(nextProps.visible!==this.props.visible){			
			this.setState({visible: nextProps.visible });
		}

		if(nextProps.status!==this.props.status){			
			
			this.setState({ 
				status: nextProps.status
			},() => {

				if(this.state.status == STATUS_SUCCESS){
					this.successAnimation.play();
				}
				else if(this.state.status == STATUS_ERROR){
					this.errorAnimation.play();
				}
	
			})

		}

	}

	render() {

		const {visible, status} = this.state;
		const {title, cta} = this.props;
		
		return (
			
				<Overlay
					isVisible={visible}
				>
				<ScrollView style={CommonStyles.scrollView}>
					<View style={[styles.modalView]}>

						{title&&
						<Text style={{ fontSize: 22, marginBottom: 10, color: '#111111' }}>
							{title}
						</Text>}
				
						<View style={{ height: 100 }} />
				
						{/* {status==STATUS_PROCESS&&
						<LottieView
							source={require('../../../assets/icons/status_process.json')}
							ref={animation => {this.processAnimation = animation;}}
							loop={true}						
							style={{ height: 200, width: 200 }}
							autoplay
							loop
						/>}

						{status==STATUS_SUCCESS&&
						<LottieView
							source={require('../../../assets/icons/status_success.json')}
							ref={animation => {this.successAnimation = animation;}}
							loop={false}						
							style={{ height: 200, width: 200 }}
						/>}

						{status==STATUS_ERROR&&
						<LottieView
							source={require('../../../assets/icons/status_error.json')}
							ref={animation => {this.errorAnimation = animation;}}
							loop={true}						
							style={{ height: 200, width: 200 }}
						/>} */}

						<View style={{ height: 100 }} />
				
						{cta}
				
					</View>
				</ScrollView>
				</Overlay>
			
		);
	}

}


Process.propTypes = {  
	status: PropTypes.string,	
	title: PropTypes.string,	
	onPress: PropTypes.func,
	visible: PropTypes.bool.isRequired,
	cta: PropTypes.node
}

Process.defaultProps = {  
	status: STATUS_PROCESS,	
	title: null,
	onPress: () => {},	
	visible: true,
	cta: null
}

const styles = StyleSheet.create({	
	modalView: {    
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 50,
		backgroundColor: '#ffffff',
		alignItems: 'center', 
	}
});