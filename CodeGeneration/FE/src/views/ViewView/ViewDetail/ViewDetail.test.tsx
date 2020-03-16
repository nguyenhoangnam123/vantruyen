import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ViewDetail from './ViewDetail';

describe('ViewDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <ViewDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});