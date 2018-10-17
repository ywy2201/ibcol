import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { media, style } from 'helpers/styledComponents.js';

import { H2 } from 'components/BaseComponents';

import styled from 'styled-components';

import { transparentize } from 'polished'



const EventCardArticle = styled.article`
  cursor: pointer;
  box-sizing: border-box;

  display: flex;

  &:hover {
    background: ${transparentize(0.9, style.color.justBlue)};
  }
  
  width: 100%;
  margin: 0 0 2rem 0;
  
`;

// const EventFeatureImgDiv = styled.div`
//   background: url('/static/images/demo-event.jpg') ${style.color.almostWhite};
//   background-position: center center;
//   background-size: cover;

//   flex: 2;

//   padding-bottom: calc(100%/3);
//   width: 100%;

//   ${EventCardArticle}:hover & {
//     opacity: 0.8;
//   }

  
// `;

const EventFeatureImgContainerDiv = styled.div`
  flex: 4;
  text-align: center;
`;

const EventFeatureImg = styled.img`
  ${'' /* width: auto; */}
  max-width: 100%;
  max-height: 400px;
  margin: 0 auto;
`;



const EventPreviewDiv = styled.div`
  margin: 0;
  flex: 3;

  padding: 0rem 0rem;
  padding-right: 4.5rem;

  ${EventCardArticle}:hover & {
    
  }
  
  ${'' /* ${media.xSmallUp`
    padding: 0.2rem 0rem;
  `}
  ${media.smallUp`
    padding: 0.2rem 0rem;
  `}
  ${media.mediumUp`
    padding: 0.2rem 0rem;
  `}
  ${media.largeUp`
    padding: 0.3rem 0rem;
  `}
  ${media.xLargeUp`
    padding: 0.3rem 0rem;
  `}
  ${media.xxLargeUp`
    padding: 0.3rem 0rem;
  `} */}

`;

const EventPreviewDateDiv = styled.div`
  color: ${style.color.justBlue};
  text-transform: uppercase;
  font-weight: 300;
  ${media.smallDown`
    font-weight: 400;
  `}

  letter-spacing: 0.05rem;
`;
const EventPreviewTitleH2 = H2.extend`
  color: ${style.color.trueBlack};

  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 0.05rem;

  ${media.xSmallUp`
    margin: 0.4rem 0;
  `}
  ${media.smallUp`
    margin: 0.4rem 0;
  `}
  ${media.mediumUp`
    margin: 0.2rem 0;
  `}
  ${media.largeUp`
    margin: 0.3rem 0;
  `}
  ${media.xLargeUp`
    margin: 0.3rem 0;
  `}
  ${media.xxLargeUp`
    margin: 0.3rem 0;
  `};
`;
const EventPreviewLocationDiv = styled.div`
  text-transform: uppercase;
  font-weight: 400;
`;





class EventCardComponent extends React.Component {

  render() {
    const componentName = "EventCardComponent";





    // const { activeClassName, className, children, router, href, ...props } = this.props;


    return (
      <EventCardArticle>


        <EventPreviewDiv>
          <EventPreviewDateDiv>
            {this.props.date}
          </EventPreviewDateDiv>
          <EventPreviewTitleH2>
            {this.props.title}
          </EventPreviewTitleH2>
          <EventPreviewLocationDiv>
            {this.props.location}
          </EventPreviewLocationDiv>


        </EventPreviewDiv>

        <EventFeatureImgContainerDiv>
          <EventFeatureImg src={this.props.img} />
        </EventFeatureImgContainerDiv>

      </EventCardArticle>
    )
  }



}


EventCardComponent.propTypes = {
  // activeClassName: PropTypes.string.isRequired,
}

EventCardComponent.defaultProps = {
  // activeClassName: "active"
}

export default EventCardComponent;
