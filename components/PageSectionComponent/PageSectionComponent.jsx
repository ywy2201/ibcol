import styled from 'styled-components';
import { media } from 'helpers/styledComponents.js';

const PageSectionComponent = styled.section`
  ${media.xSmallUp`
    width: 100%;
  `}
  ${media.smallUp`
    width: 100%;
  `}
  ${media.mediumUp`
    width: 100%;
  `}


  ${media.largeUp`
    width: 50%;
  `}
  ${media.xLargeUp`
    width: 50%;
  `}
  ${media.xxLargeUp`
    width: 50%;
  `}



  &.full-page {
    ${media.largeUp`
      width: 100%;
    `}
    ${media.xLargeUp`
      width: 100%;
    `}
    ${media.xxLargeUp`
      width: 100%;
    `}
  }

  &.left-section {
    
    ${media.xSmallUp`
      flex: 1;
      padding: 0;
    `}
    ${media.smallUp`
      flex: 1;
      padding: 0;
    `}
    ${media.mediumUp`
      flex: 1;
      padding: 0;
    `}
    ${media.largeUp`
      flex: 7;
      padding: 0 1rem 0 0;
    `}
    ${media.xLargeUp`
      flex: 7;
      padding: 0 1rem 0 0;
    `}
    ${media.xxLargeUp`
      flex: 7;
      padding: 0 1rem 0 0;
    `}
  }

  &.right-section {
    

    ${media.xSmallUp`
      flex: 1;
      display: none;
    `}
    ${media.smallUp`
      flex: 1;
      display: none;
    `}
    ${media.mediumUp`
      flex: 1;
      display: none;
    `}
    ${media.largeUp`
      flex: 4;
      display: block;
    `}
    ${media.xLargeUp`
      flex: 4;
      display: block;
    `}
    ${media.xxLargeUp`
      flex: 4;
      display: block;
    `}
  }
`;

export default PageSectionComponent;