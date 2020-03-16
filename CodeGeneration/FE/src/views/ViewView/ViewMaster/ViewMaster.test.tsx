import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ViewMaster from './ViewMaster';

describe('ViewMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <ViewMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});