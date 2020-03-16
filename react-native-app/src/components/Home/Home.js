import React from 'react';
import { StatusBar, ActivityIndicator, View, ImageBackground, Text, KeyboardAvoidingView } from 'react-native';
import SearchInput from '../SearchInput';
import getImageForWeather from '../../utils/getImageForWeather';
import styles from './styles';

const Home = ({ location, error, loading, weather, temperature, handleSearch }) => {


    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <StatusBar barStyle="light-content" />
            <ImageBackground source={getImageForWeather(weather)}
                style={styles.imageContainer}
                imageStyle={styles.image}>
                <View style={styles.containerDetails}>
                    <ActivityIndicator animating={loading} color="white" size="large" />
                    {!loading && (
                        <View>
                            {error && (
                                <Text style={[styles.largeText, styles.textStyle]}>Could not load weather, please try a different city          </Text>
                            )}
                            {!error && (
                                <View>
                                    <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
                                    <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                                    <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(temperature)}°`}</Text>
                                </View>
                            )}
                            <SearchInput placeholder="Search for city" onSubmit={handleSearch} />
                        </View>
                    )}
                </View>
            </ImageBackground>
        </KeyboardAvoidingView >
    )
}

export default Home; 