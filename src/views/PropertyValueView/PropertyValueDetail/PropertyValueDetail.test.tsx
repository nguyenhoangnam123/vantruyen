import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PropertyValueDetail from './PropertyValueDetail';

describe('PropertyValueDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PropertyValueDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});