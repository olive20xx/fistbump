import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { cookies } from 'next/headers';
import Dashboard, { fetchCache } from '../app/dashboard/page';
import { queries } from '@/lib/graphql-queries';
import { vi } from 'vitest'

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => ({ value: 'Muto Otum' })),
  })),
}));


const mockUsersData = {
  data: {
    getUsers: [
      {
        title: 'Software Engineer',
        fullName: 'Muto Otum',
        teamName: 'Engineering',
      },
      {
        title: 'Software Engineer',
        fullName: 'Craig Giarc',
        teamName: 'Engineering',
      },
      {
        title: 'Software Engineer',
        fullName: 'Rita Atir',
        teamName: 'Engineering',
      },
      {
        title: 'Software Engineer',
        fullName: 'Herva Avreh',
        teamName: 'Engineering',
      },
    ],
  },
};

const mocks = [
  {
    request: {
      query: queries.GET_USERS,
    },
    result: mockUsersData,
  },
];

describe('Dashboard', () => {
  it('renders user details and log in button', async () => {
    //   render(
    //     <MockedProvider mocks={mocks} addTypename={false}>
    //       <Dashboard />
    //     </MockedProvider>
    // );

    //   await waitFor(() => {
    //     screen.getByText('Software Engineer');
    //     screen.getByText('Muto Otum');
    //     screen.getByText('Engineering');
    //   });
    //   await waitFor(() => {
    //     screen.getByText('Software Engineer');
    //     screen.getByText('Craig Giarc');
    //     screen.getByText('Engineering');
    //   });
    //   await waitFor(() => {
    //     screen.getByText('Software Engineer');
    //     screen.getByText('Rita Atir');
    //     screen.getByText('Engineering');
    //   });
    //   await waitFor(() => {
    //     screen.getByText('Software Engineer');
    //     screen.getByText('Herva Avreh');
    //     screen.getByText('Engineering');
    //   });

    //   expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });
});
