import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PropertyValueMaster from './PropertyValueMaster';

describe('PropertyValueMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PropertyValueMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});