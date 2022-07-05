import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  padding-bottom: 24px;
  display: flex;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
`;

const ListHeader = () => {
  return (
    <Container>
      <Title>Forecast for the next 5 days:</Title>
    </Container>
  );
};

export default ListHeader;
