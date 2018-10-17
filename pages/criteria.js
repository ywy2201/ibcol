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

        
        <section className="s-section first target-section">

            <div className="row section-header bit-narrow">

                <div className="col-full">
                    <h4 className="subhead">International Blockchain Olympiad 2019</h4>
                    <h1>
                        Competition Process
                    </h1>
                </div>
            </div>

            <div className="row bit-narrow">
                <div className="about-process process">
                    <div className="block-1-4 block-tab-full">
                        <div className="col-block item-process blue">
                            <div className="item-process__text">
                                <h4 className="item-title">Whitepaper</h4>
                                <p>
                                    Online Submission - Due: 21 April 2019
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process yellow">
                            <div className="item-process__text">
                                <h4 className="item-title">Interview (Top 100)</h4>
                                <p>
                                    Teleconference - During: May-June 2019 
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process black">
                            <div className="item-process__text">
                                <h4 className="item-title">Demo (Top 50)</h4>
                                <p>
                                    Tech Expo - July 2019
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process green">
                            <div className="item-process__text">
                                <h4 className="item-title">Pitch (Top 25)</h4>
                                <p>
                                    Stage - July 2019
                                </p>
                            </div>
                        </div>
                    </div>
              <div className="block-tab-full" style={{ marginTop: "6rem" }}>
                        <div className="col-block">
                            <p>
                                Acceptable Languages for written material: Arabic Chinese, Chinese, English, French, German, Hungarian, Japanese, Korean, Persian, Polish, Portuguese, Russian, Spanish, Ukrainian
                            </p>
                            <p>
                                Acceptable Languages for written material: Arabic (Egypt), Arabic (Gulf), Cantonese, English, French, German, Hungarian, Japanese, Korean, Mandarin, Persian, Polish, Portuguese, Russian, Spanish, Ukrainian
                            </p>
                        </div>
                    </div>
                </div>
            </div>

    </section>

    <section className="s-section target-section">

            <div className="row section-header bit-narrow">
                <div className="col-full">
                    <h1>Competition Categories</h1>
                </div>
            </div>

            <div className="row bit-narrow">

                <div className="about-process process">
                    <div className="block-1-3 block-tab-full">
                        <div className="col-block item-process blue">
                            <div className="item-process__text">
                                <h4 className="item-title">Fintech</h4>
                                <p>
                                    (Financial Technology) broadly encapsulates activities in the traditional finance sector, as well as in insurance, trading, and risk management.<br/>
                                    e.g.<br/>
                                    Bancassurance<br/>
                                    Trade Finance<br/>
                                    Digital Assets
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process yellow">
                            <div className="item-process__text">
                                <h4 className="item-title">Govtech</h4>
                                <p>
                                    (Government Technology) describes key platform and infrastructure solutions required for administrative responsibilities of a sovereign state or territory.<br/>
                                    e.g.<br/>
                                    Identities<br/>
                                    Registries<br/>
                                    Audits
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process black">
                            <div className="item-process__text">
                                <h4 className="item-title">Medtech</h4>
                                <p>
                                    (Medical Technology) is a collection of applications that solve health related issues and improve the quality of lives, for humans or otherwise.<br/>
                                    e.g.<br/>
                                    Health<br/>
                                    Records<br/>
                                    Medical Maps<br/>
                                    Insurance Claim
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process green">
                            <div className="item-process__text">
                                <h4 className="item-title">IoT / O2O</h4>
                                <p>
                                    (Internet of Things/Online-to- Offline/vice versa) concerns bridging of digital and physical worlds, i.e. interpreting real-life situations and phenomena into machine- useable data.<br/>
                                    e.g.<br/>
                                    Food Safety<br/>
                                    Supply Chain<br/>
                                    Transportation
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process red">
                            <div className="item-process__text">
                                <h4 className="item-title">Arts / Media</h4>
                                <p>
                                    Encompassing human activities in public and commercial communications, entertainment, and adjacent industries.<br/>
                                    e.g.<br/>
                                    Adverts<br/>
                                    Events<br/>
                                    Statistics
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>

        <section className="s-section target-section">
        
            <div className="row section-header bit-narrow">
                <div className="col-full">
                    <h1>
                        Eligibility & Fee
                    </h1>
                </div>
            </div>
             <div className="row bit-narrow innerpage no-bottom">
                <div className="col-twelve">    
                <div className="table-responsive">
                <table>
                    <tr>
                        <td></td>
                        <td><b>Super Early Bird</b></td>
                        <td><b>Early Bird</b></td>
                        <td><b>Regular</b></td>
                    </tr>
                    <tr>
                        <td>From</td>
                        <td>Monday<br/>3 September 2018<br/>00:00 HKT</td>
                        <td>Saturday<br/>2 February 2019<br/>00:00 HKT</td>
                        <td>Tuesday<br/>2 April 2019<br/>00:00 HKT</td>
                    </tr>
                    <tr>
                        <td>Unitl</td>
                        <td>Friday<br/>1 February 2019<br/>23:59 HKT</td>
                        <td>Monday<br/>1 April 2019<br/>23:59 HKT</td>
                        <td>Sunday<br/>21 April 2019<br/>23:59 HKT</td>
                    </tr>
                    <tr>
                        <td>Registration</td>
                        <td>Fee is waived</td>
                        <td>Fee is waived</td>
                        <td>Fee is required</td>
                    </tr>
                    <tr>
                        <td>Financial Assistance</td>
                        <td>Eligible for travel subsidies</td>
                        <td>Ineligible for travel subsidies</td>
                        <td>Ineligible for travel subsidies</td>
                    </tr>
                </table>
                </div>
                    </div>
                </div>
        </section>


        <section className="s-section last target-section">
            
            <div className="row section-header bit-narrow">
                <div className="block-tab-full">
                    <div className="col-twelve">
                        <h1>
                            Prizes
                        </h1>
                    </div>
                </div>
                <div className="block-tab-full">
                    <div className="col-block">
                        <p>
                           The best prize for students is not financial, but rather experience, guidance, and a chance to make a real impact in the real world.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row bit-narrow">
                <div className="about-process process">
                    <div className="block-1-4 block-tab-full">
                        <div className="col-block item-process gold">
                            <div className="item-process__text">
                                <h4 className="item-title">Gold Medal</h4>
                                <p>
                                    1st place winner of a category with 4096 USD prize (5 awards total)
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process silver">
                            <div className="item-process__text">
                                <h4 className="item-title">Silver Medal</h4>
                                <p>
                                    2nd place winner of a category with 2048 USD prize (5 awards total)
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process bronze">
                            <div className="item-process__text">
                                <h4 className="item-title">Bronze Medal</h4>
                                <p>
                                    3rd place winner of a category with 1024 USD prize (5 awards total)
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process green">
                            <div className="item-process__text">
                                <h4 className="item-title">Nominee Award</h4>
                                <p>
                                    Recognition for nominating a winning team (15 awards total)
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process green">
                            <div className="item-process__text">
                                <h4 className="item-title">Finalist Award</h4>
                                <p>
                                    Recognition for being top 5 in a category (10 awards total)
                                </p>
                            </div>
                        </div>
                        <div className="col-block item-process green">
                            <div className="item-process__text">
                                <h4 className="item-title">Merit Award</h4>
                                <p>
                                    Recognition for designing a complete solution (50 awards total)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 

        </section>
        
        
        
      </ThisPageContainerComponent>
    )
  }
}
    