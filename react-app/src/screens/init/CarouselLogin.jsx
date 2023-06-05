import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import SpanBold from '../templates/text/SpanBold.jsx';

const CarouselLogin = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselData = [
    {
      image: require('../../../assets/celular.png'),
      text: 'Faça ou receba doações de \n forma rápida e prática',
      width: 338,
      height: 275,
    },
    {
      image: require('../../../assets/cesta.png'),
      text: '',
      width: 253,
      height: 294,
    },
  ];

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}/>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        onIndexChanged={setActiveSlide}
      >
        {carouselData.map((item, index) => (
          <View key={index} style={styles.slide}>
            {item.text && (
              <SpanBold
                label={'Faça ou receba doações de forma rápida e prática'}
                positionStyle={styles.positionSpan}
              />
            )}
            <Image
              source={item.image}
              style={{
                width: item.width,
                height: item.height,
                alignSelf: 'center',
                marginRight: 25,
              }}
            />
          </View>
        ))}
      </Swiper>
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:Dimensions.get('window').height * 0.60,
    marginTop: Dimensions.get('window').height * 0.05
  },
  slide: {
    width: Dimensions.get('window').width,
    alignItems: 'center', // Centraliza verticalmente no meio
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  positionSpan: {
    marginTop: 49,
    marginRight: 25,
  },
  paginationContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 9,
    marginRight: 9,
  },
  activeDot: {
    backgroundColor: '#294DCA',
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 9,
    marginRight: 9
  },
});

export default CarouselLogin;
