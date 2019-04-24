import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import _ from 'lodash-checkit';
import update from 'update-immutable';

import configs from 'configs';

import { media, style } from 'helpers/styledComponents.js';
import randomWords from 'random-words';
import cookies from 'browser-cookies';
import { Router } from '/routes';

import {translate} from 'helpers/translate.js';
// import { transparentize } from 'polished'

// import { Link } from '/routes';

import PageContainerComponent from 'components/PageContainerComponent';

import Head from 'next/head';

import { Mutation } from "react-apollo";
import gql from 'graphql-tag'





const VERIFY_ACCESS_TOKEN = gql`
  mutation VerifyAccessToken($email: String!, $seed: String!, $verificationCode: String!) {

    verifyAccessToken(email: $email, seed: $seed, verificationCode: $verificationCode) {
      token
    }

  }
`;





const ThisPageContainerComponent = styled(PageContainerComponent)`
  
  text-align: center;

  h1 {
    text-align: left;
  }

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 20px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #bfbfbf;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 6px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 6px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 26px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 45px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(19px, 0);
    }
  }


  button {
    margin-top: 0rem;
    border: 0.2rem solid #F6C215;
    background: #FFF;

    width: 100%;

    &:hover {
      background: #F6C215;
      color: #FFF;
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;


const VerificationForm = styled.form`
  width: 100%;
  /* max-width: 600px; */
  margin: 0 auto;

  box-sizing: border-box;
