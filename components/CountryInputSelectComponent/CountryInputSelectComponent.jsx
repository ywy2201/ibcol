import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';





import styled from 'styled-components';


import translate from 'helpers/translate.js';


const countryCodes = require('country-list')().getCodes();

// const CountryInputSelectComponent = styled.div`
//   display: block;
//   ${'' /* margin-bottom: 4rem; */}
// `;

// const pagePadding = {
//   xSmall: style.dimension.normal.pagePadding.xSmall,
//   small: style.dimension.normal.pagePadding.small,
//   medium: style.dimension.normal.pagePadding.medium,
//   large: style.dimension.normal.pagePadding.large,
//   xLarge: style.dimension.normal.pagePadding.xLarge,
//   xxLarge: style.dimension.normal.pagePadding.xxLarge
// }





class CountryInputSelectComponent extends React.PureComponent {

  translate = (t, locale = this.props.locale) => translate(t, '_global', locale, {
    "countries": true
  });

  // componentWillReceiveProps = (nextProps) => {

  //   // console.log('componentWillReceiveProps', nextProps);

  //   if (this.props.router.route !== nextProps.router.route) {
  //     // this.toggleMenu(false);
  //   }
  // }
  
 
  

  render() {
    const componentName = "CountryInputSelectComponent";



    // const locale = this.props.locale;

    // const { activeClassName, className, children, router, href, ...props } = this.props;

    // console.log("????")

    return (
      <select className={componentName}
        data-name={this.props.dataName} 
        data-section={this.props.dataSection} 
        data-student-index={this.props.dataStudentIndex} 
        data-student-education-index={this.props.dataStudentEducationIndex} 
        data-advisor-index={this.props.dataAdvisorIndex} 
        data-advisor-association-index={this.props.dataAdvisorAssociationIndex}
        onChange={this.props.onChange} 
        onFocus={this.props.onFocus} 
        onBlur={this.props.onBlur}
        value={this.props.value} 
      >
        <option value=""></option>
        {
          countryCodes.map((code, index) => {
            return <option value={code} key={code}>{this.translate(code)}</option>
          })
        }
      </select>
    );
  }
}


CountryInputSelectComponent.propTypes = {
  locale: PropTypes.string.isRequired,
  dataName: PropTypes.string.isRequired,
  dataSection: PropTypes.string.isRequired,
  dataStudentIndex: PropTypes.number,
  dataStudentEducationIndex: PropTypes.number,
  dataAdvisorIndex: PropTypes.number,
  dataAdvisorAssociationIndex: PropTypes.number,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string
}

CountryInputSelectComponent.defaultProps = {
  value: ""
}


export default CountryInputSelectComponent;