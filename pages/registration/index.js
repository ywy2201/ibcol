import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import _ from 'lodash-checkit';
import update from 'immutability-helper';
import moment from 'moment';
import configs from 'configs';
import cookies from 'browser-cookies';

import { media, style } from 'helpers/styledComponents.js';
import CryptoJS from "crypto-js";
import {translate} from 'helpers/translate.js';
// import { transparentize } from 'polished'

import { Link } from '/routes';

import PageContainerComponent from 'components/PageContainerComponent';
import CountryInputSelectComponent from 'components/CountryInputSelectComponent';

import Head from 'next/head';

import { Mutation, Query } from "react-apollo";
import gql from 'graphql-tag'

import Countdown from 'react-countdown-now';


import axios from 'axios';
// import FilePondComponent from 'components/FilePondComponent';
import { FilePond, registerPlugin } from 'react-filepond';
import '/node_modules/filepond/dist/filepond.min.css';

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import '/node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';


// Register the plugins
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize, FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const SALT = process.env.SALT ? process.env.SALT : ")6Dc1UP*S9Night-Age-Doll-Famous-8as81*@()#@";

const getFilenameFromFileId = (fileId) => {
  // console.log('getFilenameFromFileId', fileId, SALT);
  const filename = _.last(CryptoJS.AES.decrypt(fileId, SALT).toString(CryptoJS.enc.Utf8).split('/'));
  // console.log('fileId', fileId);
  // console.log('SALT', SALT);
  // console.log('filename', filename);
  return filename;
}

const filepondServer = {
  url: process.env.FILEPOND_API_URL,
  process: function(fieldName, file, metadata, load, error, progress, abort) {
    // console.log(fieldName, file);

    const CancelToken = axios.CancelToken;

    // console.log('file', file);
    let cancelPutGSXHR;
    let cancelGetSignedUrlXHR;
    
    axios.post(`${process.env.FILEPOND_API_URL}${process.env.FILEPOND_API_ENDPOINT}`, {
      type: file.type,
      name: file.name,
      size: file.size,
    }, {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancelGetSignedUrlXHR = c;
      })
    })
    .then(function (response) {
      // console.log(response.data);

      const serverId = response.data.serverId;

      // const formData = new FormData();
      // formData.append('file',file);
      // formData.append('Content-Type', file.type);
      // formData.append('GoogleAccessId', response.data.GoogleAccessId);
      // formData.append('policy', response.data.policy.base64);
      // formData.append('signature', response.data.policy.signature);
      // formData.append('bucket', response.data.bucket);

      axios.put(`${response.data.signedUrl}`, file, 
        {
          headers: { 
            'content-type': file.type,
            
          }
        }, {
          cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancelPutGSXHR = c;
          })
        }
      ).then((response) => {
        console.log(serverId);
        load(serverId);
      })
      .catch((e) => {
        console.log(e);
        error();
      })
    }).catch((e) => {
      console.log(e);
      error();
    });


    // Should expose an abort method so the request can be cancelled
    return {
      abort: () => {
        // This function is entered if the user has tapped the cancel button
        if (cancelGetSignedUrlXHR)
          cancelGetSignedUrlXHR();
        if (cancelPutGSXHR)
          cancelPutGSXHR();

        // Let FilePond know the request has been cancelled
        abort();
      }
    };

  },
  // url: process.env.FILEPOND_API_URL,
  // process: process.env.FILEPOND_API_ENDPOINT,
  fetch: process.env.FILEPOND_API_ENDPOINT,
  revert: process.env.FILEPOND_API_ENDPOINT
};


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

const UPDATE_APPLICATION = gql`
  mutation UpdateApplication($accessToken: TokenInput!, $application: ApplicationUpdateInput!) {

    updateApplication(accessToken: $accessToken, application: $application) {
      teamName
      ref
    }
  }
`;


const IS_TOKEN_VALID = gql`
  query IsTokenValid($accessToken: TokenInput!) {
    isTokenValid(accessToken: $accessToken)
  }
`;


