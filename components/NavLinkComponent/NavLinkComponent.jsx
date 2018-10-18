import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import routes, {Link} from '/routes';
import { withRouter } from 'next/router';



class NavLinkComponent extends React.Component {

  render() {
    const componentName = "NavLinkComponent";

    const { activeClassName, className, children, prefetch, router, target, onClick, params, ...props } = this.props;

    // console.log('routes.findAndGetUrls(props.route, props.params).urls.as', routes.findAndGetUrls(props.route, props.params).urls.as);

    // console.log('router.asPath', router.asPath);

    
    const isActiveRoute = (props.route === undefined) ? false : routes.findAndGetUrls(props.route, params).urls.as === router.asPath;
    // const isActiveRoute = false;

    // console.log('prefetch', prefetch);

    // console.debug('this.props', this.props);


    return (
      <Link prefetch={prefetch} params={params} {...props}>
        <a
          className={classNames(componentName, className, {
            [`${activeClassName}`]: isActiveRoute
          })}
        
          {...props}

          target={target}
          onClick={onClick}
        >
          {children}
        </a>
      </Link>
    )

  }



}


NavLinkComponent.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  params: PropTypes.object
}

NavLinkComponent.defaultProps = {
  activeClassName: "active"
}

export default withRouter(NavLinkComponent);
