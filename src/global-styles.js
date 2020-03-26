import tungstenMedium from './styles/Tungsten-Medium.otf';
import tungstenSemibold from './styles/Tungsten-Semibold.otf';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Tungsten';
    font-style: normal;
    font-weight: 400;
    src:
      local('Tungsten'),
      local('Tungsten-Medium'),
      url(${tungstenMedium}) format('otf');
  }

  @font-face {
    font-family: 'Tungsten';
    font-style: normal;
    font-weight: 400;
    src:
      local('Tungsten-Semibold'),
      url(${tungstenSemibold}) format('otf');
  }
`;