import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PropertyTypeDetail from './PropertyTypeDetail';

describe('PropertyTypeDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PropertyTypeDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});