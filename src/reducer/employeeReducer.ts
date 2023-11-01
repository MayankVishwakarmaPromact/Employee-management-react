import { createSlice } from "@reduxjs/toolkit";

export type Employee = {
    id: number,
    name: string,
    birthDate: string,
    department: string,
    experience: number,
}
type InitialState = {
    employees: Employee[],
}

const employee: Employee[] = [
    { id: 1, name: "Mayank Vishwakarma", birthDate: "2005-03-19", department: "development", experience: 3 },
];
const initialState: InitialState = {
    employees: employee,
}

const employeeReducer = createSlice({
    name: "employee",
    initialState,
    reducers: {
        addEmployee(state, action) {
            state.employees.push(action.payload);
            alert('Employee Added Successfully')
        },
        deleteEmployee(state, action) {
            return {
                employees: state.employees.filter((emp) => emp.id !== action.payload)
            }
        },
        editEmployee(state, action) {
            const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
            (index > -1) ? state.employees.splice(index, 1, action.payload) : alert('Employee Not Found...');
            alert('Employee Details Updated Successfully')
        }

    }

})

export default employeeReducer.reducer;
export const { addEmployee, deleteEmployee, editEmployee } = employeeReducer.actions;