import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import OrganizationDetail from './OrganizationDetail/OrganizationDetail';
import OrganizationMaster from './OrganizationMaster/OrganizationMaster';
import './OrganizationView.scss';

function OrganizationView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { OrganizationMaster, OrganizationDetail };

export default withRouter(OrganizationView);