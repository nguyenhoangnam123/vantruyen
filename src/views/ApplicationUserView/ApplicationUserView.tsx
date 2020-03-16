import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import ApplicationUserDetail from './ApplicationUserDetail/ApplicationUserDetail';
import ApplicationUserMaster from './ApplicationUserMaster/ApplicationUserMaster';
import './ApplicationUserView.scss';

function ApplicationUserView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export {ApplicationUserMaster, ApplicationUserDetail};

export default withRouter(ApplicationUserView);
