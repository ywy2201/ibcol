import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import _ from 'lodash';

import styled from 'styled-components';

import { transparentize } from 'polished';

import { media, style } from 'helpers/styledComponents.js';


const teamMembers = [
  {
    name: "James Wo",
    position: "CEO",
    photo: "james-wo.png",
    description: "FinTech & Business Genius. Founder, Chairman, & Board member of more companies than you can shake a stick at.",
    twitter: "_wli",
    linkedIn: ""
  },
  {
    name: "Kilian Rausch",
    position: "Product Director",
    photo: "kilian-rausch.png",
    description: "Keeps us all in line, something the Germans are typically good at.",
    twitter: "",
    linkedIn: "williamliio"
  },
  {
    name: "Ryan Thoma",
    position: "Marketing Director (Intl.) ",
    photo: "ryan-thoma.png",
    description: "Spends his working days trawling twitter for the next altcoin set to moon, but if the boss asks, it’s ‘research’.",
    twitter: "_wli",
    linkedIn: "williamliio"
  },
  {
    name: "Wen Xu",
    position: "Marketing Director (Asia) ",
    photo: "wen-xu.jpg",
    description: "Enjoys romantic walks on the beach, wait, what was this bio for?",
    twitter: "",
    linkedIn: ""
  },
  {
    name: "Moshe Shababo",
    position: "XUD Dev",
    photo: "moshe-shababo.jpg",
    description: "Self-proclaimed Wizard, Moshe is assisting us in summoning the Exchange Union Daemon.",
    twitter: "",
    linkedIn: ""
  },
  {
    name: "Daniel McNally",
    position: "Lightning Network Dev",
    photo: "daniel-mcnally.png",
    description: "Master of Layer 2. As a professional poker player, Daniel always has an ace up his sleeve.",
    twitter: "",
    linkedIn: ""
  },
  // {
  //   name: "Balamurali Pandranki",
  //   position: "Blockchain Dev",
  //   photo: "balamurali-pandranki.png",
  //   description: "Whatever you do, don’t say his name three times in front of the mirror at midnight!",
  //   twitter: "",
  //   linkedIn: ""
  // },
  {
    name: "Ankur Kumar",
    position: "Technical Product Manager",
    photo: "ankur-kumar.png",
    description: "Known as “dopetard” on the internet, Ankur spends most of his time switching windows from Sketchapp to Vim to Google docs, like every product manager does, right?",
    twitter: "",
    linkedIn: ""
  },
  {
    name: "Anthony Luo",
    position: "Senior Marketing Manager (Asia)",
    photo: "anthony-luo.png",
    description: "Yeah, he’s the big guy you met at that one conference. The Baymax of Exchange Union.",
    twitter: "",
    linkedIn: ""
  },
  // {
  //   name: "Jonathan Close",
  //   position: "Senior Marketing Manager (Intl.)",
  //   photo: "jonathan-close.png",
  //   description: "Official whip cracker & part-time keyboard warrior. ",
  //   twitter: "",
  //   linkedIn: ""
  // },
  {
    name: "Sherry Liu",
    position: "Social Media Specialist",
    photo: "sherry-liu.jpg",
    description: "Sherry is the marketing team’s secret weapon, a blackbelt in GoogleFu.",
    twitter: "",
    linkedIn: ""
  },
  // {
  //   name: "Zoey Wei",
  //   position: "Graphics Designer",
  //   photo: "zoey-wei.png",
  //   description: "Wears more white foundation than a Japanese Geisha.",
  //   twitter: "",
  //   linkedIn: ""
  // },
  {
    name: "Zhou Wei",
    position: "Graphics Designer",
    photo: "zhou-wei.png",
    description: "Adamant he is an <i>Artiste</i>, not a designer.",
    twitter: "",
    linkedIn: ""
  },
  {
    name: "Erin Guo",
    position: "Event Manager",
    photo: "erin-guo.png",
    description: "Erin demonstrated her superpower at our Christmas party: the ability to walk in stilettos after four Long Island Iced Teas!",
    twitter: "",
    linkedIn: ""
  },
  {
    name: "Ping Li",
    position: "Copywriter",
    photo: "ping-li.png",
    description: "Silent assassin with a keyboard.",
    twitter: "",
    linkedIn: ""
  }

];

