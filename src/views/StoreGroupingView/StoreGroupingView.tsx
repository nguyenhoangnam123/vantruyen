import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import StoreGroupingDetail from './StoreGroupingDetail/StoreGroupingDetail';
import StoreGroupingMaster from './StoreGroupingMaster/StoreGroupingMaster';
import './StoreGroupingView.scss';

function StoreGroupingView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { StoreGroupingMaster, StoreGroupingDetail };

export default withRouter(StoreGroupingView);