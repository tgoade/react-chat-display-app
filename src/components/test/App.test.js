import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Display from '../Display';


describe('Test suit for the app', () => {
    test('to check if data loads', async () => {
        render(<Display />);
        const postElements = await screen.findAllByLabelText('post');
        expect(postElements).not.toHaveLength(0);  
    });   
    test('to check if title is rendering', () => {
        render(<Display />);
        const title = screen.getByRole('heading', {level: 1});
        expect(title).toBeInTheDocument();
    });
    test('to check if list is sorted by newest first when that option is selected', async () => {
        render(<Display />);
        userEvent.selectOptions(screen.getByTestId('select-btn'), ['desc']);
        expect(screen.getByTestId('select-desc').selected).toBe(true);
        expect(screen.getByTestId('select-asc').selected).toBe(false);
    });
    test('to check if list is sorted by oldest first when that option is selected', async () => {
        render(<Display />);
        userEvent.selectOptions(screen.getByTestId('select-btn'), ['asc']);
        expect(screen.getByTestId('select-desc').selected).toBe(false);
        expect(screen.getByTestId('select-asc').selected).toBe(true);
    });
    test('to check if the content, senderUuid, and sentAt are rendered', async () => {
        render(<Display />);
        const recentDate = await screen.findByText(/mon, July 12, 2021 at 5:50 pm pdt/i);
        const recentMessage = await screen.findByText(/try to connect the smtp feed/i);
        const recentSender = await screen.findByLabelText(/user 1 id/i);
        expect(recentDate).toBeInTheDocument();
        expect(recentMessage).toBeInTheDocument();
        expect(recentSender).toBeInTheDocument();
    });
    test('to check if message gets deleted when icon is clicked', () => {
        render(<Display />);
        const deleteIcon = screen.getByLabelText(/delete button 1/i);
        userEvent.click(deleteIcon);
        const secondPost = screen.queryByText(/use the redundant/i);
        expect(secondPost).not.toBeInTheDocument();
    });
    test('to check if there are 5 messages per page', async () => {
        render(<Display />);
        const pageMessages = await screen.findAllByLabelText(/post/i);
        expect(pageMessages).toHaveLength(5);
    })
    test('to check if the oldest message is rendered on the last page when page number is clicked', async () => {
        render(<Display />);
        const lastPage = await screen.findByLabelText(/page 9/i);
        userEvent.click(lastPage);
        const lastMessage = await screen.findByText(/mon, August 3, 2020/i);
        expect(lastMessage).toBeInTheDocument();
    });
});