import React from 'react';
import styled from 'styled-components';

import { media, style } from 'helpers/styledComponents.js';

import translate from 'helpers/translate.js';
import { transparentize } from 'polished'

import { Link } from '/routes';

import PageContainerComponent from 'components/PageContainerComponent';




// const pagePadding = {
//   xSmall: style.dimension.normal.pagePadding.xSmall,
//   small: style.dimension.normal.pagePadding.small,
//   medium: style.dimension.normal.pagePadding.medium,
//   large: style.dimension.normal.pagePadding.large,
//   xLarge: style.dimension.normal.pagePadding.xLarge,
//   xxLarge: style.dimension.normal.pagePadding.xxLarge
// }





const ThisPageContainerComponent = styled(PageContainerComponent)`


  

`;


export default class extends React.Component {
  static async getInitialProps({ query }) {
    
    return { query }
  }
  
  translate = (t) => translate(t, this.props.query.locale);
  
  render() {
    
    // console.log(">>> query", this.props.query);


    const locale = this.props.query.locale;
    
    return (
      <ThisPageContainerComponent>

        
        <section className="s-section target-section first">

          <div className="row section-header bit-narrow">
            <div className="col-full">
              <h3 className="subhead">International Blockchain Olympiad 2019 Schedule and Programme</h3>
              <h1>
                Schedule of the event
                </h1>
            </div>
          </div> 
  
        <div className="row bit-narrow innerpage">
            <div className="block-tab-full">
              <img src="/static/images/schedule.png" style={{ display: "block", margin: "0 auto" }} alt="schedule" />
            </div>
          </div>

        </section>
    
    <section className="s-section last">

          <div className="row section-header bit-narrow">
            <div className="col-full">
              <h1>
                Programme Descriptions
                </h1>
            </div>
          </div>
  
        <div className="row bit-narrow innerpage">
            <div className="block-1-2 block-tab-full">
              <div className="col-block">
                <h3>Welcome Banquet</h3>
                <p>
                  An exclusive and exquisite dinner party thrown in honour of the Blockchain Olympians, together with special guests and VIPs, such as important business leaders, government officials, investors, and noteworthy researchers and developers of the blockchain space.
                    </p>
              </div>
              <div className="col-block">
                <h3>Opening Ceremony</h3>
                <p>
                  A grand event welcoming the guests and participants, featuring a Parade of Projects where all teams receive their Award of Merit, and announcing the order of the five Medal Rounds.
                    </p>
              </div>
              <div className="col-block">
                <h3>Fireside Chats</h3>
                <p>
                  Sets of diverse panel discussions with briefing keynotes about various subjects in the blockchain applications space to inform the audience with rudimentary knowledge of the subjects of discussion at hand.
                    </p>
              </div>
              <div className="col-block">
                <h3>Lunch Keynotes</h3>
                <p>
                  While enjoying an open-style buffet, listen in on a series of short and thought-provoking TED-Talk-style keynotes to grasp the latest in the enterprise blockchain application space.
                    </p>
              </div>
              <div className="col-block">
                <h3>Tech Expo</h3>
                <p>
                  Projects are setup and exhibited to a panel of judges, to guests, and to each other during the day, along with informative booths and displays by supporting and sponsoring organisations.
                    </p>
              </div>
              <div className="col-block">
                <h3>Medal Rounds</h3>
                <p>
                  For five categories, watch finalists present their projects on stage, followed by a panel with representatives from the finalists to discuss and debate the challenges and solutions of their category without worrying about contributing to their final score.
                    </p>
              </div>
              <div className="col-block">
                <h3>Closing Ceremony</h3>
                <p>
                  A grand event featuring a parade of the medal event finalists, and the much-anticipated medal-awarding presentations of the five categories.
                    </p>
              </div>
              <div className="col-block">
                <h3>7-ate-9</h3>
                <p>
                  A fun, relaxing dinnertime party where participants eat, mingle, and enjoy a special keynote from a very special guest from the blockchain world.
                    </p>
              </div>
            </div>
          </div>
  
    </section>
        
        
        
      </ThisPageContainerComponent>
    )
  }
}
    