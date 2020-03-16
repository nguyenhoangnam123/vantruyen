import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import SiteDetail from './SiteDetail/SiteDetail';
import SiteMaster from './SiteMaster/SiteMaster';
import './SiteView.scss';

function SiteView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { SiteMaster, SiteDetail };

export default withRouter(SiteView);