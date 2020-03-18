import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import PropertyDetail from './PropertyDetail/PropertyDetail';
import PropertyMaster from './PropertyMaster/PropertyMaster';
import './PropertyView.scss';

function PropertyView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { PropertyMaster, PropertyDetail };

export default withRouter(PropertyView);