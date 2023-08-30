import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserItem from '../components/table/UserItem';


jest.mock('next/link', () => ({ children }) => children);

describe('UserItem', () => {
  it('renders user details correctly', () => {

    const user = {
      title: 'Software Engineer',
      fullName: 'Muto Otum',
      teamName: 'Engineering',
      _id: '123456',
    };
    render(<UserItem loggedUser="Muto Otum" user={user} />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Muto Otum')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('renders "View my report" button for the logged-in user', () => {
    const user = {
      title: 'Software Engineer',
      fullName: 'Muto Otum',
      teamName: 'Engineering',
      _id: '123456',
    };

    render(<UserItem loggedUser="Muto Otum" user={user} />);

    const viewReportButton = screen.getByRole('button', { name: 'View my report' });
    expect(viewReportButton).toBeInTheDocument();
    userEvent.click(viewReportButton);
    expect(screen.getByRole('link', { name: 'View my report' })).toHaveAttribute(
      'href',
      `/employee/${user._id}/report/131313`
    );
  });
});
