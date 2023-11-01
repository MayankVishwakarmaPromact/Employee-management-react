import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Button, Table } from "react-bootstrap";
import { deleteEmployee } from "../reducer/employeeReducer";

function EmployeeList() {
  let employees = useAppSelector((state) => state.employees);
  employees = employees.map((e) => {
    return {
      ...e,
      birthDate:
        new Date(e.birthDate).getDate() +
        "-" +
        new Date(e.birthDate).getMonth() +
        "-" +
        new Date(e.birthDate).getFullYear(),
    };
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const confirmDelete = (id: number) => {   
    confirm('Are you sure you want to delete employee') ?  onDelete(id) :'';
  };
  const onDelete = (id: number) => {   
    dispatch(deleteEmployee(id));
    alert('Employee Deleted Successfully.')
  };

  const onEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center px-2">
          <div className="fs-1 fw-semibold">EmployeeList</div>
          <div>
            <Button onClick={() => navigate("/add")}>Add Employee</Button>
          </div>
        </div>
        <hr/>
        <div className="container">
          <Table striped hover>
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>EMPLOYEE NAME</th>
                <th>BIRTHDATE</th>
                <th>DEPARTMENT</th>
                <th>EXPERIENCE</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.birthDate}</td>
                    <td>{employee.department}</td>
                    <td>{employee.experience + " Years"} </td>
                    <td className="text-center">
                      <Button
                        variant="primary"
                        onClick={() => onEdit(employee.id)}
                      >
                        Edit
                      </Button>
                      {" "}
                      <Button
                        variant="danger"
                        onClick={() => confirmDelete(employee.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default EmployeeList;
