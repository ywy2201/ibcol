import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import _ from 'lodash-checkit';
import update from 'update-immutable';

import configs from 'configs';

import { media, style } from 'helpers/styledComponents.js';

import {translate} from 'helpers/translate.js';
import { transparentize } from 'polished'

import { Link } from '/routes';

import PageContainerComponent from 'components/PageContainerComponent';
import CountryInputSelectComponent from 'components/CountryInputSelectComponent';

import Head from 'next/head';

import { Mutation } from "react-apollo";
import gql from 'graphql-tag'


import ReactDOM from 'react-dom';
import Countdown from 'react-countdown-now';

const MAX_STUDENT_PER_TEAM = 6;
const MAX_PROJECT_PER_TEAM = 5;

// const pagePadding = {
//   xSmall: style.dimension.normal.pagePadding.xSmall,
//   small: style.dimension.normal.pagePadding.small,
//   medium: style.dimension.normal.pagePadding.medium,
//   large: style.dimension.normal.pagePadding.large,
//   xLarge: style.dimension.normal.pagePadding.xLarge,
//   xxLarge: style.dimension.normal.pagePadding.xxLarge
// }



const ADD_APPLICATION = gql`
  mutation AddApplication($application: ApplicationInput!) {

    addApplication(application: $application) {
      teamName
      ref
    }
  }
`;





const ThisPageContainerComponent = styled(PageContainerComponent)`

  button {
    margin-top: 6rem;
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

const RegistrationForm = styled.form`
  width: 100%;
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

