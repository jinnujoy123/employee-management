import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { editAPI } from "../services/allAPI";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Edit({ id, employees, setEmployees }) {
  const [open, setOpen] = React.useState(false);
  const [empData, setEmpData] = React.useState({
    emp_id: "",
    name: "",
    email: "",
    status: "",
  });

  // Load employee details when modal opens
  React.useEffect(() => {
    if (open) {
      const employee = employees.find((item) => item.id === id);
      if (employee) setEmpData(employee);
    }
  }, [id, open]);

  // Handle input changes
  const handleChange = (e) => {
    setEmpData({ ...empData, [e.target.name]: e.target.value });
  };

  // Update employee
  const handleEdit = async () => {
    try {
      const result = await editAPI(id, empData);
      if (result) {
        // Update list in parent
        const updatedList = employees.map((emp) =>
          emp.id === id ? result : emp
        );
        setEmployees(updatedList);
      }
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        className="bg-green-600 px-2 my-2 text-white"
        onClick={() => setOpen(true)}
      >
        Edit
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6">Edit Employee Details</Typography>
          
      
          <input
            type="text"
            name="name"
            value={empData.name}
            onChange={handleChange}
            className="mb-2 p-2 w-full border rounded mt-5"
            placeholder="Name"
          />
          <input
            type="text"
            name="email"
            value={empData.email}
            onChange={handleChange}
            className="mb-2 p-2 w-full border rounded"
            placeholder="Email"
          />

          <select
            name="status"
            value={empData.status}
            onChange={handleChange}
            className="p-2 w-full border rounded"
          >
            <option value="">Status :</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={handleEdit}
            className="rounded shadow text-white bg-blue-500 p-2 my-3 w-full"
          >
            Update
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default Edit;
