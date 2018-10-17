import styled from 'styled-components';
import PropTypes from 'prop-types';
import { media, style } from 'helpers/styledComponents.js';
import theme from 'styled-theming';



const H1 = styled.h1`
  ${'' /* text-transform: uppercase; */}
  color: ${style.color.notReallyBlack};

  ${'' /* text-align: center; */}
  width: 100%;

  font-family: ${style.font.family.fancy};
  
  font-weight: normal;
  

  font-size: 2rem;
  margin: 0rem 0 0.8rem;

  

  

  

  

  ${'' /* ${media.xSmallUp`
    font-size: 1.3rem;
    margin: 1rem 0;
  `}
  ${media.smallUp`
    font-size: 1.3rem;
    margin: 1rem 0;
  `}
  ${media.mediumUp`
    font-size: 1.5rem;
    margin: 1.1rem 0;
  `}
  ${media.largeUp`
    font-size: 1.8rem;
    margin: 1.2rem 0;
  `}
  ${media.xLargeUp`
    font-size: 1.8rem;
    margin: 1.2rem 0;
  `}
  ${media.xxLargeUp`
    font-size: 1.8rem;
    margin: 1.2rem 0;
  `} */}

`;

export default H1;


H1.defaultProps = {
  displayMode: 'default'
}

H1.propTypes = {
  displayMode: PropTypes.oneOf(['default', 'invert'])
}