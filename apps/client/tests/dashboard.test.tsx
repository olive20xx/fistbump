// @vitest-environment node

import { render, screen } from '@testing-library/react'
import Dashboard from '../app/dashboard/page'
import { queries } from '@/lib/graphql-queries'
import { MockedProvider } from '@apollo/client/testing'
import { vi, expect } from 'vitest'


let mockedGet = vi.fn(() => ({ value: "Olga Dev" }))

vi.mock("next/headers", async () => {
  const actual = await vi.importActual("next/headers") as any;
  return {
    ...actual,
    cookies: vi.fn(() => ({
      get: mockedGet
    }))
  };
});

describe.only('Dashboard', async () => {
  it('renders user list when logged in', () => {
    //   const getUsersMock = {
    //     request: {
    //       query: queries.GET_USERS,
    //     },
    //     result: {
    //       data: {
    //         getUsers: [
    //           {
    //             _id: '123',
    //             title: 'Product Manager',
    //             fullName: 'Muto Otum',
    //             teamName: 'Product',
    //           },
    //           {
    //             _id: '234',
    //             title: 'Product Manager',
    //             fullName: 'Craig Giarc',
    //             teamName: 'Product',
    //           },
    //         ],
    //       },
    //     },
    //   }

    //   render(
    //     <MockedProvider mocks={[getUsersMock]} addTypename={false}>
    //       <Dashboard />
    //     </MockedProvider>

    //   );
    //   expect(screen.getByText('List of the users')).toBeDefined()
    //   expect(screen.getByText(`Hello Olga`)).toBeDefined()
    //   expect(screen.getByText('Log out')).toBeDefined()
    //   expect(screen.getByText('Title')).toBeDefined()
    //   expect(screen.getByText('Full Name')).toBeDefined()
    //   expect(screen.getByText('Team Name')).toBeDefined()
    //   expect(screen.getByText('Product Manager')).toBeDefined()
    //   expect(screen.getByText('Muto Otum')).toBeDefined()
    //   expect(screen.getByText('Craig Giarc')).toBeDefined()
    //   expect(screen.getByText('Product')).toBeDefined()
  })
})