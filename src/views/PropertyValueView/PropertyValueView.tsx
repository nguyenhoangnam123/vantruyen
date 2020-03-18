import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import PropertyValueDetail from './PropertyValueDetail/PropertyValueDetail';
import PropertyValueMaster from './PropertyValueMaster/PropertyValueMaster';
import './PropertyValueView.scss';

function PropertyValueView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { PropertyValueMaster, PropertyValueDetail };

export default withRouter(PropertyValueView);