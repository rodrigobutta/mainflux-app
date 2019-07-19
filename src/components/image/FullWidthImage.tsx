import React from 'react';
import {Image, View, Text} from 'react-native';

export default class FullWidthImage extends React.Component {
    constructor() {
        super();

        this.state = {
            width: 100,
            height: 100
        };
    }

    _onLayout(event) {

        const containerWidth = event.nativeEvent.layout.width;
        
        if (this.props.ratio) {

            this.setState({
                width: containerWidth,
                height: containerWidth * this.props.ratio
            });       

        } else if (typeof this.props.source === 'object') {

            this.setState({
                width: containerWidth,
                height: containerWidth * this.props.source.height / this.props.source.width
            });

        }
        else{

            Image.getSize(this.props.source, (width, height) => {
                this.setState({
                    width: containerWidth,
                    height: containerWidth * height / width
                });
            });

        }

    }

    render() {
        return (
            <View onLayout={this._onLayout.bind(this)}>
                <Image
                    source={this.props.source}
                    style={{
                        width: this.state.width,
                        height: this.state.height
                    }}
                     />                    
            </View>
        );
    }
}