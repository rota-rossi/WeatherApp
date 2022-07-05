import {format, parse} from 'date-fns';
import React from 'react';
import {FC} from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  padding-bottom: 8px;
  background-color: white;
  opacity: 0.9;
  display: flex;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
`;

type ScreenProps = {
  date: string;
};
const SectionHeader: FC<ScreenProps> = props => {
  const title = format(
    parse(props.date, 'yyyyMMdd', new Date()),
    'dd/MMM/yyyy',
  );
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

export default SectionHeader;