const advisors = [
  {
    name: "Brendan Eich",
    position: "Father of the JavaScript. Founder & CEO of Brave. Former CEO & CTO of Mozilla.",
    photo: "brendan-eich.png",
    description: ""
  },
  {
    name: "Paul Chou",
    position: "Co-founder & CEO of LedgerX, the fully regulated institutional trading and clearing platform in US.",
    photo: "paul-chou.png",
    description: ""
  },
  {
    name: "Sathvik Vishwanath",
    position: "Co-founder & CEO of Unocoin, the largest bitcoin exchange in India.",
    photo: "sathvik-vishwanath.png"
  },
  {
    name: "Sunny Ray",
    position: "Co-founder & President of Unocoin.",
    photo: "sunny-ray.png",
    description: ""
  },
  {
    name: "Sebastian Serrano",
    position: "Co-Founder & CEO of Ripio, the leading Bitcoin exchange and payment company in Latin America.",
    photo: "sebastian-serrano.png",
    description: ""
  },
  {
    name: "Andrew Lee",
    position: "CEO of Purse, the world’s largest marketplace for Bitcoin.",
    photo: "andrew-lee.png",
    description: ""
  },
  {
    name: "Ryan X. Charles",
    position: "Co-founder & CEO of Yours. Former cryptocurrency engineer at Reddit.",
    photo: "ryan-x-charles.png",
    description: ""
  },
  {
    name: "Kevin Zhou",
    position: "Co-founder of Galois Capital, a crypto trading fund. Former head of trading and advisor of Kraken.",
    photo: "kevin-zhou.png",
    description: ""
  },
  {
    name: "Gabriel Kurman",
    position: "Co-founder of RSK Labs, one of the best solutions for bitcoin scaling debate.",
    photo: "gabriel-kurman.png",
    description: ""
  },
  {
    name: "Shenghong Wang",
    position: "Emeritus principal of Fudan University. Renowned educationalist and scientist.",
    photo: "shenghong-wang.png",
    description: ""
  },
  {
    name: "Yonghong Fan",
    position: "Co-founder, former General Manager & Vice Chairman of China Asset Management. Chief Investment Officer of China Life.",
    photo: "yonghong-fan.png",
    description: ""
  },
  {
    name: "Star Xu",
    position: "Co-founder and CEO of OKCoin, Former CTO of Docin.",
    photo: "star-xu.png",
    description: ""
  },
  {
    name: "Terry Culver",
    position: "Vice dean of development, Columbia University School of International and Public Affairs.",
    photo: "terry-culver.png",
    description: ""
  },
  {
    name: "Mikael Wang",
    position: "Former CTO of BTCC. Former chief solutions architect of Ericsson",
    photo: "mikael-wang.png",
    description: ""
  }

];




