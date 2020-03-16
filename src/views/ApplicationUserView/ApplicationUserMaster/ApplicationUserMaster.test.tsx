import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ApplicationUserMaster from './ApplicationUserMaster';

describe('ApplicationUserMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <ApplicationUserMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});