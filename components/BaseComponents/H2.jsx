import styled from 'styled-components';
import { media, style } from 'helpers/styledComponents.js';


const H2 = styled.h2`
  
  color: ${style.color.notReallyBlack};
  width: 100%;
  
  font-family: ${style.font.family.fancy};

  font-size: 1.7rem;

  font-weight: normal;
  ${'' /* font-family: ${style.font.family.standard}; */}

  ${'' /* ${media.xSmallUp`
    font-size: 1.2rem;
    margin: 0.7rem 0;
  `}
  ${media.smallUp`
    font-size: 1.2rem;
    margin: 0.7rem 0;
  `}
  ${media.mediumUp`
    font-size: 1.4rem;
    margin: 0.8rem 0;
  `}
  ${media.largeUp`
    font-size: 1.7rem;
    margin: 1rem 0;
  `}
  ${media.xLargeUp`
    font-size: 1.7rem;
    margin: 1rem 0;
  `}
  ${media.xxLargeUp`
    font-size: 1.7rem;
    margin: 1rem 0;
  `} */}

`;

export default H2;
