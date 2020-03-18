import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import ViewDetail from './ViewDetail/ViewDetail';
import ViewMaster from './ViewMaster/ViewMaster';
import './ViewView.scss';

function ViewView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { ViewMaster, ViewDetail };

export default withRouter(ViewView);