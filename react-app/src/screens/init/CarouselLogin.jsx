import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SpanBold from '../templates/text/SpanBold.jsx';

const CarouselLogin = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const carouselData = [
    {
      image: require('../../../assets/celular.png'),
      text: 'Faça ou receba doações de \n forma rápida e prática',
      width: 338,
      height: 275,
    },
    {
      image: require('../../../assets/cesta.png'),
      width: 253,
      height: 294,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View>
        {item.text && (
          <SpanBold
            label={'Faça ou receba doações de forma rápida e prática'}
            positionStyle={style.positionSpan}
          />
        )}
        <Image
          source={item.image}
          style={{
            top: 50,
            width: item.width,
            height: item.height,
            alignSelf: 'center',
            marginRight: 25,
          }}
        />
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <Pagination
        dotsLength={carouselData.length}
        activeDotIndex={activeSlide}
        containerStyle={style.paginationContainer}
        dotStyle={style.paginationDot}
        inactiveDotStyle={style.paginationDotInactive}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={carouselData}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        layout="default"
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
});

const style = StyleSheet.create({
  positionSpan: {
    marginTop: 49,
    marginRight: 25,
  },
  paginationContainer: {
    paddingVertical: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop:52,
    backgroundColor: '#294DCA', 
  },
  paginationDotInactive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'gray',
  },
});

export default CarouselLogin;
