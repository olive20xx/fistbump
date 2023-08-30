// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { SignInForm } from '../app/login/page';
// import { vi } from 'vitest'


// vi.mock('@/lib/fetch', () => ({
//   getUserByEmail: vi.fn().mockResolvedValue({ fullName: 'Muto Otum' }),
// }));

// vi.mock('cookies-next', () => ({
//   setCookie: vi.fn(),
// }));

// vi.mock('next/router', () => ({
//   useRouter: () => ({ push: vi.fn() }),
// }));

// describe('SignInForm', () => {
//   it('renders form fields and submit button', async () => {
//     render(<SignInForm />);

//     expect(screen.getByLabelText('Email')).toBeInTheDocument();
//     expect(screen.getByLabelText('Password')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
//   });

// it('submits form with valid data', async () => {
//   render(<SignInForm />);

//   const emailInput = screen.getByLabelText('Email')
//   const passwordInput = screen.getByLabelText('Password');
//   const signInButton = screen.getByRole('button', { name: 'Sign in' });

//   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//   fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
//   fireEvent.click(signInButton);

//   await screen.findByText('WELCOME Muto Otum');

//   expect(require('cookies-next').setCookie).toHaveBeenCalledWith('user', 'Muto Otum');
//   expect(require('next/router').useRouter().push).toHaveBeenCalledWith('/dashboard');
// });

// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignInForm } from '../app/login/page';
import { MockedProvider } from '@apollo/client/testing';
import { queries } from '@/lib/graphql-queries';
import { vi } from 'vitest'

vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    }))
  };
});


describe('SignInForm', () => {
  it('renders form fields and submit button', async () => {
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
    console.log(mockGetUserByEmail)
    render(
      <MockedProvider mocks={[mockGetUserByEmail]} addTypename={false}>
        <SignInForm />
      </MockedProvider>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'olga@arol.dev' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '321' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(screen.getByText('WELCOME Olga Dev')).toBeInTheDocument();
    });
  });
});
