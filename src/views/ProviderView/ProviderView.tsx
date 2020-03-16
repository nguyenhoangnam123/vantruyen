import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import ProviderDetail from './ProviderDetail/ProviderDetail';
import ProviderMaster from './ProviderMaster/ProviderMaster';
import './ProviderView.scss';

function ProviderView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export {ProviderMaster, ProviderDetail};

export default withRouter(ProviderView);