const renderer = ({ days, hours, minutes, seconds }) => {
  // Render a countdown
  return <span>{days} Days, {hours} Hrs, {minutes} Mins, {seconds} Secs</span>;
};

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.resetForm();
    // this.onEditorStateChange();
  }

  getDefaultState = () => {
    return {
      focusedField: undefined,
      record: this.props.record !== undefined ? this.graphQLCleanUp(this.props.record) : this.getDefaultEditorRecord(),
      lastEditorStateChange: Date.now(),
      recordIsValid: false,
      showConfirmation: false,
      confirmation: {
        teamName: "",
        ref: ""
      }
    };
  }

  resetForm = () => {
    this.setState(this.getDefaultState());
  }

  requiredFields = {
    teamName: true,
    studentRecords: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      educationRecords: {
        degree: true,
        programme: true,
        institutionName: true,
        yearOfGraduation: true,
        state: true,
        city: true,
        countryCode: true
      }
    },
    advisorRecords: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      associationRecords: {
        title: true,
        sectorCode: true,
        organisationName: true,
        yearCommencement: true,
        state: true,
        city: true,
        countryCode: true
      }
    },
    projectRecords: {
      name: true,
      projectCategoryKey: true,
      description: true
    }
  };

  flattenKeys = (obj, path = []) =>
    !_.isObject(obj)
      ? { [path.join('.')]: obj }
      : _.reduce(obj, (cum, next, key) => _.merge(cum, this.flattenKeys(next, [...path, key])), {});



  getDefaultEditorRecord = () => {
    return {
      teamName: "",
      studentRecords: [
        this.getNewStudentRecord()
      ],
      advisorRecords: [],
      projectRecords: [
        this.getNewProjectRecord()
      ],
    };
  }





  getNewAdvisorRecord = () => {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      associationRecords: [
        this.getNewAdvisorAssociationRecord()
      ]
    };
  }


  getNewAdvisorAssociationRecord = () => {
    return {
      organisationName: "",
      title: "",
      sectorCode: "",
      state: "",
      city: "",
      countryCode: "",
      yearCommencement: "",
      yearCessation: ""
    }
  }

  getNewStudentRecord = () => {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      educationRecords: [
        this.getNewStudentEducationRecord()
      ]
    };
  }

  getNewStudentEducationRecord = () => {
    return {
      institutionName: "",
      state: "",
      city: "",
      countryCode: "",
      degree: "",
      programme: "",
      yearOfGraduation: ""
    }
  }

  getNewProjectRecord = () => {
    return {
      name: "",
      projectCategoryKey: "",
      description: ""
    }
  }

  componentDidUpdate = (prevProps, prevState) => {

    if (prevState.lastEditorStateChange !== this.state.lastEditorStateChange) {
      // console.log('componentDidUpdate', this.state.lastEditorStateChange);
      this.setState({
        recordIsValid: this.validateRecord(this.state.record)
      });
    }

  }

  onRecordChange = (e) => {
    const fieldId = e.currentTarget.getAttribute('data-name');
    const value = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked ? "true" : "false" : e.currentTarget.value;
    // console.log('onRecordChange', fieldId, value);
    let updatedRecord = {};
    if (e.currentTarget.getAttribute('data-section') === 'teamInfo') {
      updatedRecord = update(this.state.record, {
        [fieldId]: {
          $set: value
        }
      })
    } else if (e.currentTarget.getAttribute('data-section') === 'studentRecords') {
      const studentIndex = parseInt(e.currentTarget.getAttribute('data-student-index'));
      updatedRecord = update(this.state.record,
        {
          studentRecords: {
            [studentIndex]: {
              [fieldId]: {
                $set: value
              }
            }
          }
        })
    } else if (e.currentTarget.getAttribute('data-section') === 'studentEducationRecords') {
      const studentIndex = parseInt(e.currentTarget.getAttribute('data-student-index'));
      const studentEducationIndex = parseInt(e.currentTarget.getAttribute('data-student-education-index'));
      updatedRecord = update(this.state.record, {
        studentRecords: {
          [studentIndex]: {
            educationRecords: {
              [studentEducationIndex]: {
                [fieldId]: {
                  $set: value
                }
              }
            }
          }
        }
      })
    } else if (e.currentTarget.getAttribute('data-section') === 'advisorRecords') {
      const advisorIndex = parseInt(e.currentTarget.getAttribute('data-advisor-index'));
      updatedRecord = update(this.state.record, {
        advisorRecords: {
          [advisorIndex]: {
            [fieldId]: {
              $set: value
            }
          }
        }
      })
    } else if (e.currentTarget.getAttribute('data-section') === 'advisorAssociationRecords') {
      const advisorIndex = parseInt(e.currentTarget.getAttribute('data-advisor-index'));
      const associationRecordIndex = parseInt(e.currentTarget.getAttribute('data-advisor-association-index'));
      updatedRecord = update(this.state.record, {
        advisorRecords: {
          [advisorIndex]: {
            associationRecords: {
              [associationRecordIndex]: {
                [fieldId]: {
                  $set: value
                }
              }
            }
          }
        }
      })
    } else if (e.currentTarget.getAttribute('data-section') === 'projectRecords') {
      const projectIndex = parseInt(e.currentTarget.getAttribute('data-project-index'));
      updatedRecord = update(this.state.record, {
        projectRecords: {
          [projectIndex]: {
            [fieldId]: {
              $set: value
            }
          }
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
  graphQLCleanUp = (record) => {
    return record;
  }
  onCreateApplication = (mutate) => {
    if (this.state.recordIsValid) {
      // mutation AddPage($slug: String!, $locale: String!, $localisedPageInput: LocalisedPageInput!, $schemaDefinitionInputs: [SchemaDefinitionInput]!,
      //   $localisedFieldInputs: [LocalisedFieldInput]) {
      mutate({
        variables: {
          "application": {
            "teamName": this.state.record.teamName.trim(),
            "studentRecords": this.state.record.studentRecords,
            "advisorRecords": this.state.record.advisorRecords,
            "projectRecords": this.state.record.projectRecords
          }
        }
      });

      this.setState({
        isEditorMutating: true,
        mutationError: undefined,
        confirmation: {
          teamName: "",
          ref: ""
        }
      })
    }
  }
  translate = (t) => translate(t, 'registration', this.props.query.locale, {
    // "countries": true,
    "sectors": true,
    "project-categories": true
  });

  getLabel = (field) => {
    return (
      <span>
        {this.translate(field)} {
          _.get(this.requiredFields, field) === true &&
          <>*</>
        }
      </span>
    );
  }

  getGraduationYearRange = () => {
    const start = (new Date()).getFullYear() + 7;
    const yearsAvailable = 50;
    const range = [];

    for (let index = start; index >= start - yearsAvailable; index--) {
      range.push(index);
    }

    return range;
  }

  getAssociationYearRange = (min) => {
    const start = (new Date()).getFullYear();
    const yearsAvailable = (min === undefined) ? 50 : start - parseInt(min);
    const range = [];
    for (let index = start; index >= start - yearsAvailable; index--) {
      range.push(index);
    }
    return range;
  }

  addStudentEducationRecord = (e) => {
    const studentIndex = parseInt(e.currentTarget.getAttribute('data-student-index'));
    this.setState({
      record: update(this.state.record, {
        studentRecords: {
          [studentIndex]: {
            educationRecords: {
              $push: [this.getNewStudentEducationRecord()]
            }
          }
        }
      }),
      lastEditorStateChange: Date.now()
    })
  }

  addAdvisorAssociationRecord = (e) => {
    const advisorIndex = parseInt(e.currentTarget.getAttribute('data-advisor-index'));
    this.setState({
      record: update(this.state.record, {
        advisorRecords: {
          [advisorIndex]: {
            associationRecords: {
              $push: [this.getNewAdvisorAssociationRecord()]
            }
          }
        }
      }),
      lastEditorStateChange: Date.now()
    })
  }

  removeStudentEducationRecord = (e) => {
    const studentIndex = parseInt(e.currentTarget.getAttribute('data-student-index'));
    const studentEducationIndex = parseInt(e.currentTarget.getAttribute('data-student-education-index'));
    this.setState({
      record: update(this.state.record, {
        studentRecords: {
          [studentIndex]: {
            educationRecords: {
              $splice: [[studentEducationIndex, 1]]
            }
          }
        }
      }),
      lastEditorStateChange: Date.now()
    })
  }



  removeAdvisorAssociationRecord = (e) => {
    const advisorIndex = parseInt(e.currentTarget.getAttribute('data-advisor-index'));

    const advisorEducationIndex = parseInt(e.currentTarget.getAttribute('data-advisor-education-index'));

    this.setState({
      record: update(this.state.record, {
        advisorRecords: {
          [advisorIndex]: {
            associationRecords: {
              $splice: [[advisorEducationIndex, 1]]
            }
          }
        }
      }),
      lastEditorStateChange: Date.now()
    })

  }


  addStudent = () => {

    if (this.state.record.studentRecords.length < MAX_STUDENT_PER_TEAM) {
      this.setState({
        record: update(this.state.record, {
          studentRecords: {
            $push: [this.getNewStudentRecord()]
          }
        }),
        lastEditorStateChange: Date.now()
      })
    }
  }


  addProject = () => {

    if (this.state.record.projectRecords.length < MAX_PROJECT_PER_TEAM) {
      this.setState({
        record: update(this.state.record, {
          projectRecords: {
            $push: [this.getNewProjectRecord()]
          }
        }),
        lastEditorStateChange: Date.now()
      })
    }
  }

  addAdvisor = () => {


    this.setState({
      record: update(this.state.record, {
        advisorRecords: {
          $push: [this.getNewAdvisorRecord()]
        }
      }),
      lastEditorStateChange: Date.now()
    })

  }

  removeStudent = (e) => {
    const studentIndex = parseInt(e.currentTarget.getAttribute('data-student-index'));

    if (this.state.record.studentRecords.length > 1) {
      this.setState({
        record: update(this.state.record, {
          studentRecords: {
            $splice: [[studentIndex, 1]]
          }
        }),
        lastEditorStateChange: Date.now()
      })
    }
  }

  removeProject = (e) => {
    const projectIndex = parseInt(e.currentTarget.getAttribute('data-project-index'));

    if (this.state.record.projectRecords.length > 1) {
      this.setState({
        record: update(this.state.record, {
          projectRecords: {
            $splice: [[projectIndex, 1]]
          }
        }),
        lastEditorStateChange: Date.now()
      })
    }
  }

  removeAdvisor = (e) => {
    const advisorIndex = parseInt(e.currentTarget.getAttribute('data-advisor-index'));

    if (this.state.record.advisorRecords.length > 1) {
      this.setState({
        record: update(this.state.record, {
          advisorRecords: {
            $splice: [[advisorIndex, 1]]
          }
        }),
        lastEditorStateChange: Date.now()
      })
    }
  }


  validateRecord = (record, parentKey) => {
    // console.log('validateRecord', record, this.requiredFields);
    let isRecordValid = true;
    Object.keys(record).map((key) => {
      const inspect = _.get(record, key);
      if (_.isArray(inspect)) {
        inspect.map((data) => {
          isRecordValid = isRecordValid && this.validateRecord(data, _.isEmpty(parentKey) ? `${key}` : `${parentKey}.${key}`);
        })
        // isRecordValid = isRecordValid && this.validateRecord(inspect, _.isEmpty(parentKey) ? `${key}` : `${parentKey}.${key}`);
      } else {
        const requiredFields = this.flattenKeys(this.requiredFields);
        isRecordValid = isRecordValid && (_.get(requiredFields, _.isEmpty(parentKey) ? `${key}` : `${parentKey}.${key}`) === true ? !_.isEmpty(record[key]) : true) && (
          key === 'email' ?
            _.isEmail(record[key])
            : true
        );

        // console.log('>>', _.isEmpty(parentKey) ? `${key}` : `${parentKey}.${key}`, (_.get(requiredFields, _.isEmpty(parentKey) ? `${key}` : `${parentKey}.${key}`) === true ? !_.isEmpty(record[key]) : true), isRecordValid);
      }

    })
    return isRecordValid;
  }


  onMutationError = (error) => {
    console.error(error);
    this.setState({
      isEditorMutating: false,
      mutationError: _.isEmpty(error) ? undefined : error.message.replace('GraphQL error: ', '')
    })
  }


  onMutationCompleted = ({ addApplication }) => {
    console.log('addApplication', addApplication);
    this.setState({
      isEditorMutating: false,
      mutationError: undefined,
      record: this.getDefaultEditorRecord(),
      editId: undefined,
      showConfirmation: true,
      confirmation: {
        teamName: addApplication.teamName,
        ref: addApplication.ref
      }
    })
  };

  render() {

    // console.log(">>> query", this.props.query);


    const locale = this.props.query.locale;

    const sectors = _.sortBy(this.translate('sectors'), [(o) => o]);
    const projectCategories = _.sortBy(this.translate('projectCategories'), [(o) => o.name]);


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

            <div className="row section-header">
              <div className="col-full">
                <h3 className="subhead">{this.translate('confirmation.title')}</h3>
              </div>
            </div>

            <div className="row">

              <div className="block-tab-full">
                <div className="col-block" style={{ width: "100%" }}>
                  <div className="item-process__text">
                    <p dangerouslySetInnerHTML={{ __html: this.translate('confirmation.message') }} />
                    <p>
                      <b>{this.translate('confirmation.refTitle')}</b><br />#{this.state.confirmation.ref}
                    </p>
                    <p>
                      <b>{this.translate('confirmation.teamNameTitle')}</b><br />{this.state.confirmation.teamName}
                    </p>
                  </div>
                  <div className="full-width">
                    <button onClick={this.resetForm}>{this.translate('registerAnother')}</button>
                  </div>
                </div>
              </div>

            </div>
          </section>

        }






        {!this.state.showConfirmation &&
          <section className="s-section target-section first last">

            <div className="row section-header">
              <div className="col-full">



                <Mutation
                  mutation={ADD_APPLICATION}
                  onCompleted={this.onMutationCompleted}
                  onError={this.onMutationError}
                >
                  {(mutate, { loading, error, called, data }) => {

                    {/* this.graphQLMutateCreate = mutate; */ }


                    return <RegistrationForm onSubmit={(e) => { e.preventDefault(); }}>

                      <FormSection className="FormSection">
                        <div id="trainingBox">
                          <h1>Next Training Section: </h1>
                          <Countdown date={new Date(2019, 2, 16, 10, 0, 0, 0)}
                            renderer={renderer}
                          />
                          <div className="clearing"></div>
                        </div>

                        <div id="registrationBox">
                          <h3>National Taiwan University</h3>
                          <a href="#">Register Now</a>
                          <div className="clearing"></div>
                        </div>
                        
                        <h3 className="subhead">{this.translate('teamInfo')}</h3>

                        <FormRow>
                          <FormField>
                            {this.getLabel('teamName')}
                            <input type="text" data-name="teamName" data-section="teamInfo" onChange={this.onRecordChange} value={_.isEmpty(this.state.record['teamName']) ? "" : this.state.record['teamName']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                          </FormField>
                        </FormRow>

                        {
                          !_.isEmpty(this.state.mutationError) &&
                          <div className="full-width" style={{ color: "red", marginTop: "-3rem" }}>
                            {this.state.mutationError}
                          </div>
                        }
                      </FormSection>
                      {
                        this.state.record.studentRecords.map((studentRecord, studentIndex) => {

                          return <FormSection className="FormSection" key={studentIndex}>
                            <h3 className="subhead">{this.translate('studentInfo')} {this.state.record.studentRecords.length > 1 && `#${studentIndex + 1}`}

                              {
                                this.state.record.studentRecords.length > 1 &&
                                <div className="remove" data-student-index={studentIndex} onClick={this.removeStudent}>{this.translate('removeStudent')}</div>
                              }
                            </h3>

                            <FormRow>
                              <FormField>
                                {this.getLabel('studentRecords.firstName')}
                                <input type="text" data-name="firstName" data-section="studentRecords" data-student-index={studentIndex} onChange={this.onRecordChange} value={_.isEmpty(studentRecord['firstName']) ? "" : studentRecord['firstName']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                              </FormField>

                              <FormField>
                                {this.getLabel('studentRecords.lastName')}
                                <input type="text" data-name="lastName" data-section="studentRecords" data-student-index={studentIndex} onChange={this.onRecordChange} value={_.isEmpty(studentRecord['lastName']) ? "" : studentRecord['lastName']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                              </FormField>
                            </FormRow>

                            <FormRow>
                              <FormField>
                                {this.getLabel('studentRecords.phoneNumber')}
                                <input type="tel" data-name="phoneNumber" data-section="studentRecords" data-student-index={studentIndex} onChange={this.onRecordChange} value={_.isEmpty(studentRecord['phoneNumber']) ? "" : studentRecord['phoneNumber']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                              </FormField>

                              <FormField>
                                {this.getLabel('studentRecords.email')}
                                <input type="email" data-name="email" data-section="studentRecords" data-student-index={studentIndex} onChange={this.onRecordChange} value={_.isEmpty(studentRecord['email']) ? "" : studentRecord['email']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                              </FormField>
                            </FormRow>





                            {
                              studentRecord.educationRecords.map((educationRecord, studentEducationIndex) => {

                                return <FormSection className="FormSection" key={studentEducationIndex}>
                                  <h3 className="subhead">{this.translate('studentEducationInfo')} {studentRecord.educationRecords.length > 1 && `#${studentEducationIndex + 1}`}
                                    {
                                      studentRecord.educationRecords.length > 1 &&
                                      <div className="remove" data-student-index={studentIndex}
                                        data-student-education-index={studentEducationIndex} onClick={this.removeStudentEducationRecord}>{this.translate('removeStudentEducationRecord')}</div>
                                    }
                                  </h3>

                                  <FormRow>
                                    <FormField>
                                      {this.getLabel('studentRecords.educationRecords.degree')}
                                      <input type="text" data-name="degree" data-section="studentEducationRecords" data-student-index={studentIndex} data-student-education-index={studentEducationIndex} onChange={this.onRecordChange} value={_.isEmpty(educationRecord['degree']) ? "" : educationRecord['degree']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                                    </FormField>

                                    <FormField>
                                      {this.getLabel('studentRecords.educationRecords.programme')}
                                      <input type="text" data-name="programme" data-section="studentEducationRecords" data-student-index={studentIndex} data-student-education-index={studentEducationIndex} onChange={this.onRecordChange} value={_.isEmpty(educationRecord['programme']) ? "" : educationRecord['programme']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                                    </FormField>
                                  </FormRow>


                                  <FormRow>
                                    <FormField>
                                      {this.getLabel('studentRecords.educationRecords.institutionName')}
                                      <input type="text" data-name="institutionName" data-section="studentEducationRecords" data-student-index={studentIndex} data-student-education-index={studentEducationIndex} onChange={this.onRecordChange} value={_.isEmpty(educationRecord['institutionName']) ? "" : educationRecord['institutionName']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                                    </FormField>

                                    <FormField>
                                      {this.getLabel('studentRecords.educationRecords.yearOfGraduation')}
                                      <select data-name="yearOfGraduation" data-section="studentEducationRecords" data-student-index={studentIndex} data-student-education-index={studentEducationIndex} onChange={this.onRecordChange} value={_.isEmpty(educationRecord['yearOfGraduation']) ? "" : educationRecord['yearOfGraduation']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred}>
                                        <option value=""></option>
                                        {
                                          this.getGraduationYearRange().map((year, index) => {
                                            return <option value={year} key={year}>{year}</option>
                                          })
                                        }
                                      </select>
                                    </FormField>
                                  </FormRow>




                                  <FormRow>
                                    <FormField>
                                      {this.getLabel('studentRecords.educationRecords.city')}
                                      <input type="text" data-name="city" data-section="studentEducationRecords" data-student-index={studentIndex} data-student-education-index={studentEducationIndex} onChange={this.onRecordChange} value={_.isEmpty(educationRecord['city']) ? "" : educationRecord['city']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                                    </FormField>

                                    <FormField>
                                      {this.getLabel('studentRecords.educationRecords.state')}
                                      <input type="text" data-name="state" data-section="studentEducationRecords" data-student-index={studentIndex} data-student-education-index={studentEducationIndex} onChange={this.onRecordChange} value={_.isEmpty(educationRecord['state']) ? "" : educationRecord['state']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                                    </FormField>
                                  </FormRow>



                                  <FormRow>

                                    <FormField>
                                      {this.getLabel('studentRecords.educationRecords.countryCode')}

                                      <CountryInputSelectComponent
                                        locale={locale}
                                        dataName="countryCode"
                                        dataSection="studentEducationRecords"
                                        dataStudentIndex={studentIndex}
                                        dataStudentEducationIndex={studentEducationIndex}
                                        value={_.isEmpty(educationRecord['countryCode']) ? "" : educationRecord['countryCode']}
                                        onFocus={this.onFieldFocused}
                                        onBlur={this.onFieldBlurred}
                                        onChange={this.onRecordChange}

                                      />

                                    </FormField>
                                  </FormRow>





                                </FormSection>

                              })
                            }

                            <FormTools>
                              <div data-student-index={studentIndex} onClick={this.addStudentEducationRecord}>
                                {this.translate('addAnotherStudentEducationRecord')}
                              </div>
                            </FormTools>

                          </FormSection>
                        })
                      }

                      <FormTools>
                        <div onClick={this.addStudent}>
                          {this.state.record.studentRecords.length < MAX_STUDENT_PER_TEAM && this.translate('addAnotherStudent')}
                        </div>


                      </FormTools>


                      {
                        this.state.record.advisorRecords.map((advisorRecord, advisorIndex) => {

                          return <FormSection className="FormSection" key={advisorIndex}>
                            <h3 className="subhead">{this.translate('advisorInfo')} {this.state.record.advisorRecords.length > 1 && `#${advisorIndex + 1}`}

                              {
                                this.state.record.advisorRecords.length > 1 &&
                                <div className="remove" data-advisor-index={advisorIndex} onClick={this.removeAdvisor}>{this.translate('removeAdvisor')}</div>
                              }
                            </h3>

                            <FormRow>
                              <FormField>
                                {this.getLabel('advisorRecords.firstName')}
                                <input type="text" data-name="firstName" data-section="advisorRecords" data-advisor-index={advisorIndex} onChange={this.onRecordChange} value={_.isEmpty(advisorRecord['firstName']) ? "" : advisorRecord['firstName']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                              </FormField>

                              <FormField>
                                {this.getLabel('advisorRecords.lastName')}
                                <input type="text" data-name="lastName" data-section="advisorRecords" data-advisor-index={advisorIndex} onChange={this.onRecordChange} value={_.isEmpty(advisorRecord['lastName']) ? "" : advisorRecord['lastName']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                              </FormField>
                            </FormRow>

                            <FormRow>
                              <FormField>
                                {this.getLabel('advisorRecords.phoneNumber')}
                                <input type="tel" data-name="phoneNumber" data-section="advisorRecords" data-advisor-index={advisorIndex} onChange={this.onRecordChange} value={_.isEmpty(advisorRecord['phoneNumber']) ? "" : advisorRecord['phoneNumber']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                              </FormField>

                              <FormField>
                                {this.getLabel('advisorRecords.email')}
                                <input type="email" data-name="email" data-section="advisorRecords" data-advisor-index={advisorIndex} onChange={this.onRecordChange} value={_.isEmpty(advisorRecord['email']) ? "" : advisorRecord['email']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                              </FormField>
                            </FormRow>





                            {
                              advisorRecord.associationRecords.map((associationRecord, associationRecordIndex) => {

                                return <FormSection className="FormSection" key={associationRecordIndex}>
                                  {this.getLabel('advisorRecords.firstName')}
                                  <h3 className="subhead">{this.translate('advisorAssociationInfo')} {advisorRecord.associationRecords.length > 1 && `#${associationRecordIndex + 1}`}
                                    {
                                      advisorRecord.associationRecords.length > 1 &&
                                      <div className="remove" data-advisor-index={advisorIndex}
                                        data-advisor-education-index={associationRecordIndex} onClick={this.removeAdvisorAssociationRecord}>{this.translate('removeAdvisorAssociationRecord')}</div>
                                    }
                                  </h3>


                                  <FormRow>
                                    <FormField>
                                      {this.getLabel('advisorRecords.associationRecords.organisationName')}
                                      <input type="text" data-name="organisationName" data-section="advisorAssociationRecords" data-advisor-index={advisorIndex} data-advisor-association-index={associationRecordIndex} onChange={this.onRecordChange} value={_.isEmpty(associationRecord['organisationName']) ? "" : associationRecord['organisationName']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                                    </FormField>

                                  </FormRow>

                                  <FormRow>
                                    <FormField>
                                      {this.getLabel('advisorRecords.associationRecords.title')}
                                      <input type="text" data-name="title" data-section="advisorAssociationRecords" data-advisor-index={advisorIndex} data-advisor-association-index={associationRecordIndex} onChange={this.onRecordChange} value={_.isEmpty(associationRecord['title']) ? "" : associationRecord['title']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                                    </FormField>

                                    <FormField>
                                      {this.getLabel('advisorRecords.associationRecords.sectorCode')}
                                      <select data-name="sectorCode" data-section="advisorAssociationRecords" data-advisor-index={advisorIndex} data-advisor-association-index={associationRecordIndex} onChange={this.onRecordChange} value={_.isEmpty(associationRecord['sectorCode']) ? "" : associationRecord['sectorCode']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred}>
                                        <option value=""></option>
                                        {
                                          Object.keys(sectors).map((sectorCode, index) => {
                                            return <option value={sectorCode} key={sectorCode}>{sectors[sectorCode]}</option>
                                          })
                                        }
                                      </select>
                                    </FormField>
                                  </FormRow>



                                  <FormRow>
                                    <FormField>
                                      {this.getLabel('advisorRecords.associationRecords.yearCommencement')}
                                      <select data-name="yearCommencement" data-section="advisorAssociationRecords" data-advisor-index={advisorIndex} data-advisor-association-index={associationRecordIndex} onChange={this.onRecordChange} value={_.isEmpty(associationRecord['yearCommencement']) ? "" : associationRecord['yearCommencement']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred}>
                                        <option value=""></option>
                                        {
                                          this.getAssociationYearRange().map((year, index) => {
                                            return <option value={year} key={year}>{year}</option>
                                          })
                                        }
                                      </select>
                                    </FormField>

                                    <FormField>
                                      {this.getLabel('advisorRecords.associationRecords.yearCessation')}
                                      <select data-name="yearCessation" data-section="advisorAssociationRecords" data-advisor-index={advisorIndex} data-advisor-association-index={associationRecordIndex} onChange={this.onRecordChange} value={_.isEmpty(associationRecord['yearCessation']) ? "" : associationRecord['yearCessation']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred}>
                                        <option value=""> - </option>
                                        {
                                          this.getAssociationYearRange(associationRecord['yearCommencement']).map((year, index) => {
                                            return <option value={year} key={year}>{year}</option>
                                          })
                                        }
                                      </select>
                                    </FormField>
                                  </FormRow>



                                  <FormRow>
                                    <FormField>
                                      {this.getLabel('advisorRecords.associationRecords.city')}
                                      <input type="text" data-name="city" data-section="advisorAssociationRecords" data-advisor-index={advisorIndex} data-advisor-association-index={associationRecordIndex} onChange={this.onRecordChange} value={_.isEmpty(associationRecord['city']) ? "" : associationRecord['city']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                                    </FormField>
                                    <FormField>
                                      {this.getLabel('advisorRecords.associationRecords.state')}
                                      <input type="text" data-name="state" data-section="advisorAssociationRecords" data-advisor-index={advisorIndex} data-advisor-association-index={associationRecordIndex} onChange={this.onRecordChange} value={_.isEmpty(associationRecord['state']) ? "" : associationRecord['state']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                                    </FormField>
                                  </FormRow>
                                  <FormRow>


                                    <FormField>
                                      {this.getLabel('advisorRecords.associationRecords.countryCode')}
                                      <CountryInputSelectComponent
                                        locale={locale}
                                        dataName="countryCode"
                                        dataSection="advisorAssociationRecords"
                                        dataAdvisorIndex={advisorIndex}
                                        dataAdvisorAssociationIndex={associationRecordIndex}
                                        value={_.isEmpty(associationRecord['countryCode']) ? "" : associationRecord['countryCode']}
                                        onFocus={this.onFieldFocused}
                                        onBlur={this.onFieldBlurred}
                                        onChange={this.onRecordChange}
                                      />
                                    </FormField>
                                  </FormRow>
                                </FormSection>
                              })
                            }

                            <FormTools>
                              <div data-advisor-index={advisorIndex} onClick={this.addAdvisorAssociationRecord}>
                                {this.translate('addAnotherAdvisorAssociationRecord')}
                              </div>
                            </FormTools>

                          </FormSection>
                        })
                      }


                      <FormTools>
                        <div onClick={this.addAdvisor}>
                          {
                            this.state.record.advisorRecords.length > 0 ?
                              this.translate('addAnotherAdvisor')
                              : this.translate('addAnAdvisor')
                          }
                        </div>
                      </FormTools>



                      {
                        this.state.record.projectRecords.map((projectRecord, projectIndex) => {

                          return <FormSection className="FormSection" key={projectIndex}>

                            <h3 className="subhead">{this.translate('projectInfo')} {this.state.record.projectRecords.length > 1 && `#${projectIndex + 1}`}

                              {
                                this.state.record.projectRecords.length > 1 &&
                                <div className="remove" data-project-index={projectIndex} onClick={this.removeProject}>{this.translate('removeProject')}</div>
                              }
                            </h3>

                            <h5>{this.translate('extraInfo')} </h5>
                            <FormRow>
                              <FormField>
                                {this.getLabel('projectRecords.name')}
                                <input type="text" data-name="name" data-section="projectRecords" data-project-index={projectIndex} onChange={this.onRecordChange} value={_.isEmpty(projectRecord['name']) ? "" : projectRecord['name']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                              </FormField>

                              <FormField>
                                {this.getLabel('projectRecords.projectCategoryKey')}
                                <select data-name="projectCategoryKey" data-section="projectRecords" data-project-index={projectIndex} onChange={this.onRecordChange} value={_.isEmpty(projectRecord['projectCategoryKey']) ? "" : projectRecord['projectCategoryKey']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred}>
                                  <option value=""></option>
                                  {
                                    Object.keys(projectCategories).map((projectCategoryKey, index) => {
                                      return <option value={projectCategoryKey} key={projectCategoryKey}>{projectCategories[projectCategoryKey].name}</option>
                                    })
                                  }
                                </select>
                              </FormField>
                            </FormRow>
                            <FormRow>
                              <FormField>
                                {this.getLabel('projectRecords.description')}
                                <textarea type="text" data-name="description" data-section="projectRecords" data-project-index={projectIndex} onChange={this.onRecordChange} value={_.isEmpty(projectRecord['description']) ? "" : projectRecord['description']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                              </FormField>
                            </FormRow>
                          </FormSection>
                        })
                      }
                      <FormTools>
                        <div onClick={this.addProject}>
                          {this.state.record.projectRecords.length < MAX_PROJECT_PER_TEAM && this.translate('addAnotherProject')}
                        </div>
                      </FormTools>
                      <FormTools>
                        <div className="full-width">
                          <button className={classNames({
                            disabled: this.state.recordIsValid !== true
                          })} disabled={!this.state.recordIsValid} onClick={() => {
                            this.onCreateApplication(mutate)
                          }}>{this.translate('submit')}</button>
                        </div>
                      </FormTools>
                      {
                        !_.isEmpty(this.state.mutationError) &&
                        <div className="full-width" style={{ color: "red" }}>
                          {this.state.mutationError}
                        </div>
                      }
                    </RegistrationForm>
                  }}
                </Mutation>
              </div>
            </div>
          </section>
        }
      </ThisPageContainerComponent>
    )
  }
}