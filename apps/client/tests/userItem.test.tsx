import React from 'react'
import { render, screen } from '@testing-library/react'
import UserItem from '../components/table/UserItem'
import { MockedProvider } from '@apollo/client/testing'
import { queries } from '@/lib/graphql-queries'

describe('UserItem', () => {
  it('renders user details and "View my report" button for logged user', async () => {
    const mockUser = {
      request: {
        query: queries.GET_USER_BY_ID,
        variables: { _id: '456' },
      },
      result: {
        data: {
          getUserById: {
            _id: '456',
            title: 'Product Manager',
            fullName: 'Olga Dev',
            teamName: 'Product',
          },
        },
      },
    }
    render(
      <MockedProvider mocks={[mockUser]} addTypename={false}>
        <UserItem
          loggedUser="Olga Dev"
          user={{
            _id: '456',
            title: 'Product Manager',
            fullName: 'Olga Dev',
            teamName: 'Product',
          }}
        />
      </MockedProvider>
    )
    expect(screen.getByText('Product Manager')).toBeDefined()
    expect(screen.getByText('Olga Dev')).toBeDefined()
    expect(screen.getByText('Product')).toBeDefined()
    expect(screen.getByRole('button', { name: 'View my report' })).toBeDefined()
  })
  it('renders user details and "Nominate peer" button for other users', async () => {
    const mockUser = {
      request: {
        query: queries.GET_USER_BY_ID,
        variables: { _id: '456' },
      },
      result: {
        data: {
          getUserById: {
            _id: '456',
            title: 'Product Manager',
            fullName: 'Muto Atom',
            teamName: 'Product',
          },
        },
      },
    }
    render(
      <MockedProvider mocks={[mockUser]} addTypename={false}>
        <UserItem
          loggedUser="Olga Dev"
          user={{
            _id: '456',
            title: 'Product Manager',
            fullName: 'Muto Atom',
            teamName: 'Product',
          }}
        />
      </MockedProvider>
    )
    expect(screen.getByText('Product Manager')).toBeDefined()
    expect(screen.getByText('Muto Atom')).toBeDefined()
    expect(screen.getByText('Product')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Nominate peer' })).toBeDefined()
  })
})
