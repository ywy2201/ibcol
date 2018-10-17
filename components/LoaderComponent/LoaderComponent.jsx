import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import theme from 'styled-theming';

// import { media, style } from 'helpers/styledComponents.js';
// import { transparentize } from 'polished';


// import { A } from 'components/BaseComponents';
// const pagePadding = {
//   xSmall: theme("spacing", { normal: style.dimension.normal.pagePadding.xSmall }),
//   small: theme("spacing", { normal: style.dimension.normal.pagePadding.small }),
//   medium: theme("spacing", { normal: style.dimension.normal.pagePadding.medium }),
//   large: theme("spacing", { normal: style.dimension.normal.pagePadding.large }),
//   xLarge: theme("spacing", { normal: style.dimension.normal.pagePadding.xLarge }),
//   xxLarge: theme("spacing", { normal: style.dimension.normal.pagePadding.xxLarge })
// }



const LoaderBlockContainer = styled.div`
  
  
  

`;


class LoaderComponent extends React.Component {

  render() {
    const componentName = "LoaderComponent";







    // const { activeClassName, className, children, router, href, ...props } = this.props;


    return (
      <LoaderBlockContainer id="preloader" className={classNames(componentName, this.props.className)}>
        
        <div id="loader" className="dots-jump">
          <div></div>
          <div></div>
          <div></div>
        </div>
      
      </LoaderBlockContainer>
    )
  }



}


LoaderComponent.propTypes = {
  // activeClassName: PropTypes.string.isRequired,
}

LoaderComponent.defaultProps = {
  // activeClassName: "active"
}

// export default withRouter(EventListComponent);
export default LoaderComponent;
