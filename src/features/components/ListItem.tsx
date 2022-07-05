import React from 'react';
import {FC} from 'react';
import {WeatherIcon} from 'src/components/WeatherIcon';
import {SelectFromFutureItem} from 'src/store/slices/types';
import styled from 'styled-components/native';

const Container = styled.View`
  padding: 8px;
  width: 80px;
  background-color: white;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 8px;
  margin: 4px;
`;
const Title = styled.Text`
  font-size: 10px;
  font-weight: bold;
  line-height: 12px;
`;

type ScreenProps = {
  item: SelectFromFutureItem;
};
const ListItem: FC<ScreenProps> = ({item}) => {
  return (
    <Container>
      <Title>{item.hour}</Title>
      <WeatherIcon icon={item.icon} size={32} label={item.skyCoverage} />
      <Title>{item.temp.toFixed()}°C</Title>
    </Container>
  );
};

export default ListItem;
