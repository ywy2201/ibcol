import styled from 'styled-components';
import { media, style } from 'helpers/styledComponents.js';


const H3 = styled.h3`
  
  color: ${style.color.trueWhite};
  width: 100%;
  text-align: left;
  margin: 0.4rem 0; 
  font-size: 1.125rem;
  font-weight: 300;
  ${media.smallDown`
    font-weight: 400;
  `}


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

export default H3;
