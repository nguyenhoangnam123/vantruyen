import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import StoreLevelMaster from './StoreLevelMaster';

describe('StoreLevelMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <StoreLevelMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});