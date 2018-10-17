import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styled from 'styled-components';

import { transparentize } from 'polished';

import { media, style } from 'helpers/styledComponents.js';


const faqs = [
  {
    q: 'What is Exchange Union all about?',
    a: 'Exchange Union is an open-source platform that connects digital asset exchanges around the world. It gives users access to all trading pairs, with increased liquidity, at the best market price. Our technology makes digital assets more accessible and empowers exchanges and investors around the world to fully utilize the benefits of a decentralized economy.'
  },
  {
    q: 'Is Exchange Union an Exchange?',
    a: 'No, Exchange Union is not an exchange. It is a network, or technology, which connects digital asset exchanges worldwide. '
  },
  {
    q: 'What advantages does Exchange Union offer to traders?',
    a: 'Traders stand to benefit from more trading pairs, instant price discovery, tighter spreads, through one account/familiar user interface. '
  },
  {
    q: 'How do digital asset exchanges benefit from Exchange Union?',
    a: 'Exchanges have access to a larger user base, increased liquidity, the opportunity to see increased earnings, and access to a decentralized trading infrastructure. Through a sophisticated fee and reward model utilizing the XUC token, exchanges will retain their usual trading fees and commissions. Additionally, exchanges will have the opportunity to generate additional revenue through fees paid in XUC. '
  },
  {
    q: 'Which technology is Exchange Union based on?',
    a: 'Exchange Union is comprised of a unique set of blockchain protocols. It operates entirely on Layer 2, using payment channels and atomic swap technology. There is no single blockchain to which the Exchange Union network is tied to.'
  },
  {
    q: 'As an exchange, how do I handle all this technical complexity?',
    a: 'Even though Exchange Union is developed and governed in an open-source manner, it is our main objective to make it an easy-to-use solution for exchanges. In practice, this is a technology called ‘XUD’, a node software operated by each exchange. It exposes simple APIs to integrate the orderbook, select supported assets, and execute swaps. '
  },
  {
    q: 'Why open source?',
    a: 'We believe in an open and decentralized future. Exchange Union is a complex software; therefore, having peer-reviewed work is especially important. Open reviews, audits, and tests are the best way to meet the high quality and security standards which we strive for. This also gives everyone the opportunity to create their own products and build on top of Exchange Union’s technology (Open Source License: AGPL-3.0), something that we highly encourage. '
  },
  {
    q: 'Doesn’t that enable traders to trade on Exchange Union directly without the need for a digital asset exchange platform?',
    a: 'Yes and no. Exchange Union’s technology is not ready for individual use just yet and it won’t be in the near term. We expect the vast majority of users to leave the technical complexity of running an XUD node to the exchanges. Our goal is to work symbiotically with exchanges for the betterment of the ecosystem.'
  },
  {
    q: 'What is XUC?',
    a: 'XUC is the native token of the Exchange Union network and is used as an incentive for users, developers, exchanges, and other service providers who contribute to the platform. It plays a crucial role in operating and maintaining the network.'
  },
  {
    q: 'Are transactions on Exchange Union truly instant?',
    a: 'The Lightning Network utilizes state channels to transfer funds directly between two parties, by opening a multi-sig address between them. It is currently live on Bitcoin, Litecoin, and several other chains. The <u>Raiden Network</u> supports Ethereum-based tokens, allowing for a considerable amount of the digital asset market to be traded quickly and securely. Speed is limited only by a network’s latency. '
  },
  {
    q: 'How do I buy or sell XUC?',
    a: 'You can buy or sell XUC from a wide range of exchanges listed <a href="https://www.exchangeunion.com/xuc" target="_blank">here</a>. '
  },
  {
    q: 'Doesn’t that kill arbitrage?',
    a: 'Exchange Union allows for arbitrage to occur naturally on the network. It closes market price gaps faster by matching trades across isolated markets. Exchange Union increases market efficiencies, bringing better prices to more traders.'
  },
  {
    q: 'I’d like to code for Exchange Union. How do I go about it?',
    a: 'If you’re interested in blockchain technology and you know how to write code, we’d love to hear from you. More information is available here.'
  },
  {
    q: 'When will Exchange Union begin operations?',
    a: 'Exchange Union is currently a work-in-progress. We plan to launch in the second quarter of 2019. '
  },
  {
    q: 'How does Exchange Union benefit from all of this?',
    a: 'Apart from building infrastructure which we believe will significantly benefit the greater blockchain ecosystem, Exchange Union benefits from a healthy XUC token value. Exchange Union does not generate any revenue by collecting fees when digital assets are traded on the network.'
  }
];


