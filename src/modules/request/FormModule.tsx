import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	ScrollView, 
	SafeAreaView,
	ActivityIndicator,
	TouchableOpacity,
	FlatList,
	Dimensions
} from 'react-native';

import { 
	Input, 
	Button, 
	Image,
	Overlay
} from 'react-native-elements';

import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Spinner from "react-native-loading-spinner-overlay";

import CommonStyles from "../../utils/CommonStyles";
import * as RequestStateReducer from '../../redux/reducers/RequestStateReducer';
import Location from '../../components/places/Location';
import FullWidthImage  from '../../components/image/FullWidthImage';
import Process  from '../../components/Process/Process';

// let { height, width } = Dimensions.get('window');
// let orientation = height > width ? 'Portrait' : 'Landscape';

class FormModule extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
		  headerTitle: 'Pedí presupuesto'		  		  
		};
	};   

	constructor() {
		super();

		this.state = {
			medias: [],
			currentMedia: null,
			subject: '',
			description: '',
			name: '',
			responseModal: false,
			responseModalStatus: 'process'
		};

		// this.deviceLocale = "ptBR";

		// this.messages = {
		//   ptBR: {
		//     numbers: 'O campo "{0}" precisar conter um número válido',
		//     email: 'O campo "{0}" precisa conter um email válido.',
		//     required: 'O campo "{0}" é obrigatório.',
		//     date: 'O campo "{0}" precisa conter uma data válida ({1}).',
		//     minlength: 'O campo "{0}" precisa ser maior que {1} caracteres',
		//     maxlength: 'O campo "{0}" precisa ser menor que {1} caracteres.'
		//   }
		// };


	}


	windowResized = dims => this.setState({'window': dims});

	componentWillMount() {

		window = Dimensions.get("window");
		this.setState({'window': window});
        Dimensions.addEventListener("change", this.windowResized);
    }

    componentWillUnmount() {
      
	  Dimensions.removeEventListener("change", this.windowResized);
	  
    }




	_onSendButton = () => {    

		this.setState({ 
			responseModal: true
		},() => {

			
			// setTimeout(() => {

			// 	this.setState({responseModalStatus: 'success'});
		  
			// }, 4000);


		})
	
	}

	
	
	goToRequestView = () => {    
		
		// this.setState(
		// 	{ 
		// 		responseModal: false
		// 	}
		// )

		this.setState({responseModalStatus: 'success'});

	};



	pickSingleWithCamera(cropping, mediaType='photo') {
		ImagePicker.openCamera({
			cropping: cropping,
			width: 500,
			height: 500,
			includeExif: true,
			mediaType,
		}).then(image => {
			console.log('received image', image);

			const newImage = {uri: image.path, width: image.width, height: image.height, mime: image.mime};
	
			this.setState(state => {
				const medias = state.medias.concat(newImage);
	
				return {
					medias,
					newImage,
				};
			});



		}).catch(e => alert(e));
	}

	pickMultiple() {
		ImagePicker.openPicker({
			multiple: true,
			waitAnimationEnd: false,
			includeExif: true,
			forceJpg: true,
		}).then(medias => {
			
			// const list = [newItem, ...state.medias];
			let list = this.state.medias;

			medias.map(i => {				
				const newItem = {uri: i.path, width: i.width, height: i.height, mime: i.mime};
				list = [...list, newItem];
			})

			this.setState({
				medias: list
			});

		}).catch(e => alert(e));
	}

	scaledHeight(oldW, oldH, newW) {
		return (oldH / oldW) * newW;
	}

	renderVideo(video) {
		console.log('agregar video', video);

		// return (
		// 	<View style={{height: 300, width: 300}}>
		// 		<Video source={video}
		// 			// style={{position: 'absolute',
		// 			// 		top: 0,
		// 			// 		left: 0,
		// 			// 		bottom: 0,
		// 			// 		right: 0
		// 			// 	}}
		// 			rate={1}
		// 			paused={false}
		// 			volume={1}
		// 			muted={false}
		// 			resizeMode={'cover'}
		// 			onError={e => console.log(e)}
		// 			onLoad={load => console.log(load)}
		// 			repeat={true} />
		// 	</View>
		// );
	}

	renderImage(image) {
		return <FullWidthImage 					
					source={image} 					
					PlaceholderContent={<ActivityIndicator />}						
				/>
	}

	renderAsset(item) {
		if (item.mime && item.mime.toLowerCase().indexOf('video/') !== -1) {
			return this.renderVideo(item);
		}
		else{
			return this.renderImage(item);
		}		
	}

	showActionSheet = () => {    
		this.ActionSheet.show();
	};

	actionSheetItemOnPress = (index) => {    

		switch (index) {
			case 0:
				this.pickSingleWithCamera(false)
				break;

			case 1:
				this.pickSingleWithCamera(false, mediaType='video')
				break;

			case 2:
				this.pickMultiple()
				break;

			default:
				break;
		}

	};




	mediaMenuShow = (item) => {   
		
		this.setState(
		{ 
			currentMedia: item
		},
		() => this.MediaActionSheet.show()
		)
				
	};

	mediaMenuItemClick = (index) => {    

		const { currentMedia } = this.state

		switch (index) {
			case 0:
				this.mediaRemove(currentMedia)
				break;
			
			default:
				break;
		}

	};

	mediaRemove = (currentItem) => {    
		// console.log('mediaRemove',currentItem)
		const medias = this.state.medias.filter(item => item.uri !== currentItem.uri);
		this.setState({ medias: medias });
	};




	render() {

		var optionArray = [
			'Cámara de fotos',
			'Cámara de video',
			'Galeria de imagenes',      
			'Cancelar',
		];

		var mediaOptionArray = [
			'Eliminar',			
			'Cancelar',
		];

		const {medias} = this.state;
		const {category} = this.props.request;

		return (
			
			<SafeAreaView style={[CommonStyles.safeAreaContainer]}>
				<Spinner
					visible={this.state.spinner}
					textStyle={CommonStyles.spinnerTextStyle}
				/>
				
				<ScrollView style={CommonStyles.scrollView}>
					<View style={CommonStyles.page}>

						<Text style={{ fontSize: 20, marginBottom: 20, marginTop: 20 }}>
							Servicio de {category.name}
						</Text>

						<Input
							ref="subject"
							multiline={false}
							onChangeText={(subject) => this.setState({subject})}
							value={this.state.subject}              
							placeholder='Asunto'           
							style={CommonStyles.field}                      
						/>

						<Input
							ref="description"
							multiline={true}
							numberOfLines={4}
							onChangeText={(description) => this.setState({description})}
							value={this.state.description}    
							placeholder='Descripción'     
							style={CommonStyles.field}
						/>

						<View style={{ height: 30 }} />

						<Location />

						<View style={[CommonStyles.page]}>

							<FlatList								
								data={medias}
								style={styles.gridView}            
								keyExtractor={(item) => item.uri}     
								renderItem={({ item, index }) => (
									<TouchableOpacity 
										key={index} 
										onLongPress={this.mediaMenuShow.bind(this, item)}                       
										delayLongPress={1000}
										accessibilityRole="button"     										
										>
										{this.renderAsset(item)}
									</TouchableOpacity>
								)}              
							/>

						</View>

						<ActionSheet
							ref={o => (this.MediaActionSheet = o)}          
							title={'Media'}          
							options={mediaOptionArray}          
							cancelButtonIndex={1}
							// destructiveButtonIndex={1}
							onPress={this.mediaMenuItemClick}
						/>


						<Button
							raised={false}
							type='outline'
							onPress={this.showActionSheet}
							title="Agregar imagenes"
						/>
						<ActionSheet
							ref={o => (this.ActionSheet = o)}          
							title={'Desde dónde?'}          
							options={optionArray}          
							cancelButtonIndex={3}          
							// destructiveButtonIndex={1}
							onPress={this.actionSheetItemOnPress}
						/>

						<View style={{ height: 30 }} />

						

						<Button
							onPress={this._onSendButton}
							title="Aceptar"
						/>
							
					</View>
				</ScrollView>


				<Process 
					visible={this.state.responseModal} 
					status={this.state.responseModalStatus} 
					cta={<Button onPress={this.goToRequestView} title={"Ver mi solicitud"} />}
				/>
				
						
				
			</SafeAreaView>
		);
	}

}


export default connect(
	state => ({
		auth: state.auth,
		request: state.request
	}),
	dispatch => {
		return {
			requestStateActions: bindActionCreators(RequestStateReducer, dispatch)      
		};
	}
)(FormModule);


const styles = StyleSheet.create({
	gridView: {
		marginTop: 20,
		marginBottom: 20,
		flex: 1,
		width: '100%',
		backgroundColor: '#880088',	
	},
	modalView: {    
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 50,
		backgroundColor: '#2ecc71',
		alignItems: 'center', // cross axis
	}
});