`;

const FormSection = styled.section`
  width: 100%;

  box-sizing: border-box;
  padding-bottom: 3rem;
  padding-top: 3rem;
  

  > .FormSection {
    padding-left: 2.5rem;
    padding-bottom: 0rem;
    padding-top: 0rem;
    


    border-left: 1rem solid #dedede52;
  }

  h3 {
    display: flex;
    width: 100%;
    justify-content: space-between;
    letter-spacing: 0;

    .remove {
      font-size: 1.45rem;
      cursor: pointer;
      text-transform: none;
      font-weight: bold;
      font-family: "Nunito Sans", sans-serif;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  
`;

class ProcessVerification extends React.PureComponent {
  componentDidMount() {
    // console.log(this.props);
    this.props.verify({
      variables: {
        "email": this.props.email,
        "verificationCode": this.props.verificationCode,
        "seed": this.props.seed
      }
    })
  }

  render() {
    
    return this.props.children
    
  }
}


export default class extends React.PureComponent {
  static async getInitialProps({ query }) {
    // console.log('getInitialProps', query);
    return { query };
  }

  constructor(props) {
    super(props);
    // console.log('props', props);
    this.state = {
      verificationCode: props.query.verificationCode,
      email: props.query.email
    }
  }

  
  clearCookie = () => {
    cookies.erase('seed');
    cookies.erase('loginAttemptEmail');
    cookies.erase('token');
    cookies.erase('email');
  }


  componentDidMount = () => {

    const cookie = {
      loginAttemptEmail: cookies.get('loginAttemptEmail'),
      seed: cookies.get('seed')
    }

    if ((cookie.loginAttemptEmail === this.state.email) && !_.isEmpty(cookie.seed)) {
      this.setState({
        cookie,
        isProcessing: true
      });
    } else {
      this.clearCookie();
      this.setState({
        isProcessing: false,
        error: this.translate('loginVerifyingErrorMessage')
      });
    }

    
  }

  // componentDidUpdate = (prevProps, prevState) => {

  //   if (prevState.lastEditorStateChange !== this.state.lastEditorStateChange) {
  //     // console.log('componentDidUpdate', this.state.lastEditorStateChange);
  //     if (!_.isEmpty(this.state.record.loginEmail)) {
  //       this.setState({
  //         recordIsValid: this.validateRecord(this.state.record)
  //       });
  //     } else {
  //       this.setState({
  //         recordIsValid: this.validateRecord(this.state.record, undefined, {verificationCode: true})
  //       });
  //     }
      
  //   }

  // }

  

  translate = (t) => translate(t, 'registration', this.props.query.locale, {
    // "countries": true,
    "sectors": true,
    "project-categories": true
  });





  

  // graphQLCleanUp = (record) => {
  //   return record;
  // }

  


  onMutationError = (error) => {
    console.error(error);
    this.clearCookie();
    this.setState({
      isProcessing: false,
      mutationError: _.isEmpty(error) ? undefined : error.message.replace('GraphQL error: ', '')
    })
  }


  onMutationCompleted = ({verifyAccessToken: {token}}) => {
    console.log('token', token);
    cookies.set('seed', this.state.cookie.seed, {expires: 365});
    cookies.set('token', token, {expires: 365});
    cookies.set('email', this.state.cookie.loginAttemptEmail, {expires: 365});

    Router.replaceRoute('registration', {
      locale: this.props.query.locale
    });
      


    // this.setState({
    //   isProcessing: false,
    //   mutationError: undefined
    // });
  

    
    
  };

  render() {

    // console.log(">>> query", this.props.query);
    // console.log("===>", process.env.FILEPOND_API);
    // console.log("===>", process.env.ENV);


    // const locale = this.props.query.locale;

    
    

    return (
      <ThisPageContainerComponent>
        <Head>
          <title>{this.translate('siteTitle')} {this.translate('titleSeparator')} {this.translate('pageTitle')}</title>
          <meta name="description" content={this.translate('seoDescription')} />
          <meta name="keywords" content={this.translate('keywords')} />
          <meta property="og:image" content={`${configs.url}${this.translate('ogImage')}`} />
          <meta property="og:type" content="website" />
        </Head>


        
        

        {this.state.isProcessing &&
          <section className="s-section target-section first last">
            <div className="row">
              <div className="col-full">
                <h1>{this.translate('loginVerifyingTitle')}</h1>
              </div>
            </div>
            
            
            <div className="row section-header">
              <div className="col-full">
                
                <Mutation
                  mutation={VERIFY_ACCESS_TOKEN}
                  onCompleted={this.onMutationCompleted}
                  onError={this.onMutationError}
                >
                  {(mutate, { loading, error, called, data }) => {
                    
                    return <ProcessVerification verify={mutate} email={this.state.email} verificationCode={this.state.verificationCode} seed={this.state.cookie.seed}><VerificationForm onSubmit={(e) => { e.preventDefault(); }}>

                    <div className="item-process__text">
                      
                      <p dangerouslySetInnerHTML={{ __html: this.translate('loginVerifyingMessage').replace('{verificationCode}', this.state.verificationCode) }} />
                      
                      <p>
                        <b>{this.state.cookie.seed}</b>
                      </p>
                    </div>
                    {/* <div className="full-width" style={{marginBottom: "4rem"}}>
                      <button onClick={this.resetForm}>{this.translate('registerAnother')}</button>
                    </div> */}

                    



                    
                    
                    
                  </VerificationForm></ProcessVerification>
                  }}
                </Mutation>
              </div>
            </div>


            <div className="row">
              <div className="col-full" style={{textAlign: "center"}}>
                <><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></>
              </div>
            </div>



            
          </section>

        }


        {(!_.isEmpty(this.state.error) || !_.isEmpty(this.state.mutationError)) &&
          <section className="s-section target-section first last">
            <div className="row">
              <div className="col-full">
                <h1>{this.translate('loginVerifyingTitle')}</h1>
              </div>
            </div>
            
            
            <div className="row section-header">
              <div className="col-full">
                
                <VerificationForm onSubmit={(e) => { e.preventDefault(); }}>

                  
                  {/* <div className="full-width" style={{marginBottom: "4rem"}}>
                    <button onClick={this.resetForm}>{this.translate('registerAnother')}</button>
                  </div> */}

                  



                  
                    {
                      !_.isEmpty(this.state.mutationError) &&
                      <div className="full-width" style={{ color: "red" }}>
                        {this.state.mutationError}
                      </div>
                    }
                  
                    {!_.isEmpty(this.state.error) &&
                      <div className="full-width" style={{ color: "red" }}>
                      {this.state.error}
                    </div>}
                  
                </VerificationForm>
              </div>
            </div>


            

            
          </section>

        }


      </ThisPageContainerComponent>
    )
  }
}
