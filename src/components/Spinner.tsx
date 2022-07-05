import {Animated, Easing} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import styled from 'styled-components/native';
import {useRef} from 'react';
import {useEffect} from 'react';

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export const Spinner = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Container>
      <AnimatedIcon
        name="spinner-fidget"
        size={48}
        style={{transform: [{rotate: spin}]}}
      />
    </Container>
  );
};
