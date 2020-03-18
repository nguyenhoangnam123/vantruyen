import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PropertyDetail from './PropertyDetail';

describe('PropertyDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PropertyDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});