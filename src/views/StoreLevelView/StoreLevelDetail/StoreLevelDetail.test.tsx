import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import StoreLevelDetail from './StoreLevelDetail';

describe('StoreLevelDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <StoreLevelDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});