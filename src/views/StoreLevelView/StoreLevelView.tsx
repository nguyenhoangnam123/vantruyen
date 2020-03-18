import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import StoreLevelDetail from './StoreLevelDetail/StoreLevelDetail';
import StoreLevelMaster from './StoreLevelMaster/StoreLevelMaster';
import './StoreLevelView.scss';

function StoreLevelView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { StoreLevelMaster, StoreLevelDetail };

export default withRouter(StoreLevelView);