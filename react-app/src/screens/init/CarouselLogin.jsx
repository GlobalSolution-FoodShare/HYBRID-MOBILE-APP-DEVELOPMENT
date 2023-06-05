import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
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
      <View style={styles.paginationContainer}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeSlide && styles.activePaginationDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        showsPagination={false}
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
    flex: 1,
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
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#294DCA',
  },
  activePaginationDot: {
    backgroundColor: 'gray',
  },
});

export default CarouselLogin;
