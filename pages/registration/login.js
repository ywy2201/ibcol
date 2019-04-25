import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import _ from 'lodash-checkit';
import update from 'immutability-helper';

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

import { Mutation, Query } from "react-apollo";
import gql from 'graphql-tag'





const REQUEST_ACCESS_TOKEN = gql`
  mutation RequestAccessToken($email: String!, $seed: String!, $locale: String!) {

    requestAccessToken(email: $email, seed: $seed, locale: $locale)

  }
`;


const IS_TOKEN_VALID = gql`
  query IsTokenValid($email: String!, $token: String!) {
    isTokenValid(email: $email, token: $token)
  }
`;





const ThisPageContainerComponent = styled(PageContainerComponent)`

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

  .filepond--root { font-size: 1.5rem !important; }
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  box-sizing: border-box;
`;

const VerificationForm = styled(LoginForm)`
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

const FormRow = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;

  ${media.smallDown`
    display: block;
  `}
`;


const FormTools = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: flex-end;

  div {
    color: #0286ca;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.45rem;
    
    &:hover {
      text-decoration: underline;
    }

    &.full-width {
      width: 100%;
    }


    
  }
`;

const FormField = styled.label`
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  
  input, select, textarea {
    width: 100%;
    
  }

  textarea {
    min-height: 300px;
  }


  &:nth-child(even){
    ${'' /* background: green; */}
    

    ${media.mediumUp`
      margin-left: 1rem;
    `}
  }


  
