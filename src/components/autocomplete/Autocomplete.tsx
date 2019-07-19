import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewPropTypes as RNViewPropTypes,
  Animated,
  ScrollView
} from 'react-native';


import { searchProduct } from "./searchProduct";


// const ViewPropTypes = RNViewPropTypes || View.propTypes;


export default class Autocomplete extends React.Component<PropsType, any> {
    constructor (props) {
        super(props)

        this.state = {
            searchValue: '',
            showResults: false,
            results: [],
            animation: new Animated.Value(0)
        }
    }

    changeSearchValue (searchValue) {
        const { startSuggestingFrom } = this.props
        this.setState({ searchValue }, () => {

            searchValue = searchValue.trim().toLowerCase();

            if (searchValue.length >= startSuggestingFrom) {
                this.search()
            } else if (searchValue.length === 0) {
                this.setState({ showResults: false })
            }

        })
    }

    showSuggestBox () {
        const { inputStyle: { height } } = this.props
        const { results } = this.state
        const { suggestBoxMaxHeight } = this.props

        Animated.timing(
            this.state.animation,
            {
                toValue: suggestBoxMaxHeight,
                duration: 500
            }
        ).start()
    }

    async search () {
        const { searchValue } = this.state
        const { list } = this.props
        const results = await searchProduct(searchValue, list)
        this.setState({ results, showResults: true }, () => {
            this.showSuggestBox()
        })
    }

    render() {
        const { results, showResults, searchValue } = this.state
        const { placeholder } = this.props
        return (
            <View>
                <TextInput
                    style={this.props.inputStyle}
                    onChangeText={(text) => this.changeSearchValue(text)}
                    value={searchValue}
                    placeholder={placeholder}
                />
                {
                    showResults &&
                    <Animated.View style={[this.props.suggestBoxStyle, { height: this.state.animation }]}>
                        <ScrollView>
                            {
                                results.map(item => {
                                    return this.props.renderListItem(item)
                                })
                            }
                        </ScrollView>
                    </Animated.View>
                }

            </View>
        )
    }
}