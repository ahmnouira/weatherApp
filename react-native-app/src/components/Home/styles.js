import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#34495E',
    },

    containerDetails: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.2)",
        paddingHorizontal: 20,
    },

    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto'
    },
    largeText: {
        fontSize: 44

    },
    smallText: {
        fontSize: 18
    },

    imageContainer: {
        flex: 1,

    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover"
    }

});

export default styles; 