import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import ProductGroupingDetail from './ProductGroupingDetail/ProductGroupingDetail';
import ProductGroupingMaster from './ProductGroupingMaster/ProductGroupingMaster';
import './ProductGroupingView.scss';

function ProductGroupingView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { ProductGroupingMaster, ProductGroupingDetail };

export default withRouter(ProductGroupingView);