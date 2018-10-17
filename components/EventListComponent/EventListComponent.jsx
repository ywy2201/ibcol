import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import EventCardComponent from 'components/EventCardComponent';

// import Link from 'next/link';
// import { withRouter } from 'next/router';


// import { A } from 'components/BaseComponents';


const EventsContainerDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;


class EventListComponent extends React.Component {

  render() {
    const componentName = "EventListComponent";




    


    // const { activeClassName, className, children, router, href, ...props } = this.props;


    return (
      <EventsContainerDiv>
        <EventCardComponent title="“Constructed by Chance” Solo Exhibition" date="Jun 2 - 30 2018" location="Silverlens" img="/static/images/event_sample_1.jpg"></EventCardComponent>
        <EventCardComponent title="ICP MUSEUM TO OPEN FOUR EXHIBITIONS IN MAY 2018" date="Jun 2 - 30 2018" location="ICP Museum" img="/static/images/event_sample_2.jpg"></EventCardComponent>
        <EventCardComponent title="DIASPORA: Exit, Exile, Exodus of Southeast Asia" location="Silverlens" img="/static/images/event_sample_3.jpg" date="Mar 4 - Oct 1 2018"></EventCardComponent>
        <EventCardComponent title="Et id aute quis commodo ex id dolore Lorem occaecat" location="City U" date="Apr 22 2018" img="/static/images/event_sample_4.jpg"></EventCardComponent>
        <EventCardComponent title="Cillum ad ex ut commodo quis irure do sunt Lorem labore proident cupidatat laborum" location="Hong Kong Expo" date="Apr 22 2018" img="/static/images/event_sample_2.jpg"></EventCardComponent>
        <EventCardComponent title="Pariatur Lorem aliqua qui veniam laboris veniam nostrud consectetur ipsum" location="Australian Museum" date="Apr 22 2018" img="/static/images/event_sample_1.jpg"></EventCardComponent>
        <EventCardComponent title="Quis pariatur exercitation aliqua est aliquip" location="Exodus Gallery" date="Apr 22 2018" img="/static/images/event_sample_3.jpg"></EventCardComponent>
        <EventCardComponent title="Incididunt anim labore tempor minim id aliqua mollit cupidatat cillum ullamco et" location="" date="Apr 22 2018" img="/static/images/event_sample_4.jpg"></EventCardComponent>
        <EventCardComponent title="Est sint incididunt dolor ad" location="Untilted" date="Apr 22 2018" img="/static/images/event_sample_1.jpg"></EventCardComponent>
        <EventCardComponent title="Laboris consectetur sit voluptate veniam qui irure" location="Monster Inc." date="Apr 22 2018" img="/static/images/event_sample_3.jpg"></EventCardComponent>
        <EventCardComponent title="Exercitation eiusmod velit incididunt et eiusmod aliqua et amet proident" location="" date="Apr 22 2018" img="/static/images/event_sample_2.jpg"></EventCardComponent>
      </EventsContainerDiv>
    )
  }



}


EventListComponent.propTypes = {
  // activeClassName: PropTypes.string.isRequired,
}

EventListComponent.defaultProps = {
  // activeClassName: "active"
}

// export default withRouter(EventListComponent);
export default EventListComponent;
