import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PropertyMaster from './PropertyMaster';

describe('PropertyMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PropertyMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});