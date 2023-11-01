import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addEmployee, editEmployee } from "../reducer/employeeReducer";
function AddEmployee() {
  const employees = useAppSelector((state) => state.employees);
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [experience, setExperience] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    id ? setEditMode(true) : setEditMode(false);
    if (editMode) {
      const existingEmployee = employees.filter(
        (employee) => employee.id == Number(id)
      );

      const _birthDate = existingEmployee[0].birthDate.substring(0, 10);

      setName(existingEmployee[0].name);
      setBirthDate(_birthDate);
      setDepartment(existingEmployee[0].department);
      setExperience(existingEmployee[0].experience.toString());
    }
  }, [editMode, id, employees]);

  function onSubmit() {
    if (validateForm()) {
      const data = {
        id: employees[employees.length - 1].id + 1,
        name: name,
        birthDate: birthDate,
        department: department,
        experience: parseInt(experience),
      };
      dispatch(addEmployee(data));
      navigate("/");
    } else {
      alert("Please fill all fields");
    }
  }

  function onUpdate() {
    if (validateForm()) {
      const data = {
        id: parseInt(id as string),
        name: name,
        birthDate: birthDate,
        department: department,
        experience: parseInt(experience),
      };
      dispatch(editEmployee(data));
      navigate("/");
    } else {
      alert("Please fill all fields");
    }
  }
  function validateName(name: string) {
    if(name){
        const namePattern = new RegExp("^[a-zA-Z ]+$");
        return !namePattern.test(name);
    }
    else{
        return false;
    }
  }

  function validateForm(): boolean {
    return (
      name !== "" && birthDate !== "" && department !== "" && experience !== ""
    );
  }
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Card className="w-auto">
          <Card.Header>
            {editMode ? (
              <span className="fs-2 fw-semibold">Edit Employee Details</span>
            ) : (
              <span className="fs-2 fw-semibold">Add New Employee</span>
            )}
          </Card.Header>
          <Card.Body>
            <Form.Label htmlFor="inputPassword5">Name : </Form.Label>
            <Form.Control
              type="text"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              isInvalid={validateName(name)}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Correct Name
            </Form.Control.Feedback>

            <Form.Label htmlFor="birthDate">Birth Date : </Form.Label>
            <Form.Control
              type="Date"
              id="birthDate"
              placeholder="Enter BirthDate"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
              }}
              required
            />

            <Form.Label htmlFor="department">Department : </Form.Label>
            <Form.Control
              type="text"
              id="department"
              placeholder="Enter Department"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              required
            />
            <Form.Label htmlFor="experience">Experience : </Form.Label>
            <Form.Control
              type="number"
              id="experience"
              placeholder="Enter Experience"
              value={experience}
              pattern=""
              onChange={(e) => {
                setExperience(e.target.value);
              }}
              required
            />
          </Card.Body>
          <Card.Footer>
            <div className="text-center">
              {editMode ? (
                <Button className="w-100" onClick={onUpdate}>
                  Update User
                </Button>
              ) : (
                <Button className="w-100" onClick={onSubmit}>
                  Add User
                </Button>
              )}
              <hr />
              <p className="p-0 m-0">or</p>
              <Link to="/">
                <Button variant="link" className="">
                  Back To Users List
                </Button>
              </Link>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default AddEmployee;