`;


export default class extends React.PureComponent {
  static async getInitialProps({ query }) {
    // console.log('getInitialProps', query);
    return { query };
  }

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.resetForm();
    // this.onEditorStateChange();
  }

  getTokenFromCookie = () => {

    return (cookies.get('email') !== null && cookies.get('token') !== null) ? {
      email: cookies.get('email'),
      token: cookies.get('token')
    }: undefined;
  }

  getDefaultState = () => {
    return {
      tokenCookie: undefined,
      hasValidToken: false,
      focusedField: undefined,
      record: this.props.record !== undefined ? this.graphQLCleanUp(this.props.record) : this.getDefaultEditorRecord(),
      lastEditorStateChange: Date.now(),
      isEditorMutating: false,
      recordIsValid: false,
      showConfirmation: false,
      confirmation: {
        seed: ""
      },
      cookie: {
        loginAttemptEmail: "",
        seed: ""
      }
    };
  }

  resetForm = () => {
    this.setState(this.getDefaultState());
  }

  requiredFields = {
    loginEmail: true
  };

  flattenKeys = (obj, path = []) =>
    !_.isObject(obj)
      ? { [path.join('.')]: obj }
      : _.reduce(obj, (cum, next, key) => _.merge(cum, this.flattenKeys(next, [...path, key])), {});



  getDefaultEditorRecord = () => {
    return {
      loginEmail: "",
      verificationCode: ""
    };
  }



  componentDidMount = () => {

    this.setState({
      tokenCookie: this.getTokenFromCookie()
    })

  }

  componentDidUpdate = (prevProps, prevState) => {

    if (prevState.lastEditorStateChange !== this.state.lastEditorStateChange) {
      // console.log('componentDidUpdate', this.state.lastEditorStateChange);
      if (!_.isEmpty(this.state.record.loginEmail)) {
        this.setState({
          recordIsValid: this.validateRecord(this.state.record)
        });
      } else {
        this.setState({
          recordIsValid: this.validateRecord(this.state.record, undefined, {verificationCode: true})
        });
      }
      
    }

  }

  onRecordChange = (e) => {
    const fieldId = e.currentTarget.getAttribute('data-name');
    const value = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked ? "true" : "false" : e.currentTarget.value;
    // console.log('onRecordChange', fieldId, value);
    let updatedRecord = {};
    if (e.currentTarget.getAttribute('data-section') === 'login') {
      updatedRecord = update(this.state.record, {
        [fieldId]: {
          $set: value.toLowerCase()
        }
      })
    } else if (e.currentTarget.getAttribute('data-section') === 'verification') {
      updatedRecord = update(this.state.record, {
        [fieldId]: {
          $set: value.toUpperCase()
        }
      })
    }

    if (!_.isEmpty(updatedRecord)) {
      // console.log('updatedRecord', updatedRecord);
      this.setState({
        record: updatedRecord,
        lastEditorStateChange: Date.now()
      });
    }
  }


  translate = (t) => translate(t, 'registration', this.props.query.locale, {
    // "countries": true,
    "sectors": true,
    "project-categories": true
  });

  getLabel = (field, required = false) => {
    return (
      <span>
        {this.translate(field)} {
          (_.get(this.requiredFields, field) === true || required) &&
          <>*</>
        }
      </span>
    );
  }




  validateRecord = (record, parentKey, customRequiredFields) => {
    const requiredFields = _.isEmpty(customRequiredFields) ? this.flattenKeys(this.requiredFields) : customRequiredFields;
    // console.log('validateRecord', record, requiredFields);

    let isRecordValid = true;
    Object.keys(record).map((key) => {
      const inspect = _.get(record, key);
      if (_.isArray(inspect)) {
        inspect.map((data) => {
          isRecordValid = isRecordValid && this.validateRecord(data, _.isEmpty(parentKey) ? `${key}` : `${parentKey}.${key}`, customRequiredFields);
        })
        // isRecordValid = isRecordValid && this.validateRecord(inspect, _.isEmpty(parentKey) ? `${key}` : `${parentKey}.${key}`);
      } else {
        
        isRecordValid = isRecordValid && (_.get(requiredFields, _.isEmpty(parentKey) ? `${key}` : `${parentKey}.${key}`) === true ? key === 'loginEmail' ?
            _.isEmail(record[key]) : !_.isEmpty(record[key]) : true);

        


        // console.log('>>', _.isEmpty(parentKey) ? `${key}` : `${parentKey}.${key}`, (_.get(requiredFields, _.isEmpty(parentKey) ? `${key}` : `${parentKey}.${key}`) === true ? !_.isEmpty(record[key]) : true), isRecordValid);
      }

    })
    
    return isRecordValid;
  }


  graphQLCleanUp = (record) => {
    return record;
  }

  redirectToVerification = (email, verificationCode) => {
    console.log('redirectToVerification', email, verificationCode);
    Router.replaceRoute('registrationVerification', {
      email, verificationCode, locale: this.props.query.locale
    });
  }

  clearCookie = () => {
    cookies.erase('seed');
    cookies.erase('loginAttemptEmail');
    cookies.erase('token');
    cookies.erase('email');

    this.setState({
      tokenCookie: undefined,
      hasValidToken: false
    })
  }


  onRequestAccessToken = (mutate) => {
    if (this.state.recordIsValid) {
      
      const seed = randomWords({ exactly: 3, join: ' ', formatter: (word)=> word.toUpperCase() });

      // console.log('seed:', seed);
      
      mutate({
        variables: {
          "email": this.state.record.loginEmail.trim(),
          seed,
          "locale": this.props.query.locale
        }
      });

      this.setState({
        isEditorMutating: true,
        mutationError: undefined,
        confirmation: {
          seed
        }
      })
    }
  }
  


  onMutationError = (error) => {
    console.error(error);
    this.setState({
      isEditorMutating: false,
      mutationError: _.isEmpty(error) ? undefined : error.message.replace('GraphQL error: ', '')
    })
  }


  onMutationCompleted = ({requestAccessToken: email}) => {
    console.log('requestAccessToken', email);

    // this.clearCookie();

    if (email === this.state.record.loginEmail) {
      const cookie = {
        seed: this.state.confirmation.seed,
        loginAttemptEmail: email
      }
      console.log('cookie', cookie);
      cookies.set('seed', cookie.seed, {expires: 365});
      cookies.set('loginAttemptEmail', cookie.loginAttemptEmail, {expires: 1});


      this.setState({
        isEditorMutating: false,
        mutationError: undefined,
        record: this.getDefaultEditorRecord(),
        showConfirmation: true,
        recordIsValid: false,
        cookie
      });
    }

    
    
  };

  render() {

    // console.log(">>> query", this.props.query);
    // console.log("===>", process.env.FILEPOND_API);
    // console.log("===>", process.env.ENV);


    const locale = this.props.query.locale;

    
    

    return (
      <ThisPageContainerComponent>
        <Head>
          <title>{this.translate('siteTitle')} {this.translate('titleSeparator')} {this.translate('pageTitle')}</title>
          <meta name="description" content={this.translate('seoDescription')} />
          <meta name="keywords" content={this.translate('keywords')} />
          <meta property="og:image" content={`${configs.url}${this.translate('ogImage')}`} />
          <meta property="og:type" content="website" />
        </Head>





        {this.state.showConfirmation &&
          <section className="s-section target-section first last">
            <div className="row">
              <div className="col-full">
                <h1>{this.translate('loginAwaitingTitle')}</h1>
              </div>
            </div>
            
            <div className="row section-header">
              <div className="col-full">
                
                <VerificationForm onSubmit={(e) => { e.preventDefault(); }}>

                  <div className="item-process__text">
                    <p dangerouslySetInnerHTML={{ __html: this.translate('loginAwaitingEmail').replace('{email}', this.state.cookie.loginAttemptEmail) }} />
                    <p>
                      {this.translate('loginAwaitingMessage')}
                    </p>
                    <p>
                      <b>{this.state.cookie.seed}</b>
                    </p>
                  </div>
                  {/* <div className="full-width" style={{marginBottom: "4rem"}}>
                    <button onClick={this.resetForm}>{this.translate('registerAnother')}</button>
                  </div> */}

                  
                  <FormSection className="FormSection">
                    <h3 className="subhead">{this.translate('loginManualVerification')}</h3>

                    

                    <FormRow>

                      <FormField>
                        {this.getLabel('loginManualVerificationCode', true)}
                        <input type="text" data-name="verificationCode" data-section="verification" onChange={this.onRecordChange} value={this.state.record.verificationCode} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                      </FormField>
                    </FormRow>
                    
                    <FormTools>
                      <div className="full-width">
                        <button className={classNames({
                          disabled: this.state.recordIsValid !== true || this.state.isEditorMutating === true
                        })} disabled={!this.state.recordIsValid || this.state.isEditorMutating === true} onClick={() => {
                          this.redirectToVerification(cookies.get('loginAttemptEmail'), this.state.record.verificationCode)
                        }}>
                          {this.translate('verifyAction')}
                        </button>
                      </div>
                    </FormTools>
                  </FormSection>



                  
                  
                  {
                    !_.isEmpty(this.state.mutationError) &&
                    <div className="full-width" style={{ color: "red" }}>
                      {this.state.mutationError}
                    </div>
                  }
                </VerificationForm>
              </div>
            </div>


            

            
          </section>

        }




        {(!this.state.showConfirmation && !this.state.hasValidToken && this.state.tokenCookie === undefined) &&
          <section className="s-section target-section first last">
            <div className="row">
              <div className="col-full">
                <h1>{this.translate('subhead')}</h1>
              </div>
            </div>
            <div className="row section-header">
              <div className="col-full">



                <Mutation
                  mutation={REQUEST_ACCESS_TOKEN}
                  onCompleted={this.onMutationCompleted}
                  onError={this.onMutationError}
                >
                  {(mutate, { loading, error, called, data }) => {

                    {/* this.graphQLMutateCreate = mutate; */ }


                    return <LoginForm onSubmit={(e) => { e.preventDefault(); }}>

                      
                      <FormSection className="FormSection">
                        <h3 className="subhead">{this.translate('teamLogin')}</h3>

                        

                        <FormRow>

                          <FormField>
                            {this.getLabel('loginEmail')}
                            <input type="email" data-name="loginEmail" data-section="login" onChange={this.onRecordChange} value={this.state.record.loginEmail} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                          </FormField>
                        </FormRow>
                        
                        <FormTools>
                          <div className="full-width">
                            <button className={classNames({
                              disabled: this.state.recordIsValid !== true || this.state.isEditorMutating === true
                            })} disabled={!this.state.recordIsValid || this.state.isEditorMutating === true} onClick={() => {
                              this.onRequestAccessToken(mutate)
                            }}>
                              {
                                !this.state.isEditorMutating ? 
                                  this.translate('loginAction') :
                                  <><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></>
                              }
                            </button>
                          </div>
                        </FormTools>
                      </FormSection>



                      
                      
                      {
                        !_.isEmpty(this.state.mutationError) &&
                        <div className="full-width" style={{ color: "red" }}>
                          {this.state.mutationError}
                        </div>
                      }
                    </LoginForm>
                  }}
                </Mutation>
              </div>
            </div>
          </section>
        }



        {(!this.state.hasValidToken && this.state.tokenCookie !== undefined) &&
          <section className="s-section target-section first last">
            <div className="row">
              <div className="col-full">
                <h1>{this.translate('subhead')}</h1>
              </div>
            </div>
            <div className="row section-header">
              <div className="col-full">

                <Query query={IS_TOKEN_VALID} variables={{ email: this.state.tokenCookie.email, token: this.state.tokenCookie.token }}>
                  {({ loading, error, data, refetch, networkStatus }) => {
                    {/* console.log('querying graphql...');
                    console.log('loading:', loading);
                    console.log('networkStatus:', networkStatus); */}
                    {/* console.log('error', error);
                    console.log('data', data); */}
                    if ((networkStatus === 4) || loading) return <div className="full-width" style={{textAlign: 'center'}}>
                        <><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></>
                      </div>;
                    
                    if (error) return `Error! ${error.message}`;

                    if (!_.isEmpty(data)) {
                      console.log('data', data.isTokenValid);

                      this.setState({
                        hasValidToken: data.isTokenValid
                      })

                      if (!data.isTokenValid) {
                        this.clearCookie()
                      } else {
                        Router.replaceRoute('registration', {
                          locale: this.props.query.locale
                        });
                      }
                    }

                    return null
                  }}
                </Query>


                
              </div>
            </div>
          </section>
        }


      </ThisPageContainerComponent>
    )
  }
}