const FAQUL = styled.ul`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  
  padding: 0;
  justify-content: flex-start;

  &.faqSelected {
    > li {
      .questionText {
        opacity: 0.5;
        
      }
    }
  }

  > li {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;


    text-align: center;

    height: 13rem;

    padding: 0 3rem;
    box-sizing: border-box;

    cursor: pointer;
    width: calc(100%/3);

    margin: 0;

    position: relative;

    ${media.mediumDown`
      height: 8rem;
      padding: 0 1rem;
    `}

    ${media.smallDown`
      width: calc(100%/2);
    `}

    ${media.xSmall`
      width: calc(100%/1);
    `}

    &:hover, &.selected {

      

      .questionText {
        opacity: 1;

        background-image: linear-gradient(to right, ${style.color.aquaBlue}, ${style.color.placeholderBlue});
        background-repeat: no-repeat;
        background-size: 100% 3px;
        background-position: bottom center
        
      }
    }

    &.selected {
      margin-bottom: 10rem;
      
      ${media.mediumDown`
        margin-bottom: 15rem;
      `}
      

      ${media.smallDown`
        ${'' /* width: 200%; */}
      `}

      ${media.xSmall`
        ${'' /* width: 100%; */}
      `}

      .questionAnswerContainer {
        cursor: auto;

        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        position: absolute;
        top: 90%;
        left: 0;
        z-index: 2;

        text-align: left;

        background: ${style.color.farkTransparentDarkBlue};

        border: 3px solid ${style.color.aquaBlue};
        border-radius: 0.5rem;

        padding: 2rem 1rem;
        box-sizing: border-box;

        width: 300%;

        ${media.mediumDown`
          top: 102%;
          border: 2px solid ${style.color.aquaBlue};
        `}
        

        ${media.smallDown`
          border: 1px solid ${style.color.aquaBlue};
          width: 200%;
        `}

        ${media.xSmall`
          width: 100%;
        `}

        .arrow {
          position: absolute;
          top: -20px;
          ${'' /* left: calc((30% - 14px) / 2); */}

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

        .answerNumber {
          ${'' /* color: ${style.color.aquaBlue}; */}
          ${'' /* color: #145996; */}
          color: ${transparentize(0.8, style.color.aquaBlue)};
          font-weight: 700;
          font-size: 10rem;
          line-height: 7rem;
          margin-right: 2rem;
          
        }

        .content {
          width: 90%;
          
          .question {
            padding-bottom: 0.5rem;
            margin-bottom: 0.5rem;
            

            background-image: linear-gradient(to right, ${style.color.aquaBlue}, ${style.color.placeholderBlue});
            background-repeat: no-repeat;
            background-size: 100% 3px;
            background-position: bottom center
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
        
        

        ${'' /* margin-top: 100%; */}

      }

      

      

      &:nth-child(3n - 2) {
        .questionAnswerContainer {
          left: 0;

          .arrow {
            ${'' /* top: -20px; */}
            left: calc((100%/3 - 20px) / 2);
          }
        }
      }
      
      &:nth-child(3n - 1) {
        .questionAnswerContainer {
          left: -100%;

          .arrow {
            ${'' /* top: -20px; */}
            
            left: calc((100%/3) + ((100%/3 - 20px) / 2) );
          }
        }
      }
      
      &:nth-child(3n) {
        .questionAnswerContainer {
          left: -200%;

          .arrow {
            ${'' /* top: -20px; */}
            left: calc((100%/3 * 2) + ((100%/3 - 20px) / 2) );
          }
        }
      }
      
      ${media.mediumDown`
        &:nth-child(3n - 2) {
          .questionAnswerContainer {
            left: 0;

            .arrow {
              ${'' /* top: -20px; */}
              left: calc((100%/3 - 18px) / 2);
            }
          }
        }
        
        &:nth-child(3n - 1) {
          .questionAnswerContainer {
            left: -100%;

            .arrow {
              ${'' /* top: -20px; */}
              
              left: calc((100%/3) + ((100%/3 - 18px) / 2) );
            }
          }
        }
        
        &:nth-child(3n) {
          .questionAnswerContainer {
            left: -200%;

            .arrow {
              ${'' /* top: -20px; */}
              left: calc((100%/3 * 2) + ((100%/3 - 18px) / 2) );
            }
          }
        }
      `}

      ${media.smallDown`
        &:nth-child(2n - 1) {
          .questionAnswerContainer {
            left: 0;

            .arrow {
              ${'' /* top: -20px; */}
              left: calc(((100%/2 - 16px) / 2) );
            }
          }
        }
        
        &:nth-child(2n) {
          .questionAnswerContainer {
            left: -100%;

            .arrow {
              ${'' /* top: -20px; */}
              left: calc((100%/2) + ((100%/2 - 16px) / 2) );
            }
          }
        }
        
        
      `}

      ${media.xSmall`
        &:nth-child(n) {
          .questionAnswerContainer {
            left: 0;
            .arrow {
              ${'' /* top: -20px; */}
              left: calc(((100% - 16px) / 2) );
            }
          }
        }
      `}


    }

    
      

    .questionNumber {
      position: absolute;
      width: 100%;
      text-align: center;
      top: 0;
      left: 0;
      font-size: 10rem;
      font-weight: 600;
      opacity: 0.1;
      background: -webkit-linear-gradient(217deg, ${style.color.aquaBlue}, ${style.color.placeholderBlue});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      pointer-events: none;


      ${media.mediumDown`
        font-size: 6rem;
      `}
      
      ${media.smallDown`
        
        font-size: 4.8rem;
      `}

      ${media.xSmall`
        
        font-size: 6rem;
      `}

      
    }

    .questionAnswerContainer {
      display: none;

    }

    .questionText {
      ${'' /* position: absolute; */}
      font-size: 1.25rem;
      ${'' /* width: 100%; */}
      
      display: flex;
      justify-content: center;
      align-items: center;
      ${'' /* background: green; */}
      ${'' /* top: 50%; */}
      ${'' /* left: 0; */}
      text-align: center;
      
      
      ${'' /* opacity: 0.5; */}
      
      
      box-sizing: border-box;
      padding-bottom: 0.5rem;
      
      ;

      


      ${media.mediumDown`
        
        ${'' /* padding: 0 1rem; */}

        font-size: 1rem;
      `}

      ${media.smallDown`
        
        
        font-size: 0.9rem;
      `}

      ${media.xSmall`
        
        
      `}

    }

  }

  
`;



class FAQListingComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      selectedFAQKey: undefined
    };
  }

  closeFAQ = (e) => {
    // console.log('closeFAQ');

    this.setState({
      selectedFAQKey: undefined
    })

    e.stopPropagation();

  }

  selectFAQ = (e) => {

    
    // console.log('selectFAQ', e.currentTarget);
    // console.log('selectFAQ key', e.currentTarget.dataset.key);
    

    this.setState({
      selectedFAQKey: e.currentTarget.dataset.key
    })

  }

  render() {

    const componentName = "FAQListingComponent";

    
    const limit = this.props.limit === undefined ? faqs.length : this.props.limit;

    return (
      <FAQUL className={classNames(componentName, {
        faqSelected: this.state.selectedFAQKey !== undefined
      })}>
        {
          faqs.filter((faq, index) => index < limit).map((faq, index) => {
            
            return (<li key={index} data-key={index} onClick={this.selectFAQ} className={classNames("faq", {
              selected: this.state.selectedFAQKey == index
            })}>
              <div className="questionNumber">Q{index+1}</div>
              <div className={classNames("questionText")}>{faq.q}</div>
              <div className={classNames("questionAnswerContainer")}>
                <div className="arrow"></div>
                <div className="answerNumber">
                  {index + 1}
                </div>
                <div className="content">
                  <div className="question" dangerouslySetInnerHTML={{ __html: faq.q }} />
                  <div className="answer" dangerouslySetInnerHTML={{ __html: faq.a }} />
                </div>

                <div className="control">
                  <div className="close" onClick={this.closeFAQ}>x</div>
                  
                </div>
              </div>
            </li>);
          })
        }

        
      </FAQUL>
    );
  }
}


FAQListingComponent.propTypes = {
  limit: PropTypes.number,
}

FAQListingComponent.defaultProps = {
  // activeClassName: "active"
}

export default FAQListingComponent;
