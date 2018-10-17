import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styled from 'styled-components';

import { media, style } from 'helpers/styledComponents.js';

const StageUL = styled.ul`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  margin: 6rem auto;
  padding: 0;
  justify-content: space-between;


  ${media.smallDown`
    margin: 1rem auto;
    flex-direction: column;
  `}

  > li {

    
    
    text-align: center;

    cursor: pointer;
    

    margin: 0;

    position: relative;

    display: flex;

    flex: 1;
    
    &:first-child {
      margin-left: 1.5rem;
    }
    
    ${media.smallDown`
      flex-direction: column;
      &:first-child {
        margin-left: 0rem;
      }
    `}


    .stage-container {
      flex: 8;
      font-size: .875rem;


      ${media.smallDown`
        display: flex;
        align-items: center;
      `}

      

      .badge {
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center center;
        

        padding-bottom: 100%;

        position: relative;

        margin-bottom: 2rem;

        ${media.smallDown`
          width: 30vw;
          height: 30vw;
          padding: 0;
        `}

        .name {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          font-size: .75rem;
        }
      }
      
      .meta {
        .timeline {
          margin-bottom: 0.2rem;
        }

        ${media.smallDown`
          flex: 1;
          text-align: left;
          padding-left: 1rem;
          padding-bottom: 1.5rem;

          
        `}
      }
    }
    

    &.status-pending {
      &.colormode-aqua {
        .stage-container {
          .badge {
            background-image: url('/static/images/roadmap_stage_badge_pending_aqua.png');
          }
        }
      }

      &.colormode-lime {
        .stage-container {
          .badge {
            background-image: url('/static/images/roadmap_stage_badge_pending_lime.png');
          }
        }
      }
    }

    &.status-completed {
      &.colormode-aqua {
        .stage-container {
          .badge {
            background-image: url('/static/images/roadmap_stage_badge_completed_aqua.png');
          }
        }
      }

      &.colormode-lime {
        .stage-container {
          .badge {
            background-image: url('/static/images/roadmap_stage_badge_completed_lime.png');
          }
        }
      }
    }



    &.status-inProgress {
      &.colormode-aqua {
        .stage-container {
          .badge {
            background-image: url('/static/images/roadmap_stage_badge_in_progress_aqua.png');
          }
        }
      }

      &.colormode-lime {
        .stage-container {
          .badge {
            background-image: url('/static/images/roadmap_stage_badge_in_progress_lime.png');
          }
        }
      }
    }

    
    &::after {
      flex: 1;
      content: " ";

      
      
      ${'' /* padding: 1rem; */}
      
      margin: 0 0.2rem;

      background-repeat: no-repeat;
      background-size: 100% auto;
      
      
      background-position: center 40%;

      ${media.largeDown`
        background-position: center 8.5vw;
      `}

      ${media.smallDown`
        padding: 1rem;
        background-position: center bottom;
        transform: rotate(90deg);
        margin: 0;
        position: absolute;
        bottom: 0;
        left: calc(30vw/2);
      `}
    }
      
    
    
    &:not(:last-child) {
      &.colormode-aqua {
        &::after {
        
          background-image: url('/static/images/roadmap_stage_link_aqua.png');
        }
      }

      &.colormode-lime {
        &::after {
        
          background-image: url('/static/images/roadmap_stage_link_lime.png');
        }
      }
    }

  }

  
`;



class RoadMapComponent extends React.Component {


  render() {

    const componentName = "RoadMapComponent";

    const stages = [
      {
        name: 'Stage 1',
        timeline: 'Q3/2017',
        description: 'Project start',
        status: 'completed'
      },
      {
        name: 'Stage 2',
        timeline: 'Q2/2018',
        description: 'Release of technical specifications, start of open source development',
        status: 'inProgress'
      },
      {
        name: 'Stage 3',
        timeline: 'Q4/2018',
        description: 'Proof-of-concept implementation release',
        status: 'pending'
      },
      {
        name: 'Stage 4',
        timeline: 'Q1/2019',
        description: 'Test-net release',
        status: 'pending'
      },
      {
        name: 'Stage 5',
        timeline: 'Q2/2019',
        description: 'Main-net release',
        status: 'pending'
      },
      
    ];


    return (
      <StageUL className={classNames(componentName)}>
        {
          stages.map((stage, index) => {

            return (<li className={classNames("stage", "status-" + stage.status, 'colormode-' + this.props.colormode)} key={index}>
              <div className="stage-container">
                <div className="badge"><div className="name">{stage.name}</div></div>
                <div className="meta">
                  <div className="timeline">{stage.timeline}</div>
                  <div className="description">{stage.description}</div>
                </div>
              </div>
            </li>);
          })
        }


      </StageUL>
    );
  }
}


RoadMapComponent.propTypes = {
  colormode: PropTypes.string,
}

RoadMapComponent.defaultProps = {
  colormode: "aqua"
}

export default RoadMapComponent;