const GET_APPLICATIONS = gql`
  query GetApplications($accessToken: TokenInput!) {
    getApplications(accessToken: $accessToken) {
      teamName
      ref
      studentRecords {
        firstName
        lastName
        phoneNumber
        email
        educationRecords {
          institutionName
          state
          city
          countryCode
          degree
          programme
          yearOfGraduation
          studentNumber
          studentCardFrontFileId
          studentCardBackFileId
          transcriptFileId
          isVerified
        }
      }
      advisorRecords {
        firstName
        lastName
        phoneNumber
        email
        associationRecords {
          organisationName
          title
          sectorCode
          state
          city
          countryCode
          yearCommencement
          yearCessation
        }
      }
      projectRecords {
        ref
        name
        projectCategoryKey
        description
        whitepaperFileIds {
          fileId,
          receivedAt
        }
        presentationFileIds {
          fileId,
          receivedAt
        }
      }
    }
  }
`;




const ThisPageContainerComponent = styled(PageContainerComponent)`
  
  #extraRegistration {
    h1, h3, a, span {
      width: 100%;
      float: none;
      height: unset;
      line-height: 3rem;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
    }

    a {
      display: inline;
    }

    #trainingBox {
      background: #eee;
      padding: 3rem 3rem 2.95rem;
      /* margin-left: 2rem;
      margin-right: 2rem; */
      margin-bottom: 5rem;
    }
    
    

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

  .filepond--root { font-size: 1.5rem !important; }
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

export default class extends React.PureComponent {
  static async getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);
    this.state = Object.assign({
      tokenCookie: undefined,
      hasValidToken: false,
      existingApplications: [],
      currentSelectedRecordIndex: undefined
    }, this.getDefaultState());
    this.resetForm();
    // this.onEditorStateChange();
  }

  pondRefs = {
    studentCardFronts: [],
    studentCardBacks: [],
    transcripts: []
  }

  getDefaultState = () => {
    return {
      pendingUploads: 0,
      focusedField: undefined,
      record: this.props.record !== undefined ? this.graphQLCleanUp(this.props.record) : this.getDefaultEditorRecord(),
      lastEditorStateChange: Date.now(),
      isEditorMutating: false,
      recordIsValid: false,
      showConfirmation: false,
      confirmation: {
        teamName: "",
        ref: ""
      }
    };
  }

  existingPondFiles = []

  loadFilesToPonds = () => {
    const record = this.state.record;

    console.log('loadFilesToPonds...');
    record.studentRecords.map((studentRecord, studentIndex) => {
      studentRecord.educationRecords.map((educationRecord, studentEducationIndex) => {
        console.log(`${studentIndex}-${studentEducationIndex}`, educationRecord);

        if (!_.isEmpty(educationRecord.studentCardFrontFileId)) {
          console.log(`educationRecord.studentCardFrontFileId ${educationRecord.studentCardFrontFileId}`);
          this.existingPondFiles.push(educationRecord.studentCardFrontFileId);
          this.pondRefs.studentCardFronts[`${studentIndex}-${studentEducationIndex}`].addFile(`${_.isEmpty(process.env.FILEPOND_API_URL)? document.location.protocol + '//' + document.location.hostname :process.env.FILEPOND_API_URL}${process.env.FILEPOND_API_ENDPOINT}${educationRecord.studentCardFrontFileId}`);
        } else {
          try {this.pondRefs.studentCardFronts[`${studentIndex}-${studentEducationIndex}`].removeFile()} catch (e) {console.error(e)}
        }

        if (!_.isEmpty(educationRecord.studentCardBackFileId)) {
          console.log(`educationRecord.studentCardBackFileId ${educationRecord.studentCardBackFileId}`);
          this.existingPondFiles.push(educationRecord.studentCardBackFileId);
          this.pondRefs.studentCardBacks[`${studentIndex}-${studentEducationIndex}`].addFile(`${_.isEmpty(process.env.FILEPOND_API_URL)? document.location.protocol + '//' + document.location.hostname :process.env.FILEPOND_API_URL}${process.env.FILEPOND_API_ENDPOINT}${educationRecord.studentCardBackFileId}`);
        } else {
          try {this.pondRefs.studentCardBacks[`${studentIndex}-${studentEducationIndex}`].removeFile()} catch (e) {console.error(e)}
        }

        if (!_.isEmpty(educationRecord.transcriptFileId)) {
          console.log(`educationRecord.transcriptFileId ${educationRecord.transcriptFileId}`);
          this.existingPondFiles.push(educationRecord.transcriptFileId);
          this.pondRefs.transcripts[`${studentIndex}-${studentEducationIndex}`].addFile(`${_.isEmpty(process.env.FILEPOND_API_URL)? document.location.protocol + '//' + document.location.hostname :process.env.FILEPOND_API_URL}${process.env.FILEPOND_API_ENDPOINT}${educationRecord.transcriptFileId}`);
        } else {
          try {this.pondRefs.transcripts[`${studentIndex}-${studentEducationIndex}`].removeFile()} catch (e) {console.error(e)}
        }
        

        

      })
    })
  }

  onManageRecordChange = (e) => {
    this.resetForm();
    console.log('onManageRecordChange', e.currentTarget.value);
    this.setState({currentSelectedRecordIndex: e.currentTarget.value, record: this.graphQLCleanUp(this.state.existingApplications[e.currentTarget.value])})
  }

  logout = () => {
    this.clearCookie();
    this.resetForm();
    this.setState({
      currentSelectedRecordIndex: undefined
    })
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

  getTokenFromCookie = () => {

    return (cookies.get('email') !== null && cookies.get('token') !== null) ? {
      email: cookies.get('email'),
      token: cookies.get('token')
    }: undefined;
  }

  componentDidMount = () => {
    this.setState({
      tokenCookie: this.getTokenFromCookie(),
      cookie: {
        loginAttemptEmail: cookies.get('loginAttemptEmail') || undefined,
        seed: cookies.get('seed') || undefined,
        token: cookies.get('token') || undefined
      }
    })
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
      studentCardFrontFileId: "",
      studentCardBackFileId: "",
      transcriptFileId: "",
      studentNumber: "",
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
      description: "",
      presentationFileId: "",
      whitepaperFileId: ""
    }
  }

  componentDidUpdate = (prevProps, prevState) => {

    if (prevState.lastEditorStateChange !== this.state.lastEditorStateChange) {
      // console.log('componentDidUpdate', this.state.lastEditorStateChange);
      this.setState({
        recordIsValid: this.validateRecord(this.state.record)
      });
    }

    if (prevState.currentSelectedRecordIndex !== this.state.currentSelectedRecordIndex) {
      this.loadFilesToPonds();
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

  onPendingUploads = (inc = true) => {
    this.setState({pendingUploads: this.state.pendingUploads + (inc ? 1:-1)});
  }

  onFilepondChange = (file, meta) => {
    // console.log(`onFilepondChange ${file ? file.serverId : file, meta}`);
    console.log('file', file);
    console.log('meta', meta);

    const serverId = !_.isEmpty(file) ? file.serverId : "";
    
    let updatedRecord = {};

    if (meta.section === 'studentEducationRecords') {
      const studentIndex = meta.studentIndex;
      const studentEducationIndex = parseInt(meta.studentEducationIndex);
      
      if (_.includes(this.existingPondFiles, this.state.record.studentRecords[studentIndex].educationRecords[studentEducationIndex][meta.name])) {
        console.log('this.existingPondFiles', this.existingPondFiles);
        console.log(this.state.record.studentRecords[studentIndex].educationRecords[studentEducationIndex][meta.name]);
        _.pull(this.existingPondFiles, this.state.record.studentRecords[studentIndex].educationRecords[studentEducationIndex][meta.name]);
        return;
      }

      if (this.state.record.studentRecords[studentIndex].educationRecords[studentEducationIndex][meta.name] !== serverId) {
        console.log(`onFilepondChange ${this.state.record.studentRecords[studentIndex].educationRecords[studentEducationIndex][meta.name]} vs ${serverId}`);
        updatedRecord = update(this.state.record, {
          studentRecords: {
            [studentIndex]: {
              educationRecords: {
                [studentEducationIndex]: {
                  [meta.name]: {
                    $set: serverId
                  }
                }
              }
            }
          }
        })
      }
    } else if (meta.section === 'projectRecords') {
      const projectIndex = meta.projectIndex;

      if (_.includes(this.existingPondFiles, this.state.record.projectRecords[projectIndex][meta.name])) {
        console.log('this.existingPondFiles', this.existingPondFiles);
        console.log(this.state.record.projectRecords[projectIndex][meta.name]);
        _.pull(this.existingPondFiles, this.state.record.projectRecords[projectIndex][meta.name]);
        
        return;
      }

      if (this.state.record.projectRecords[projectIndex][meta.name] !== serverId) {
        console.log(`onFilepondChange ${this.state.record.projectRecords[projectIndex][meta.name]} vs ${serverId}`);

        updatedRecord = update(this.state.record, {
          projectRecords: {
            [projectIndex]: {
              [meta.name]: {
                $set: serverId
              }
            }
          }
        })
      }
    }


    if (!_.isEmpty(updatedRecord)) {
      console.log('updatedRecord', updatedRecord);
      this.setState({
        record: updatedRecord,
        lastEditorStateChange: Date.now()
      });
    }
  }


  graphQLCleanUp = (record) => {
    
    // const studentRecords = record.studentRecords;
    // const studentRecords = record.studentRecords;
    // const advisorRecords = record.advisorRecords;
    // const projectRecords = record.projectRecords;
    // const studentRecords = record.studentRecords;
    //         "advisorRecords": this.state.record.advisorRecords,
    //         "projectRecords": this.state.record.projectRecords


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

  onUpdateApplication = (mutate) => {
    // console.log('onUpdateApplication');

    if (this.state.recordIsValid) {
      // mutation AddPage($slug: String!, $locale: String!, $localisedPageInput: LocalisedPageInput!, $schemaDefinitionInputs: [SchemaDefinitionInput]!,
      //   $localisedFieldInputs: [LocalisedFieldInput]) {
      console.log('this.state.record', this.state.record);
      const application = update(this.state.record, {
        $unset: ['__typename'],
        studentRecords: {$apply: (studentRecords)=>{return studentRecords.map((studentRecord) => {
          return Object.assign({}, _.pick(studentRecord, ['firstName', 'lastName', 'phoneNumber', 'email']), {educationRecords: studentRecord.educationRecords.map((educationRecord) => _.pick(educationRecord, ['institutionName', 'state', 'city', 'countryCode',
    'degree', 'programme', 'yearOfGraduation', 'studentNumber', 'studentCardFrontFileId', 'studentCardBackFileId', 'transcriptFileId']))
        })})}},

        projectRecords: {$apply: (projectRecords)=>{
          return projectRecords.map((projectRecord)=>_.pick(projectRecord, ['ref', 'name', 'projectCategoryKey', 'description', 'whitepaperFileId', 'presentationFileId']))
        }},

        advisorRecords: {$apply: (advisorRecords)=>{return advisorRecords.map((advisorRecord) => {
          return Object.assign({}, _.pick(advisorRecord, ['firstName', 'lastName', 'phoneNumber', 'email']), {associationRecords: advisorRecord.associationRecords.map((associationRecord) => _.pick(associationRecord, ['yearCessation', 'yearCommencement', 'countryCode', 'city', 'sectorCode', 'state', 'title', 'organisationName']))
        })})}},
      })

      
      console.log('onUpdateApplication', application);
      mutate({
        variables: {
          application,
          accessToken: {
            email: this.state.tokenCookie.email, 
            token: this.state.tokenCookie.token
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


  onMutationCompleted = ({ updateApplication, addApplication }) => {
    console.log('addApplication', addApplication);
    console.log('updateApplication', updateApplication);

    this.setState({
      isEditorMutating: false,
      mutationError: undefined,
      record: this.getDefaultEditorRecord(),
      editId: undefined,
      showConfirmation: true,
      confirmation: {
        teamName: addApplication ? addApplication.teamName : updateApplication.teamName,
        ref: addApplication ? addApplication.ref : updateApplication.ref
      }
    })
  };

  render() {

    // console.log(">>> query", this.props.query);
    // console.log("===> FILEPOND_API_ENDPOINT ", process.env.FILEPOND_API_ENDPOINT);
    // console.log("===> FILEPOND_API_URL", process.env.FILEPOND_API_URL);
    // console.log("===>", process.env.ENV);

    


    const locale = this.props.query.locale;
    moment.locale(locale);

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

        

        <section className="s-section target-section first">
          <div className="row">
            <div className="col-full">
              <h1>{this.translate('subhead')}</h1>
            </div>
          </div>
        </section>
        <section className="target-section">
          <div id="extraRegistration" className="row">
            <div className="col-full">
              <div id="trainingBox">              
                <h3>{this.translate('lastDayToSubmit')}:</h3>
                <Countdown date={new Date(2019, 5, 9, 23, 59, 59, 59)}
                  renderer={renderer}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="target-section">
          <div className="row">
            <div className="col-full">
              {(!this.state.hasValidToken && this.state.tokenCookie !== undefined) &&
                <Query query={IS_TOKEN_VALID} variables={{ accessToken: {email: this.state.tokenCookie.email, token: this.state.tokenCookie.token} }}>
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
                      {/* console.log('data', data.isTokenValid); */}

                      this.setState({
                        hasValidToken: data.isTokenValid
                      })

                      if (!data.isTokenValid) {
                        this.clearCookie()
                      }
                    }

                    return null
                  }}
                </Query>
              }
              {
                (!this.state.hasValidToken && this.state.tokenCookie === undefined) &&
                <Link route="registrationLogin" params={{ locale }}>
                    <a className="btn btn--stroke btn--primary full-width btn--large" style={{"margin": "1rem auto 6rem"}}>
                        {this.translate('teamLogin')}
                    </a>
                </Link>
              }
              {
                (this.state.hasValidToken && this.state.tokenCookie !== undefined) &&
                
                <a className="btn btn--stroke btn--primary full-width btn--large" style={{"margin": "1rem auto 6rem"}} onClick={()=>{
                  this.logout();
                }}>
                    {this.translate('teamLogout')}
                </a>
            
              }

              

            </div>
          </div>
            
        </section>



        {this.state.showConfirmation &&
          <section className="target-section last">

            <div className="row section-header">
              <div className="col-full">
                <h3 className="subhead">{this.state.hasValidToken ? this.translate('confirmation.updateTitle') : this.translate('confirmation.title')}</h3>
              </div>
              
            </div>
            
            
            <div className="row">

              <div className="block-tab-full">
                <div className="col-block" style={{ width: "100%" }}>
                  <div className="item-process__text">
                    <p dangerouslySetInnerHTML={{ __html: this.state.hasValidToken ? this.translate('confirmation.updateMessage') : this.translate('confirmation.message') }} />
                    <p>
                      <b>{this.translate('confirmation.refTitle')}</b><br />#{this.state.confirmation.ref}
                    </p>
                    <p>
                      <b>{this.translate('confirmation.teamNameTitle')}</b><br />{this.state.confirmation.teamName}
                    </p>
                  </div>
                  <div className="full-width" style={{marginBottom: "4rem"}}>
                    <button onClick={()=>{
                      if (this.state.hasValidToken) {
                        location.reload();
                      } else {
                        this.resetForm();
                      }
                    }}>{this.state.hasValidToken ? this.translate('updateAnother') : this.translate('registerAnother')}</button>
                  </div>
                </div>
              </div>

            </div>
          </section>

        }




        {!this.state.showConfirmation &&
          <section className="target-section last">
              
            <div className="row section-header">
              <div className="col-full">
                <Mutation
                  mutation={this.state.currentSelectedRecordIndex === undefined ? ADD_APPLICATION : UPDATE_APPLICATION}
                  onCompleted={this.onMutationCompleted}
                  onError={this.onMutationError}
                >
                  {(mutate, { loading, error, called, data }) => {

                    {/* this.graphQLMutateCreate = mutate; */ }


                    return <RegistrationForm onSubmit={(e) => { e.preventDefault(); }}>

                      <FormSection className="FormSection">
                        {(this.state.hasValidToken && this.state.tokenCookie !== undefined) &&
                          <Query query={GET_APPLICATIONS} variables={{ accessToken: {email: this.state.tokenCookie.email, token: this.state.tokenCookie.token }}}>
                            {({ loading, error, data, refetch, networkStatus }) => {
                              {/* console.log('querying graphql...');
                              console.log('loading:', loading);
                              console.log('networkStatus:', networkStatus); */}
                              {/* console.log('error', error);
                              console.log('data', data); */}
                              {/* if ((networkStatus === 4) || loading) return <div className="full-width" style={{textAlign: 'center'}}>
                                  <><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></>
                                </div>; */}
                              
                              if (error) return `Error! ${error.message}`;

                              if (!_.isEmpty(data)) {
                                
                                const existingApplications = data.getApplications;

                                if (this.state.currentSelectedRecordIndex === undefined) {
                                  console.log('data', data);
                                  this.setState({
                                    existingApplications,
                                    currentSelectedRecordIndex: 0,
                                    record: existingApplications[0]
                                  })
                                }
                                

                                return <FormRow><FormField>{this.getLabel('managingApplicationTitle')}<select onChange={this.onManageRecordChange} value={this.state.currentSelectedRecordIndex}>
                                  {
                                    existingApplications.map((application, index)=>{
                                      return <option value={index} key={application.ref}>
                                        {`#${application.ref} (${application.teamName})`}
                                      </option>
                                    })
                                  }
                                  </select></FormField></FormRow>
                              } else {
                                return null
                              }

                              
                            }}
                          </Query>
                        }

                        
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
                                      {this.getLabel('studentRecords.educationRecords.studentNumber')}
                                      <input type="text" data-name="studentNumber" data-section="studentEducationRecords" data-student-index={studentIndex} data-student-education-index={studentEducationIndex} onChange={this.onRecordChange} value={_.isEmpty(educationRecord['studentNumber']) ? "" : educationRecord['studentNumber']} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} />
                                    </FormField>

                                    
                                  </FormRow>


                                  <FormRow>
                                    <FormField>
                                      {this.getLabel('studentRecords.educationRecords.studentCardFrontFile')}
                                      <input disabled style={{display: "none"}} type="text" data-name="studentCardFrontFileId" data-section="studentEducationRecords" data-student-index={studentIndex} data-student-education-index={studentEducationIndex} value={_.isEmpty(educationRecord['studentCardFrontFileId']) ? "" : educationRecord['studentCardFrontFileId']} />
                                      <FilePond
                                        allowMultiple={false}
                                        {...this.translate('filepond')}
                                        acceptedFileTypes="image/png, image/jpeg, application/pdf"
                                        labelFileTypeNotAllowed={this.translate('studentRecords.educationRecords.studentCardFrontFileType')}
                                        allowFileSizeValidation={true}
                                        maxTotalFileSize="100MB"
                                        ref={ref => this.pondRefs.studentCardFronts[`${studentIndex}-${studentEducationIndex}`] = ref}
                                        server={filepondServer}

                                        onprocessfileabort={(file)=>{this.onPendingUploads(false)}}
                                        onprocessfilestart={(file)=>{this.onPendingUploads()}}
                                        onremovefile={(file)=>{
                                          // console.log('onremovefile', file);
                                          this.onPendingUploads(false);
                                          this.onFilepondChange(file, {
                                            name: "studentCardFrontFileId",
                                            section: "studentEducationRecords",
                                            studentIndex,
                                            studentEducationIndex
                                          });
                                        }}
                                        onprocessfile={(error, file)=>{
                                          // console.log('onprocessfile', file, file.serverId);
                                          this.onPendingUploads(false);
                                          this.onFilepondChange(file, {
                                            name: "studentCardFrontFileId",
                                            section: "studentEducationRecords",
                                            studentIndex,
                                            studentEducationIndex
                                          });
                                        }}

                                        />
                                      
                                      
                                      
                                    </FormField>

                                    

                                    <FormField>
                                      {this.getLabel('studentRecords.educationRecords.studentCardBackFile')}
                                      <input disabled style={{display: "none"}} type="text" data-name="studentCardBackFileId" data-section="studentEducationRecords" data-student-index={studentIndex} data-student-education-index={studentEducationIndex} value={_.isEmpty(educationRecord['studentCardBackFileId']) ? "" : educationRecord['studentCardBackFileId']} />
                                      <FilePond
                                        allowMultiple={false}
                                        {...this.translate('filepond')}
                                        acceptedFileTypes="image/png, image/jpeg, application/pdf"
                                        labelFileTypeNotAllowed={this.translate('studentRecords.educationRecords.studentCardBackFileType')}
                                        allowFileSizeValidation={true}
                                        maxTotalFileSize="100MB"
                                        ref={ref => this.pondRefs.studentCardBacks[`${studentIndex}-${studentEducationIndex}`] = ref}
                                        
                                        server={filepondServer}
                                        onprocessfileabort={(file)=>{this.onPendingUploads(false)}}
                                        onprocessfilestart={(file)=>{this.onPendingUploads()}}
                                        onremovefile={(file)=>{
                                          // console.log('onremovefile', file);
                                          this.onPendingUploads(false);
                                          this.onFilepondChange(file, {
                                            name: "studentCardBackFileId",
                                            section: "studentEducationRecords",
                                            studentIndex,
                                            studentEducationIndex
                                          });
                                        }}
                                        onprocessfile={(error, file)=>{
                                          // console.log('onprocessfile', file, file.serverId);
                                          this.onPendingUploads(false);
                                          this.onFilepondChange(file, {
                                            name: "studentCardBackFileId",
                                            section: "studentEducationRecords",
                                            studentIndex,
                                            studentEducationIndex
                                          });
                                        }}

                                        />
                                      
                                      
                                      
                                    </FormField>
                                  </FormRow>

                                  <FormRow>
                                    <FormField>
                                      {this.getLabel('studentRecords.educationRecords.transcriptFile')}
                                      <input disabled style={{display: "none"}} type="text" data-name="transcriptFileId" data-section="studentEducationRecords" data-student-index={studentIndex} data-student-education-index={studentEducationIndex} value={_.isEmpty(educationRecord['transcriptFileId']) ? "" : educationRecord['transcriptFileId']} />
                                      <FilePond
                                        allowMultiple={false}
                                        {...this.translate('filepond')}

                                        acceptedFileTypes="image/png, image/jpeg, application/pdf, application/zip"
                                        labelFileTypeNotAllowed={this.translate('studentRecords.educationRecords.transcriptFileType')}
                                        allowFileSizeValidation={true}
                                        maxTotalFileSize="100MB"
                                        ref={ref => this.pondRefs.transcripts[`${studentIndex}-${studentEducationIndex}`] = ref}
                                        
                                        server={filepondServer}
                                        onprocessfileabort={(file)=>{this.onPendingUploads(false)}}
                                        onprocessfilestart={(file)=>{this.onPendingUploads()}}
                                        onremovefile={(file)=>{
                                          // console.log('onremovefile', file);
                                          this.onPendingUploads(false);
                                          this.onFilepondChange(file, {
                                            name: "transcriptFileId",
                                            section: "studentEducationRecords",
                                            studentIndex,
                                            studentEducationIndex
                                          });
                                        }}
                                        onprocessfile={(error, file)=>{
                                          // console.log('onprocessfile', file, file.serverId);
                                          this.onPendingUploads(false);
                                          this.onFilepondChange(file, {
                                            name: "transcriptFileId",
                                            section: "studentEducationRecords",
                                            studentIndex,
                                            studentEducationIndex
                                          });
                                        }}

                                        />
                                      
                                      
                                      
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
                          {/* console.log('projectRecord', projectRecord); */}
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





                            <FormRow>
                              <FormField>
                                {this.getLabel('projectRecords.whitepaperFile')}
                                <input disabled style={{display: "none"}} type="text" data-name="whitepaperFileId" data-section="projectRecords" data-project-index={projectIndex} value={_.isEmpty(projectRecord['whitepaperFileId']) ? "" : projectRecord['whitepaperFileId']} />
                                <FilePond
                                  allowMultiple={false}
                                  {...this.translate('filepond')}

                                  acceptedFileTypes="application/pdf, application/zip"
                                  labelFileTypeNotAllowed={this.translate('projectRecords.whitepaperFileType')}
                                  allowFileSizeValidation={true}
                                  maxTotalFileSize="500MB"
                                  
                                  
                                  server={filepondServer}
                                  onprocessfileabort={(file)=>{this.onPendingUploads(false)}}
                                  onprocessfilestart={(file)=>{this.onPendingUploads()}}
                                  onremovefile={(file)=>{
                                    // console.log('onremovefile', file);
                                    this.onPendingUploads(false);
                                    this.onFilepondChange(file, {
                                      name: "whitepaperFileId",
                                      section: "projectRecords",
                                      projectIndex
                                    });
                                  }}
                                  onprocessfile={(error, file)=>{
                                    // console.log('onprocessfile', file, file.serverId);
                                    this.onPendingUploads(false);
                                    this.onFilepondChange(file, {
                                      name: "whitepaperFileId",
                                      section: "projectRecords",
                                      projectIndex
                                    });
                                  }}

                                  />
                                
                                
                                
                              </FormField>

                              
                            </FormRow>

                            {(projectRecord.whitepaperFileIds && projectRecord.whitepaperFileIds.length > 0) && 
                              <FormRow>
                                <FormField>
                                  {this.getLabel('projectRecords.whitepaperSubmitted')}
                                  <div>
                                    <ol>
                                      {
                                        projectRecord.whitepaperFileIds.slice().reverse().map((dropfile, index)=>{
                                          return <li key={index}><a target="_blank" href={`${process.env.FILEPOND_API_URL}${process.env.FILEPOND_API_ENDPOINT}${process.env.FILEPOND_API_URL}${process.env.FILEPOND_API_ENDPOINT}${dropfile.fileId}`}>{getFilenameFromFileId(dropfile.fileId)}</a> {dropfile.receivedAt && <span>- {moment(dropfile.receivedAt).fromNow()}</span>}</li>
                                        })
                                      }
                                    </ol>
                                  </div>
                                </FormField>
                              </FormRow>
                            }
                            


                            {/* <FormRow>
                              <FormField>
                                {this.getLabel('projectRecords.presentationFile')}
                                <input disabled style={{display: "none"}} type="text" data-name="presentationFileId" data-section="projectRecords" data-project-index={projectIndex} value={_.isEmpty(projectRecord['presentationFileId']) ? "" : projectRecord['presentationFileId']} />
                                <FilePond
                                  allowMultiple={false}
                                  {...this.translate('filepond')}

                                  acceptedFileTypes="application/pdf, application/zip"
                                  labelFileTypeNotAllowed={this.translate('projectRecords.presentationFileType')}
                                  allowFileSizeValidation={true}
                                  maxTotalFileSize="500MB"
                                  
                                  
                                  server={filepondServer}
                                  onprocessfileabort={(file)=>{this.onPendingUploads(false)}}
                                  onprocessfilestart={(file)=>{this.onPendingUploads()}}
                                  onremovefile={(file)=>{
                                    // console.log('onremovefile', file);
                                    this.onPendingUploads(false);
                                    this.onFilepondChange(file, {
                                      name: "presentationFileId",
                                      section: "projectRecords",
                                      projectIndex
                                    });
                                  }}
                                  onprocessfile={(error, file)=>{
                                    // console.log('onprocessfile', file, file.serverId);
                                    this.onPendingUploads(false);
                                    this.onFilepondChange(file, {
                                      name: "presentationFileId",
                                      section: "projectRecords",
                                      projectIndex
                                    });
                                  }}

                                  />
                                
                                
                                
                              </FormField>

                              
                            </FormRow> */}



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
                          {this.state.hasValidToken !== true &&
                            <button className={classNames({
                              disabled: this.state.pendingUploads > 0 ||this.state.recordIsValid !== true || this.state.isEditorMutating === true
                            })} disabled={this.state.pendingUploads > 0 || !this.state.recordIsValid || this.state.isEditorMutating === true} onClick={() => {
                              this.onCreateApplication(mutate)
                            }}>
                              {
                                !this.state.isEditorMutating ? 
                                  this.translate('submit') :
                                  <><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></>
                              }
                            </button>
                          }

                          {this.state.hasValidToken === true &&
                            <button className={classNames({
                              disabled: this.state.pendingUploads > 0 ||this.state.recordIsValid !== true || this.state.isEditorMutating === true
                            })} disabled={this.state.pendingUploads > 0 || !this.state.recordIsValid || this.state.isEditorMutating === true} onClick={() => {
                              this.onUpdateApplication(mutate)
                            }}>
                              {
                                !this.state.isEditorMutating ? 
                                  this.translate('update') :
                                  <><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></>
                              }
                            </button>
                          }
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
