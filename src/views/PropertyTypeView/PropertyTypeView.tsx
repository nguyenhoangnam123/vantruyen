import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import PropertyTypeDetail from './PropertyTypeDetail/PropertyTypeDetail';
import PropertyTypeMaster from './PropertyTypeMaster/PropertyTypeMaster';
import './PropertyTypeView.scss';

function PropertyTypeView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { PropertyTypeMaster, PropertyTypeDetail };

export default withRouter(PropertyTypeView);