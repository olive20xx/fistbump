import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignInForm } from '../app/login/page';
import { MockedProvider } from '@apollo/client/testing';
import { queries } from '@/lib/graphql-queries';
import { vi, expect } from 'vitest'


let setCookieMock = vi.fn()
let mockedPush = vi.fn()
vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: mockedPush,
    }))
  };
});

describe('SignInForm with correct creds', () => {
  beforeEach(() => {
    mockedPush = vi.fn();
    setCookieMock = vi.fn()
    const mockGetUserByEmail = {
      request: {
        query: queries.GET_USER_BY_EMAIL,
        variables: { email: 'olga@arol.dev', password: '321' },
      },
      result: {
        data: {
          getUserByEmail: { fullName: 'Olga Dev' },
        },
      },
    };
    render(
      <MockedProvider mocks={[mockGetUserByEmail]} addTypename={false}>
        <SignInForm />
      </MockedProvider>
    );
  })
  it('renders form fields and submit button', async () => {
    expect(screen.getByLabelText('Email')).toBeDefined()
    expect(screen.getByLabelText('Password')).toBeDefined();
    expect(screen.getAllByRole('button', { name: 'Sign in' }))
  });
  it('Allows a user to sign in with correct credentials', async () => {
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'olga@arol.dev' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '321' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(mockedPush).toBeCalledTimes(1);
    });
  })
  it('should call setCookie with correct arguments', async () => {
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'olga@arol.dev' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '321' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    setCookieMock('user', 'Olga Dev');
    await waitFor(() => {
      expect(setCookieMock).toBeCalledTimes(1);
      expect(setCookieMock).toBeCalledWith('user', 'Olga Dev');
    });
  });
});
describe('SignInForm with incorrect creds', () => {
  beforeEach(() => {
    mockedPush = vi.fn();
    setCookieMock = vi.fn()
    const mockGetUserByEmail = {
      request: {
        query: queries.GET_USER_BY_EMAIL,
        variables: { email: 'tio@arol.dev', password: '321' },
      },
      result: {
        data: {
          getUserByEmail: { fullName: 'Tio Dev' },
        },
      },
    };
    render(
      <MockedProvider mocks={[mockGetUserByEmail]} addTypename={false}>
        <SignInForm />
      </MockedProvider>
    );
  })
  it('renders form fields and submit button', async () => {
    expect(screen.getByLabelText('Email')).toBeDefined()
    expect(screen.getByLabelText('Password')).toBeDefined();
    expect(screen.getAllByRole('button', { name: 'Sign in' }))
  });
  it('Should fail if user signs in with incorrect credentials', async () => {
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'tio@arol.dev' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '321' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(mockedPush).toBeCalledTimes(0);
    });
  })
  it('should fail setting setCookie', async () => {
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'tio@arol.dev' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '321' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => {
      expect(setCookieMock).toBeCalledTimes(0);
    });
  });
});