const TeamUL = styled.ul`

  


  padding-left: 0;

  display: flex;
  flex-wrap: wrap;
  ${'' /* justify-content: flex-start; */}
  justify-content: flex-start;

  margin-top: 3rem;

  

  > li {
    
    &.hasDescription {
      cursor: pointer;
    }
    display: block;
    position: relative;

    text-align: center;
    margin: 1.5rem;
    padding: 1rem;
    

    ${media.smallDown`
      margin: 0.8rem;
      padding: 0.8rem;
    `};


    box-sizing: border-box;
    ${'' /* cursor: pointer; */}
    cursor: default;


    width: calc(100%/6 - 2* 1.5rem);

    ${media.largeDown`
      width: calc(100%/4 - 2* 1.5rem);
    `};

    ${media.mediumDown`
      width: calc(100%/3 - 2* 1.5rem);
    `};

    ${media.smallDown`
      width: calc(100%/2 - 2* 0.8rem);
    `};

    ${media.xSmallDown`
      width: calc(100% - 2* 0.8rem);
    `};

    .detailsContainer {
      display: none;

    }

    .photo {
      display: flex;
      align-items: center;
      justify-content: center;
      ${'' /* text-align: center; */}
      ;
      ${'' /* padding: 2rem; */}

      width: 125px;
      height: 125px;

      ${media.smallDown`
        width: 100px;
        height: 100px;
      `};

      ${media.xSmallDown`
        width: 180px;
        height: 180px;
      `};

      margin: 0 auto;

      ${'' /* height: 100px;
      weight: 100px; */}
      background: ${style.color.placeholderBlue};
      background-size: 100%;
      border-radius: 10rem;

      margin-bottom: 1.5rem;

      ${'' /* filter: sepia(100%) hue-rotate(190deg) ; */}

    }

    .name {
      font-size: 1.125rem;
      margin-bottom: 0.5rem;

    }

    .position {
      ${'' /* text-align: left; */}

      font-size: 0.875rem;

      ul {
        margin-top: 0.5rem;
        text-align: left;
      }


    }

    


    &.selected, &:hover {
      background-image: url('/static/images/profile_selected_background.png');
      background-size: 154px auto;
      background-position: center 2px;
      background-repeat: no-repeat;

      
      ${media.smallDown`
        background-size: 120px auto;
      `};

      ${media.xSmallDown`
        background-size: 205px auto;
        background-position: center top;
      `};


      .photo {
        filter: none;
      }

    }


    &.selected {

      margin-bottom: 14rem;


      ${media.xSmallDown`
        margin-bottom: 15rem;
      `}

      .detailsContainer {
        cursor: auto;

        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        position: absolute;
        top: calc(100% + 1.5rem);
        
        z-index: 2;

        text-align: left;

        background: ${style.color.farkTransparentDarkBlue};

        border: 3px solid ${style.color.aquaBlue};
        border-radius: 0.5rem;

        padding: 2rem 1rem;
        box-sizing: border-box;

        width: calc((100% + 2*1.5rem) * 6);

        ${media.largeDown`
          width: calc((100% + 2*1.5rem) * 4);
        `};

        ${media.mediumDown`
          width: calc((100% + 2*1.5rem) * 3);
          border: 2px solid ${style.color.aquaBlue};
        `};

         ${media.smallDown`
          width: calc((100% + 2*0.8rem) * 2);
          border: 1px solid ${style.color.aquaBlue};
        `};

         ${media.xSmallDown`
          width: calc((100% + 2*0.8rem) * 1);
        `};


        .arrow {
          position: absolute;
          top: -20px;
          

          ${media.mediumDown`
            top: -18px;
          `}

          ${media.smallDown`
            top: -16px;
          `}

          &::before {
            content: ' ';
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-bottom: 20px solid ${style.color.aquaBlue};
            z-index: 5;
            position: absolute;
            top: 0;

            ${media.mediumDown`
              border-left: 18px solid transparent;
              border-right: 18px solid transparent;
              border-bottom: 18px solid ${style.color.aquaBlue};
            `}

            ${media.smallDown`
              border-left: 16px solid transparent;
              border-right: 16px solid transparent;
              border-bottom: 16px solid ${style.color.aquaBlue};
            `}
            
            
          }

          &::after {
            content: ' ';
            width: 0;
            height: 0;
            border-left: 14px solid transparent;
            border-right: 14px solid transparent;
            
            z-index: 6;
            
            
            
            ${'' /* border-bottom: 20px solid ${transparentize(0.7, style.color.darkBlue)}; */}
            border-bottom: 14px solid ${style.color.farkTransparentDarkBlue};

            position: absolute;
            top: 6px;
            left: 6px;

            ${media.mediumDown`
              top: 4px;
              left: 4px;
            `}

            ${media.smallDown`
              top: 2px;
              left: 2px;
            `}
            
          
        
          } 
        }
        
        .photo {
          flex-shrink: 0;
          margin-left: 2rem;
          filter: none;

          ${media.smallDown`
            display: none;
          `}
        }

        .content {
          width: 90%;
          margin-left: 2rem;

          .topBar {
            padding-bottom: 1rem;
            margin-bottom: 1rem;

            background-image: linear-gradient(to right, ${style.color.aquaBlue}, ${style.color.placeholderBlue});
            background-repeat: no-repeat;
            background-size: 100% 3px;
            background-position: bottom center;
            
            .identity {
              display: flex;
              align-items: center;

              .name {
                ${'' /* margin-right: 0rem; */}
              }

              .socialBadges {
                display: flex;
                align-items: center;
                margin-left: 1rem;

                

                a {
                  border-bottom: none;
                  margin-right: 0.5rem;
                  margin-top: -0.2rem;

                  img {
                    width: 15px;
                    
                  }
                }
              }
            }
          }
        }

        .control {
          width: 10%;
          
          margin-top: -1rem;
          div {
            cursor: pointer;
            text-align: right;
            text-transform: uppercase;
          }
        }

      }





      &:nth-child(6n - 5) {
        .detailsContainer {
          left: calc(-0 * (100% + 2*1.5rem) - 1.5rem );

          .arrow {
            
            left: calc((100%/6 * 0) + ((100%/6 - 20px - 1.5rem) / 2) );
          }
        }
      }

      &:nth-child(6n - 4) {
        .detailsContainer {
          left: calc(-1 * (100% + 2*1.5rem) - 1.5rem );

          .arrow {
            
            
            left: calc((100%/6 * 1) + ((100%/6 - 20px - 1.5rem) / 2) );
          }
        }
      }

      &:nth-child(6n - 3) {
        .detailsContainer {
          left: calc(-2 * (100% + 2*1.5rem) - 1.5rem );

          .arrow {
            
            
            left: calc((100%/6 * 2) + ((100%/6 - 20px - 1.5rem) / 2) );
          }
        }
      }

      &:nth-child(6n - 2) {
        .detailsContainer {
          left: calc(-3 * (100% + 2*1.5rem) - 1.5rem );

          .arrow {
            
            
            left: calc((100%/6 * 3) + ((100%/6 - 20px - 1.5rem) / 2) );
          }
        }
      }
      
      &:nth-child(6n - 1) {
        .detailsContainer {
          left: calc(-4 * (100% + 2*1.5rem) - 1.5rem );

          .arrow {
            
            
            left: calc((100%/6 * 4) + ((100%/6 - 20px - 1.5rem) / 2) );
          }
        }
      }
      
      &:nth-child(6n) {
        .detailsContainer {
          left: calc(-5* (100% + 2*1.5rem) - 1.5rem );

          .arrow {
            
            
            left: calc((100%/6 * 5) + ((100%/6 - 20px - 1.5rem) / 2) );
          }
        }
      }

      ${media.largeDown`
        &:nth-child(4n - 3) {
          .detailsContainer {
            left: calc(-0 * (100% + 2*1.5rem) - 1.5rem );

            .arrow {
              
              left: calc((100%/4 * 0) + ((100%/4 - 20px - 1.5rem) / 2) );
            }
          }
        }

        &:nth-child(4n - 2) {
          .detailsContainer {
            left: calc(-1 * (100% + 2*1.5rem) - 1.5rem );

            .arrow {
              
              
              left: calc((100%/4 * 1) + ((100%/4 - 20px - 1.5rem) / 2) );
            }
          }
        }

        &:nth-child(4n - 1) {
          .detailsContainer {
            left: calc(-2 * (100% + 2*1.5rem) - 1.5rem );

            .arrow {
              
              
              left: calc((100%/4 * 2) + ((100%/4 - 20px - 1.5rem) / 2) );
            }
          }
        }

        &:nth-child(4n) {
          .detailsContainer {
            left: calc(-3 * (100% + 2*1.5rem) - 1.5rem );

            .arrow {
              
              
              left: calc((100%/4 * 3) + ((100%/4 - 20px - 1.5rem) / 2) );
            }
          }
        }
        
        
      `}




      ${media.mediumDown`
        &:nth-child(3n - 2) {
          .detailsContainer {
            left: calc(-0 * (100% + 2*1.5rem) - 1.5rem );

            .arrow {
              
              left: calc((100%/3 * 0) + ((100%/3 - 18px - 1.5rem) / 2) );
            }
          }
        }

        &:nth-child(3n - 1) {
          .detailsContainer {
            left: calc(-1 * (100% + 2*1.5rem) - 1.5rem );

            .arrow {
              
              
              left: calc((100%/3 * 1) + ((100%/3 - 18px - 1.5rem) / 2) );
            }
          }
        }

        &:nth-child(3n) {
          .detailsContainer {
            left: calc(-2 * (100% + 2*1.5rem) - 1.5rem );

            .arrow {
              
              
              left: calc((100%/3 * 2) + ((100%/3 - 18px - 1.5rem) / 2) );
            }
          }
        }

        
        
        
      `}




      ${media.smallDown`
        &:nth-child(2n - 1) {
          .detailsContainer {
            left: calc(-0 * (100% + 2*0.8rem) - 0.8rem );

            .arrow {
              
              left: calc((100%/2 * 0) + ((100%/2 - 16px - 0.8rem) / 2) );
            }
          }
        }

        &:nth-child(2n) {
          .detailsContainer {
            left: calc(-1 * (100% + 2*0.8rem) - 0.8rem );

            .arrow {
              
              
              left: calc((100%/2 * 1) + ((100%/2 - 16px - 0.8rem) / 2) );
            }
          }
        }
        
      `}



      ${media.xSmallDown`
        

        &:nth-child(n) {
          .detailsContainer {
            left: calc(-0 * (100% + 2*0.8rem) - 0.8rem );

            .arrow {
              
              
              left: calc((100%/1* 0) + ((100%/1 - 16px - 0.8rem) / 2) );
            }
          }
        }
        
      `}




    }

  }
`;



class TeamListingComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      selectedRecordKey: undefined
    };
  }

  closeRecord = (e) => {
    // console.log('closeFAQ');

    this.setState({
      selectedRecordKey: undefined
    })

    e.stopPropagation();

  }

  selectRecord = (e) => {

    
    if (e.currentTarget.dataset.hasDescription === 'true') {
      this.setState({
        selectedRecordKey: e.currentTarget.dataset.key
      })
    }

    

  }

  render() {

    const componentName = "TeamListingComponent";

    const records = this.props.datasource === 'team' ? teamMembers : advisors;

    
    const limit = this.props.limit === undefined ? records.length : this.props.limit;

    


    return (
      <TeamUL className={classNames(componentName, {
        recordSelected: this.state.selectedRecordKey !== undefined
      })}>
        {
          records.filter((record, index) => index < limit).map((record, index) => {
            return (<li key={index} data-key={index} data-has-description={!_.isEmpty(record.description)} onClick={this.selectRecord} className={classNames("member", {
              selected: this.state.selectedRecordKey == index,
              hasDescription: !_.isEmpty(record.description)
            })}>
              <div className="photo" style={{
                backgroundImage: `url('/static/images/team/${record.photo}')`
              }}></div>
              <div className="name">{record.name}</div>
              <div className="position" dangerouslySetInnerHTML={{ __html: record.position }}/>
              
              {
                !_.isEmpty(record.description) &&
                <div className={classNames("detailsContainer")}>
                <div className="arrow"></div>
                <div className="photo" style={{
                  backgroundImage: `url('/static/images/team/${record.photo}')`
                }}></div>
                <div className="content">
                  <div className="topBar">
                    <div className="identity">
                      <div className="name">{record.name}</div>
                      <div className="socialBadges">
                        
                        {
                          !_.isEmpty(record.twitter) &&
                          <a href={`https://twitter.com/${record.twitter}`} target="_blank"><img src="/static/images/profile_twitter.png" /></a>
                        }
                        {
                          !_.isEmpty(record.linkedIn) &&
                          <a href={`https://www.linkedin.com/in/${record.linkedIn}/`} target="_blank"><img src="/static/images/profile_linkedin.png" /></a>
                        }
                      </div>
                    </div>
                    <div className="position">{record.position}</div>
                  </div>
                  <div className="bottomBar" dangerouslySetInnerHTML={{ __html: record.description }}></div>
                </div>

                <div className="control">
                  <div className="close" onClick={this.closeRecord}>x</div>

                </div>
              </div>
              }
            </li>);
          })
        }

        
      </TeamUL>
    );
  }
}


TeamListingComponent.propTypes = {
  limit: PropTypes.number,
  datasource: PropTypes.string
}

TeamListingComponent.defaultProps = {
  datasource: "team"
}

export default TeamListingComponent;
