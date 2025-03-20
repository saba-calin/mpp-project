import HomeNavbar from "../layout/HomeNavbar.jsx";
import AddUserNavbar from "../layout/AddUserNavbar.jsx";
import AddUser from "../pages/AddUser.jsx";
import EditUser from "../pages/EditUser.jsx";
import {getId} from "../pages/AddUser.jsx";
import {render, screen, fireEvent} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

describe("HomeNavbar Component", () => {
    test("render the HomeNavbar", () => {
       render(
           <MemoryRouter>
               <HomeNavbar />
           </MemoryRouter>
       );

       expect(screen.getByText("Student Management App")).toBeInTheDocument();
       expect(screen.getByRole("link", {name: /Add Student/i})).toBeInTheDocument();
    });
})

describe("AddUserNavbar Component", () => {
    test("render the AddUserNavbar", () => {
        render(
            <MemoryRouter>
                <AddUserNavbar />
            </MemoryRouter>
        );

        expect(screen.getByText("Student Management App")).toBeInTheDocument();
    });
})

describe("AddUser Component", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.spyOn(window, 'alert').mockImplementation(() => {});
    });

    test("render the AddUser", () => {
        render(
            <MemoryRouter>
                <AddUser />
            </MemoryRouter>
        );
    })

    test('should return 1 when there are no students in localStorage', () => {
        localStorage.setItem('students', JSON.stringify([]));
        expect(getId()).toBe(1);
    });

    test('should return the next highest ID when students exist', () => {
        localStorage.setItem('students', JSON.stringify([
            { id: "1" },
            { id: "2" },
            { id: "5" }
        ]));
        expect(getId()).toBe(6);
    });

    test('should show an alert if first name is empty', () => {
        render(
            <MemoryRouter>
                <AddUser />
            </MemoryRouter>
        );

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("The 'First Name' field cannot be empty");
    });

    test('should show an alert if last name is invalid', () => {
        render(
            <MemoryRouter>
                <AddUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: '' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '3' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '5' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("The 'Last Name' field cannot be empty");
    });

    test('should show an alert if email is invalid', () => {
        render(
            <MemoryRouter>
                <AddUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'erw' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: '' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '3' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '5' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("The 'Email' field cannot be empty");
    });

    test('should show an alert if age is invalid', () => {
        render(
            <MemoryRouter>
                <AddUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'erw' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'asdf@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '5' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("The 'Age' field cannot be empty");
    });

    test('should show an alert if age is invalid', () => {
        render(
            <MemoryRouter>
                <AddUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'erw' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'asdf@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '23154' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '5' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("Invalid age");
    });

    test('should show an alert if grade is invalid', () => {
        render(
            <MemoryRouter>
                <AddUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'erw' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'asdf@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '23' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("The 'Grade' field cannot be empty");
    });

    test('should show an alert if grade is invalid', () => {
        render(
            <MemoryRouter>
                <AddUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'erw' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'asdf@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '23' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '101' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("Invalid grade");
    });

    test('should show an alert if student is added', () => {
        render(
            <MemoryRouter>
                <AddUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'erw' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'asdf@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '23' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '10' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("Student added successfully");
    });
})

describe("EditUser Component", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.spyOn(window, 'alert').mockImplementation(() => {});
    });

    test("render the EditUser with no students", () => {
        render(
            <MemoryRouter>
                <EditUser />
            </MemoryRouter>
        );
    });

    test("render the EditUser with students", () => {
        localStorage.setItem('students', JSON.stringify([
            { id: "1" },
        ]));

        render(
            <MemoryRouter>
                <EditUser />
            </MemoryRouter>
        );
    });

    test('should show an alert if first name is empty', () => {
        render(
            <MemoryRouter>
                <EditUser />
            </MemoryRouter>
        );

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("The 'First Name' field cannot be empty");
    });

    test('should show an alert if last name is invalid', () => {
        render(
            <MemoryRouter>
                <EditUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: '' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '3' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '5' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("The 'Last Name' field cannot be empty");
    });

    test('should show an alert if email is invalid', () => {
        render(
            <MemoryRouter>
                <EditUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'erw' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: '' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '3' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '5' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("The 'Email' field cannot be empty");
    });

    test('should show an alert if age is invalid', () => {
        render(
            <MemoryRouter>
                <EditUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'erw' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'asdf@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '5' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("The 'Age' field cannot be empty");
    });

    test('should show an alert if age is invalid', () => {
        render(
            <MemoryRouter>
                <EditUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'erw' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'asdf@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '23154' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '5' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("Invalid age");
    });

    test('should show an alert if grade is invalid', () => {
        render(
            <MemoryRouter>
                <EditUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'erw' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'asdf@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '23' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("The 'Grade' field cannot be empty");
    });

    test('should show an alert if grade is invalid', () => {
        render(
            <MemoryRouter>
                <EditUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'erw' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'asdf@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '23' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '101' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("Invalid grade");
    });

    test('should show an alert if student is added', () => {
        render(
            <MemoryRouter>
                <EditUser />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'erw' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'asdf@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '23' } });
        fireEvent.change(screen.getByPlaceholderText('Grade'), { target: { value: '10' } });

        fireEvent.submit(screen.getByRole('form'));

        expect(window.alert).toHaveBeenCalledWith("Student edited successfully");
    });
})
