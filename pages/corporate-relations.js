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

        
            <section className="s-section target-section first last">

                <div className="row section-header bit-narrow">
                    <div className="col-full">
                        <h3 className="subhead">International Blockchain Olympiad 2019 Corporate Relations</h3>
                        <h1>
                            Our Partners
                </h1>
                    </div>
                </div> 
        
        <div className="row bit-narrow innerpage">
                    <div className="col-full">
                        <p className="lead">
                            The following supporting organisations are contributing to IBCOL 2019:
                </p>
                    </div>
                </div> 
        
        <div className="row corporate-logo bit-narrow">
                    <div className="block-1-2 block-tab-full">
                        <div className="col-block">
                            <a href="https://www.cardano.org/en/home/" target="_blank">
                                <img src="/static/images/cardano-logo.png" alt="Cardano" />
                            </a>
                            <p>
                                <b>Cardano</b> is a decentralised public blockchain and cryptocurrency project and is fully open source. Cardano is developing a smart contract platform which seeks to deliver more advanced features than any protocol previously developed.
                    </p>
                        </div>
                        <div className="col-block">
                            <a href="http://www.hkbcs.org/" target="_blank">
                                <img src="/static/images/hkbcs-logo.png" alt="HKBCS" />
                            </a>
                            <p>
                                <b>The Hong Kong Blockchain Society</b> promotes sustainable and mature of the blockchain ecosystem. HKBCS encourages and supports projects that are legal and compliant in Hong Kong and the surrounding region.
                    </p>
                        </div>
                        <div className="col-block">
                            <a href="https://emurgo.io/" target="_blank">
                                <img src="/static/images/emurgo-logo.png" alt="Emurgo" />
                            </a>
                            <p>
                                <b>EMURGO</b> was founded in 2017 and is a registered company in Japan. We develop, support, and incubate commercial ventures and help integrate these businesses into Cardano’s decentralized blockchain ecosystem. Cardano seeks to power the financial stack for the developing world, and EMURGO's mission is to help these economies emerge through blockchain technology
                    </p>
                        </div>
                        <div className="col-block">
                            <a href="https://emali.io/" target="_blank">
                                <img src="/static/images/emali-logo.png" alt="eMALI" />
                            </a>
                            <p>
                                <b>eMALI</b> is an enterprise blockchain developer working on applications in the Fin/Insur/RegTech sectors specializing on identity management, trade and supply chain finance, insurance claim management, fraud detection and regulatory registries.
                    </p>
                        </div>
                    </div>
                </div>

            </section>
        
        
        
      </ThisPageContainerComponent>
    )
  }
}
    