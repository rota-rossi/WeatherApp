import React from 'react';
import styled from 'styled-components/native';
import i01d from 'assets/img/01d.png';
import i01n from 'assets/img/01n.png';
import i02d from 'assets/img/02d.png';
import i02n from 'assets/img/02n.png';
import i03d from 'assets/img/03d.png';
import i03n from 'assets/img/03n.png';
import i04d from 'assets/img/04d.png';
import i04n from 'assets/img/04n.png';
import i09d from 'assets/img/09d.png';
import i09n from 'assets/img/09n.png';
import i10d from 'assets/img/10d.png';
import i10n from 'assets/img/10n.png';
import i11d from 'assets/img/11d.png';
import i11n from 'assets/img/11n.png';
import i13d from 'assets/img/13d.png';
import i13n from 'assets/img/13n.png';
import i50d from 'assets/img/50d.png';
import i50n from 'assets/img/50n.png';
import {FC} from 'react';
import {ImageRequireSource} from 'react-native';

type ImageObj = {
  [key: string]: ImageRequireSource;
};

const imageObj: ImageObj = {
  '01d': i01d,
  '01n': i01n,
  '02d': i02d,
  '02n': i02n,
  '03d': i03d,
  '03n': i03n,
  '04d': i04d,
  '04n': i04n,
  '09d': i09d,
  '09n': i09n,
  '10d': i10d,
  '10n': i10n,
  '11d': i11d,
  '11n': i11n,
  '13d': i13d,
  '13n': i13n,
  '50d': i50d,
  '50n': i50n,
};

const Image = styled.Image<{size?: number}>`
  width: ${p => p.size ?? '40'}px;
  height: ${p => p.size ?? '40'}px;
`;

type Props = {
  icon: string;
  size?: number;
};
export const WeatherIcon: FC<Props> = props => (
  <Image source={imageObj[props.icon]} size={props.size} />
);
