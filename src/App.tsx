import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {getLocalGeoInfo} from './api/weather';

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const App = () => {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    getLocalGeoInfo().then(result => {
      setData(result);
      console.log(result);
    });
  }, []);

  return (
    <Container>
      <Text>App</Text>
    </Container>
  );
};
