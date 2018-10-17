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
                <h3 className="subhead">International Blockchain Olympiad 2019 Corporate Relations</h3>
                <h1>
                    Students are our priority
                </h1>
                <p className="lead">
                    Students are the most important element of the International Blockchain Olympiad, therefore the needs of the students have priority over all others.
                </p>
            </div>
        </div> 


    </section> 


    <section className="s-section">

        <div className="row section-header bit-narrow">
            <div className="col-full">
                <h1>
                    Financial Assistance Options
                </h1>
            </div>
        </div>

        <div className="row bit-narrow innerpage">
            <div className="block-tab-full">
                <div className="col-block">
                    <p>
                        Applicants are evaluated on a case-by-case basis, with no bearing on the actual results of the competition. Students may apply for subsidies to reduce the financial burden of participating in IBCOL 2019, such as the entry fee, travel to the main event in Hong Kong, and accommodation assistance while in Hong Kong. 
                    </p>
                </div>
            </div>
        </div> 

    </section>


    <section className="s-section last">
        <div className="row section-header bit-narrow">
            <div className="col-full">
                <h1>
                    Student Ambassador Programme
                </h1>
            </div>
        </div>

        <div className="row bit-narrow innerpage">
            <div className="block-tab-full">
                <div className="col-block">
                    <p>
                        Students are rewarded for promoting IBCOL 2019 at their schools: if they are participating as a contestant, their entry fees may be reduced or waived; otherwise, admission ticket fees may be reduced or waived. Outstanding student ambassadors may also be eligible for additional travel & accommodation subsidy.
                    </p>
                </div>
            </div>
        </div> 
    </section> 
        
        
        
      </ThisPageContainerComponent>
    )
  }
}
    