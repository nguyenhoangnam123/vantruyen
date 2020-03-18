import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PropertyTypeMaster from './PropertyTypeMaster';

describe('PropertyTypeMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PropertyTypeMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});