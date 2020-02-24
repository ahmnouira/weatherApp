import React from 'react';
import PropsType from 'prop-types';

import { TextInput, StyleSheet, View } from 'react-native';

export default class SearchInput extends React.Component {


    static propTypes = {
        onSubmit: PropsType.func.isRequired,
        placeholder: PropsType.string
    }

    static defaultProps = {

        placeholder: ''

    }

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }


    handleChangetext = text => {
        this.setState({ text })

    }

    handleSubmitEditing = () => {
        const { onSubmit } = this.props;
        const { text } = this.state;

        if (!text) return;
        onSubmit(text);
        this.setState({ text: '' });
    }

    render() {

        const { placeholder } = this.props;
        const { text } = this.state.text;

        return (
            <View style={styles.container}>
                <TextInput placeholder={placeholder}
                    autoCorrect={true}
                    placeholderTextColor="white"
                    value={text}
                    onChangeText={this.handleChangetext}
                    clearButtonMode="always"
                    onSubmitEditing={this.handleSubmitEditing}
                    style={styles.textInput}
                    underlineColorAndroid="rgba(255,255,255,0)"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        height: 40,
        width: 300,
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: "#666",
        marginHorizontal: 20,
        paddingHorizontal: 10,
        borderRadius: 3
    },
    textInput: {
        flex: 1,
        color: 'white',

    }
})