import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ApplicationUserDetail from './ApplicationUserDetail';

describe('ApplicationUserDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <ApplicationUserDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});