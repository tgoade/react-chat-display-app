import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Display from './Display';


describe('Test suit for the Display component', () => {
    test('to check if test data loads', async () => {
        render(<Display />);
        const postElements = await screen.findAllByLabelText('post');
        expect(postElements).not.toHaveLength(0);  
    });   
    test('to check if title is rendering', () => {
        render(<Display />);
        const title = screen.getByText(/ichat/i);
        expect(title).toBeInTheDocument();
    });
    test('to check if list is sorted newest first when that option is selected', async () => {
        render(<Display />);
        userEvent.selectOptions(screen.getByTestId('select-btn'), ['desc']);
        const recentData = await screen.findByText(/mon, July 12, 2021 at 5:50 pm pdt/i);
        expect(screen.getByTestId('select-desc').selected).toBe(true);
        expect(screen.getByTestId('select-asc').selected).toBe(false);
        expect(recentData).toBeInTheDocument();
    });
    test('to check if message gets deleted when icon is clicked', () => {
        render(<Display />);
        const deleteIcon = screen.getByLabelText(/delete button 1/i);
        userEvent.click(deleteIcon);
        const secondPost = screen.queryByText(/use the redundant/i);
        expect(secondPost).not.toBeInTheDocument();
    });
});