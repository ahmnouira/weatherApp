import React from 'react';
import PropsType from 'prop-types';
import { TextInput, View } from 'react-native';
import styles from './styles';

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

