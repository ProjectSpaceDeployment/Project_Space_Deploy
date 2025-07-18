import React, { useState, useEffect } from "react";
import { FaFilter, FaPlus, FaEdit, FaTrash, FaUpload } from "react-icons/fa";
import AxiosInstance from "../../../AxiosInstance";
const ManagementPage = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState("Student Management");
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);

  const [teacherdepartments, setTeacherDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  const [domains, setDomains] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);

  // States for Filtering & Searching
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [search, setSearch] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [depart, setDepart] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newShortform, setNewShortform] = useState("");
  const [editDepartmentName, setEditDepartmentName] = useState("");
  const [editShortform, setEditShortform] = useState("");

  const [isAddDeptOpen, setIsAddDeptOpen] = useState(false);
  const [isEditDeptOpen, setIsEditDeptOpen] = useState(false);

  const [dsg, setDsg] = useState([]);
  const [selectedDsg, setSelectedDsg] = useState([]);

  const [dept, setDept] = useState("");
  const [desg, setDesg] = useState("");

  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [activeAddTab, setAddActiveTab] = useState("manual");
  const [formData, setFormData] = useState({
    moodleId: "",
    firstname: "",
    lastname: "",
    middlename: "",
    department: "",
    batch: "",
    email: "",
  });
  const [csvFile, setCsvFile] = useState(null);
  const [csvTeacherFile, setTeacherCsvFile] = useState(null);

  const [formTeacherData, setFormTeacherData] = useState({
    userId: "",
    firstname: "",
    lastname: "",
    middlename: "",
    department: "",
    designation: "",
    email: "",
  });

  const [editFormTeacherData, setEditFormTeacherData] = useState({
    Id: "",
    userId: "",
    firstname: "",
    lastname: "",
    middlename: "",
    department: "",
    designation: "",
    email: "",
  });

  const [isAddDomainOpen, setIsAddDomainOpen] = useState(false);
  const [isEditDomainOpen, setIsEditDomainOpen] = useState(false);
  const [editDomainName, setEditDomainName] = useState("");
  const [newDomainName, setNewDomainName] = useState("");
  const [editFormData, setEditFormData] = useState({
    studentId: "",
    moodleId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    department: "",
    batch: "",
    email: "",
  });
  const [activeEditTab, setAddEditTab] = useState("profile");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAddDsgOpen, setIsAddDsgOpen] = useState(false);
  const [isEditDsgOpen, setIsEditDsgOpen] = useState(false);
  const [editDsgName, setEditDsgName] = useState("");
  const [newDsgName, setNewDsgName] = useState("");
  const [accessList, setAccessList] = useState([]);
  const [selectedToRemove, setSelectedToRemove] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [selectedToAdd, setSelectedToAdd] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");

  const [academicBatches, setAcademicBatches] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);

  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);
  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchDept, setNewBatchDept] = useState('');

  const [isEditBatchOpen, setIsEditBatchOpen] = useState(false);
  const [editBatchName, setEditBatchName] = useState('');
  const [editBatchDept, setEditBatchDept] = useState('');
  const [editingBatchId, setEditingBatchId] = useState(null);

  const handleBatchCheckboxChange = (id) => {
    setSelectedBatches((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
    );
  };

  const fetchBatches = async () => {
  try {
    const response = await AxiosInstance.get('/academicbatch/');
    setAcademicBatches(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Failed to fetch batches:', error);
  }
};

  const fetchDomains = () => {
    AxiosInstance.get("/domains/")
      .then((res) => setDomains(res.data))
      .catch((err) => console.error("Failed to fetch domains", err));
  };

  const fetchDepartment = () => {
    AxiosInstance.get("/departments/")
      .then((res) => setDepart(res.data))
      .catch((err) => console.error("Failed to fetch domains", err));
  };

  const fetchDsg = () => {
    AxiosInstance.get("/designation/")
      .then((res) => setDsg(res.data))
      .catch((err) => console.error("Failed to fetch Designation", err));
  };

  const fetchPermissions = async () => {
    try {
      const res = await AxiosInstance.get(`/managementpermission/`);
      setAccessList(res.data);
      console.log(res.data);
      const accessIds = new Set(res.data.map((p) => p.teacher.id));
      console.log(teacher);
      const availableTeachers = teacher.filter((t) => !accessIds.has(t.id));
      console.log(availableTeachers);
      setTeacherList(availableTeachers);
    } catch (err) {
      console.error("Failed to fetch permissions", err);
    }
  };

  useEffect(() => {
    AxiosInstance.get("/managementpermission/check-access/")
      .then((res) => {
        setHasAccess(true);
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          setHasAccess(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await AxiosInstance.get("/studentslist/");
        const formattedData = response.data.map((student) => ({
          studentId: student.id,
          moodleId: student.moodleid,
          firstName: student.first_name,
          middleName: student.middle_name,
          lastName: student.last_name,
          department: student.department,
          batch: student.batch,
          email: student.email,
        }));
        setStudents(formattedData);
        const uniqueDepartments = [
          ...new Set(formattedData.map((s) => s.department)),
        ];
        const uniqueBatches = [...new Set(formattedData.map((s) => s.batch))];

        setDepartments(uniqueDepartments);
        setBatches(uniqueBatches);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await AxiosInstance.get("/teacher/");
        const formattedData = response.data.map((teacher) => ({
          Id: teacher.id,
          userId: teacher.moodleid,
          firstName: teacher.first_name,
          middleName: teacher.middle_name,
          lastName: teacher.last_name,
          department: teacher.department,
          designation: teacher.role,
          email: teacher.email,
        }));
        setTeacher(formattedData);
        const uniqueDepartments = [
          ...new Set(formattedData.map((s) => s.department)),
        ];
        const uniqueBatches = [
          ...new Set(formattedData.map((s) => s.designation)),
        ];

        setTeacherDepartments(uniqueDepartments);
        setRoles(uniqueBatches);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    fetchDomains();
  }, []);

  useEffect(() => {
    fetchDepartment();
  }, []);

  useEffect(() => {
    fetchDsg();
  }, []);

  useEffect(() => {
    fetchBatches();
  }, []);


  // Call it inside useEffect (for initial load)
  useEffect(() => {
      if (teacher.length > 0) {
      fetchPermissions();
    }
  }, [teacher]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!hasAccess) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Access Restricted: You need special permission to view this section.
      </div>
    );
  }

  const handleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  // Filtering & Searching Logic
  const filteredStudents = students.filter((student) => {
    return (
      (department === "" || student.department === department) &&
      (batch === "" || student.batch === batch) &&
      (search === "" ||
        student.firstName.toLowerCase().includes(search.toLowerCase()) ||
        student.lastName.toLowerCase().includes(search.toLowerCase()) ||
        student.middleName.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()))
      // student.phone.includes(search))
    );
  });

  const filteredTeachers = teacher.filter((student) => {
    return (
      (dept === "" || student.department === dept) &&
      (desg === "" || student.designation === desg) &&
      (search === "" ||
        student.firstName.toLowerCase().includes(search.toLowerCase()) ||
        student.lastName.toLowerCase().includes(search.toLowerCase()) ||
        student.middleName.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()))
      // student.phone.includes(search))
    );
  });

  const isEditDisabled = selectedStudents.length !== 1;
  const isRemoveDisabled = selectedStudents.length === 0;

  // Handle Checkbox Selection
  const handleCheckboxChange = (moodleId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(moodleId)
        ? prevSelected.filter((id) => id !== moodleId)
        : [...prevSelected, moodleId]
    );
  };

  const handleCheckbox = (moodleId) => {
    setSelectedTeachers((prevSelected) =>
      prevSelected.includes(moodleId)
        ? prevSelected.filter((id) => id !== moodleId)
        : [...prevSelected, moodleId]
    );
  };

  const handleEditTeacherClick = () => {
    const selected = filteredTeachers.find(
      (student) => student.userId === selectedTeachers[0]
    );
    if (selected) {
      setEditFormTeacherData({
        Id: selected.Id,
        userId: selected.userId,
        firstname: selected.firstName,
        middlename: selected.middleName,
        lastname: selected.lastName,
        department: selected.department,
        designation: selected.designation,
        email: selected.email, // fallback if phone is not shown
      });
      setIsEditModalOpen(true);
    }
  };

  const handleTeacherInputChange = (e) => {
    setFormTeacherData({ ...formTeacherData, [e.target.name]: e.target.value });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleTeacherFileChange = (e) => {
    setTeacherCsvFile(e.target.files[0]);
  };

  const config = { headers: { "Content-Type": "application/json" } };
  // Handle form submission (manual)
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await AxiosInstance.post(
        "/student/register/",
        formData,
        config
      );
      alert(response.data.message);
      setIsAddModalOpen(false);
    } catch (error) {
      alert(error.response.data.error || "Failed to register student.");
    }
  };

  const handleTeacherManualSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post(
        "/teacher/teacher-registration/",
        formTeacherData,
        config
      );
      alert(response.data.message);
      setIsAddModalOpen(false);
    } catch (error) {
      alert(error.response.data.error || "Failed to register student.");
    }
  };

  const handleCsvSubmit = async () => {
    if (!csvFile) {
      alert("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      const response = await AxiosInstance.post(
        "/student/register/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message); // Show success message
      setIsAddModalOpen(false); 
    } catch (error) {
      alert(error.response.data.error || "Failed to register student.");
      console.log("Error",error);
    }
  };

  const handleTeacherCsvSubmit = async () => {
    if (!csvTeacherFile) {
      alert("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvTeacherFile);


    try {
      const response = await AxiosInstance.post(
        "/teacher/teacher-registration/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message); // Show success message
      setIsAddModalOpen(false); // Close modal after success
    } catch (error) {
      alert(error.response.data.error || "Failed to register student.");
    }
  };

  const handleEditClick = () => {
    const selected = filteredStudents.find(
      (student) => student.moodleId === selectedStudents[0]
    );
    if (selected) {
      setEditFormData({
        studentId: selected.studentId,
        moodleId: selected.moodleId,
        firstName: selected.firstName,
        middleName: selected.middleName,
        lastName: selected.lastName,
        department: selected.department,
        batch: selected.batch,
        email: selected.email, // fallback if phone is not shown
      });
      setIsEditPopupOpen(true);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormTeacherData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDomainCheckboxChange = (id) => {
    if (selectedDomains.includes(id)) {
      setSelectedDomains(selectedDomains.filter((d) => d !== id));
    } else {
      setSelectedDomains([...selectedDomains, id]);
    }
  };

  const filteredDomains = domains.filter((domain) => {
    return (
      search === "" || domain.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleAdd = () => {
    if (newDomainName.trim() !== "") {
      AxiosInstance.post("/domains/", { name: newDomainName.trim() }).then(
        (res) => {
          fetchDomains();
          setNewDomainName("");
          setIsAddDomainOpen(false);
          alert("Domain Added!");
        }
      );
    }
  };

  const handleEditDomainClick = () => {
    const index = selectedDomains[0];
    const domainToEdit = domains.find((domain) => domain.id === index);
    if (domainToEdit) {
      setEditDomainName(domainToEdit.name);
      setIsEditDomainOpen(true);
    }
  };

  const handleEdit = () => {
    const index = selectedDomains[0];
    AxiosInstance.patch(`/domains/${index}/`, (index, { name: editDomainName }))
      .then((res) => {
        fetchDomains();
        setIsEditDomainOpen(false);
        setSelectedDomains([]);
        alert("Domain Edited!");
      })
      .catch((error) => {
        alert(error.response.data.name || error.message);
      });
  };

  const handleRemove = () => {
    const deleteRequests = selectedDomains.map((index) =>
      AxiosInstance.delete(`/domains/${index}/`)
    );

    Promise.all(deleteRequests).then((res) => {
      setSelectedDomains([]);
      fetchDomains();
      alert("Selected Domains Deleted");
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      alert("Password does not meet constraints.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await AxiosInstance.post("/password/set-password/", {
        username: editFormData.moodleId,
        password: password,
      });
      alert("Password updated successfully.");
    } catch (err) {
      alert("Failed to update password.");
      console.log(err);
    }
  };

  const handlePasswordTeacherSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      alert("Password does not meet constraints.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await AxiosInstance.post("/password/set-password/", {
        username: editFormTeacherData.userId,
        password: password,
      });
      setIsEditModalOpen(false);
      alert("Password updated successfully.");
    } catch (err) {
      alert("Failed to update password.");
      console.log(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await AxiosInstance.put(`/studentslist/${editFormData.studentId}/`, {
        username: editFormData.moodleId,
        first_name: editFormData.firstName,
        last_name: editFormData.lastName,
        middle_name: editFormData.middleName,
        department: editFormData.department,
        batch: editFormData.batch,
        email: editFormData.email,
      });

      setEditFormData({
        studentId: "",
        moodleId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        department: "",
        batch: "",
        email: "",
      });

      setIsEditPopupOpen(false);

      alert("Student details updated successfully.");
      // Optionally refresh data or close edit modal here
    } catch (error) {
      console.error("Failed to update student data:", error);
      alert("Failed to update student details.");
    }
  };

  const handleEditTeacherSubmit = async (e) => {
    e.preventDefault();

    try {
      await AxiosInstance.put(`/teacher/${editFormTeacherData.Id}/`, {
        moodleid: editFormTeacherData.moodleId,
        firstname: editFormTeacherData.firstname,
        lastname: editFormTeacherData.lastname,
        middlename: editFormTeacherData.middlename,
        department: editFormTeacherData.department,
        designation: editFormTeacherData.designation,
        email: editFormTeacherData.email,
      });

      setEditFormTeacherData({
        Id: "",
        userId: "",
        firstname: "",
        lastname: "",
        middlename: "",
        department: "",
        designation: "",
        email: "",
      });

      setIsEditModalOpen(false);

      alert("Teacher details updated successfully.");
      // Optionally refresh data or close edit modal here
    } catch (error) {
      console.error("Failed to update student data:", error);
      alert("Failed to update student details.");
    }
  };

  const handleTeacherRemove = async () => {
    if (selectedTeachers.length === 0) {
      alert("Please select at least one teacher to delete.");
      return;
    }

    try {
      const response = await AxiosInstance.post('/teacher/bulk-delete/', {
        usernames: selectedTeachers,
      });

      if (response.status === 200) {
        alert("Selected teachers deleted successfully.");
        setSelectedTeachers([]); // Clear the selection
      }
    } catch (error) {
      console.error("Error deleting teachers:", error.response?.data || error.message);
      alert("Failed to delete teachers.");
    }
  };

  const filteredDepartments = depart.filter(
    (dept) =>
      dept.name.toLowerCase().includes(search.toLowerCase()) ||
      dept.shortform.toLowerCase().includes(search.toLowerCase())
  );

  const handleDepartmentCheckboxChange = (id) => {
    setSelectedDepartments((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((deptId) => deptId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleAddDept = async () => {
    if (!newDepartmentName.trim() || !newShortform.trim()) {
      alert("Both department name and shortform are required.");
      return;
    }

    try {
      const response = await AxiosInstance.post("/departments/", {
        name: newDepartmentName,
        shortform: newShortform,
      });

      // Clear fields and close modal
      setNewDepartmentName("");
      setNewShortform("");
      setIsAddDeptOpen(false);
      fetchDepartment();

      alert("Department added successfully.");
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Failed to add department.");
    }
  };

  const handleEditDeptClick = () => {
    const deptId = selectedDepartments[0];
    const dept = depart.find((d) => d.id === deptId);

    if (dept) {
      setEditDepartmentName(dept.name);
      setEditShortform(dept.shortform || "");
      setIsEditDeptOpen(true);
    }
  };

  const handleEditDeptSave = async () => {
    const deptId = selectedDepartments[0];

    try {
      // Update on backend (replace with your actual API endpoint)
      await AxiosInstance.put(`/departments/${deptId}/`, {
        name: editDepartmentName,
        shortform: editShortform,
      });
      fetchDepartment();
      // Clear state
      setEditDepartmentName("");
      setEditShortform("");
      setIsEditDeptOpen(false);
      setSelectedDepartments([]);
      alert("Department edited successfully.");
    } catch (error) {
      console.error("Failed to update department", error);
      // Show error notification if needed
    }
  };

  const handleDeptRemove = () => {
    const deleteRequests = selectedDepartments.map((index) =>
      AxiosInstance.delete(`/departments/${index}/`)
    );

    Promise.all(deleteRequests).then((res) => {
      setSelectedDepartments([]);
      fetchDepartment();
      alert("Selected Departments Deleted");
    });
  };

  const handleDsgCheckboxChange = (id) => {
    if (selectedDsg.includes(id)) {
      setSelectedDsg(selectedDsg.filter((d) => d !== id));
    } else {
      setSelectedDsg([...selectedDsg, id]);
    }
  };

  const filteredDsg = dsg.filter((domain) => {
    return (
      search === "" || domain.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDsgAdd = () => {
    if (newDsgName.trim() !== "") {
      AxiosInstance.post("/designation/", { name: newDsgName.trim() }).then(
        (res) => {
          fetchDsg();
          setNewDsgName("");
          setIsAddDsgOpen(false);
          alert("Designation Added!");
        }
      );
    }
  };

  const handleEditDsgClick = () => {
    const index = selectedDsg[0];
    const domainToEdit = dsg.find((domain) => domain.id === index);
    if (domainToEdit) {
      setEditDsgName(domainToEdit.name);
      setIsEditDsgOpen(true);
    }
  };

  const handleDsgEdit = () => {
    const index = selectedDsg[0];
    AxiosInstance.patch(
      `/designation/${index}/`,
      (index, { name: editDsgName })
    )
      .then((res) => {
        fetchDsg();
        setIsEditDsgOpen(false);
        setSelectedDsg([]);
        alert("Designation Edited!");
      })
      .catch((error) => {
        alert(error.response.data.name || error.message);
      });
  };

  const handleDsgRemove = () => {
    const deleteRequests = selectedDsg.map((index) =>
      AxiosInstance.delete(`/designation/${index}/`)
    );

    Promise.all(deleteRequests).then((res) => {
      setSelectedDsg([]);
      fetchDsg();
      alert("Selected Designations Deleted");
    });
  };

  const filteredAccessTeachers = accessList.filter((student) => {
    const deptMatch = dept === "" || student.teacher.department === dept;
    const desgMatch = desg === "" || student.teacher.role === desg;
    const searchLower = search.toLowerCase();

    const nameMatch =
      student.teacher.first_name?.toLowerCase().includes(searchLower) ||
      student.teacher.middle_name?.toLowerCase().includes(searchLower) ||
      student.teacher.last_name?.toLowerCase().includes(searchLower) ||
      student.teacher.moodleid?.toLowerCase().includes(searchLower);

    return deptMatch && desgMatch && nameMatch;
  });

  const filteredSelectedTeachers = teacherList.filter((teacher) => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase());
    const matchesDepartment =
      !departmentFilter || teacher.department === departmentFilter;
    const matchesDesignation =
      !designationFilter || teacher.designation === designationFilter;
    return matchesSearch && matchesDepartment && matchesDesignation;
  });

  const handleRemoveCheckbox = (moodleId) => {
    setSelectedToRemove((prevSelected) =>
      prevSelected.includes(moodleId)
        ? prevSelected.filter((id) => id !== moodleId)
        : [...prevSelected, moodleId]
    );
  };

  const handleSelectionChange = (id) => {
    setSelectedToAdd((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleSubmitPermissions = async () => {
    try {
      for (const teacherId of selectedToAdd) {
        await AxiosInstance.post("/managementpermission/", {
          teacher_id: teacherId,
        });
      }

      alert("Access granted successfully.");
      setSelectedToAdd([]);
      setIsAddModalOpen(false);
      fetchPermissions();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        alert(error.response.data.detail);
      } else {
        alert("Something went wrong while granting access.");
      }
      console.error("Permission error:", error);
    }
  };

  const revokePermissions = async () => {
    try {
      if (selectedToRemove.length === 0) {
        alert("Please select at least one teacher to revoke access.");
        return;
      }

      // Confirm before revoking
      if (
        !window.confirm(
          "Are you sure you want to revoke access for selected teachers?"
        )
      )
        return;

      // Make parallel delete requests for each selected teacher
      await Promise.all(
        selectedToRemove.map(async (teacherId) => {
          await AxiosInstance.delete(`/managementpermission/${teacherId}/`);
        })
      );

      alert("Access revoked successfully.");
      setSelectedToRemove([]); // Clear selection
      fetchPermissions(); // Refresh list after deletion
    } catch (error) {
      console.error("Failed to revoke permissions:", error);
      alert("An error occurred while revoking permissions.");
    }
  };

  const handleAddBatch = async () => {
    if (!newBatchName.trim() || !newBatchDept.trim()) {
      alert("Please enter both batch name and department name.");
      return;
    }

    const selectedDept = depart.find(
      (dept) => dept.name.toLowerCase() === newBatchDept.toLowerCase()
    );

    if (!selectedDept) {
      alert("Invalid department name.");
      return;
    }

    try {
      const response = await AxiosInstance.post("/academicbatch/", {
        batch: newBatchName,
        department: selectedDept.id, // send ID to backend
      });

      setNewBatchName("");
      setNewBatchDept("");
      setIsAddBatchOpen(false);
      fetchBatches();
    } catch (error) {
      console.error("Error adding batch:", error);
      alert("Failed to add batch.");
    }
  };

   const handleEditBatchClick = () => {
    const index = selectedBatches[0];
    const domainToEdit = academicBatches.find((domain) => domain.id === index);
    if (domainToEdit) {
      setEditingBatchId(domainToEdit.id); 
      setEditBatchName(domainToEdit.batch);
      setEditBatchDept(domainToEdit.department_name);
      setIsEditBatchOpen(true);
    }
  };

  const handleEditBatch = async () => {
    if (!editBatchName.trim() || !editBatchDept.trim()) {
      alert("Please enter both batch name and department name.");
      return;
    }

    // Convert department name to ID
    const selectedDept = depart.find(
      (dept) => dept.name.toLowerCase() === editBatchDept.toLowerCase()
    );

    if (!selectedDept) {
      alert("Invalid department name.");
      return;
    }
    try {
      await AxiosInstance.put(`/academicbatch/${editingBatchId}/`, {
        batch: editBatchName,
        department: selectedDept.id,
      });

      setIsEditBatchOpen(false);
      setEditBatchName("");
      setEditBatchDept("");
      setEditingBatchId("");
      fetchBatches(); // Refresh the list
    } catch (error) {
      console.error("Error updating batch:", error);
      alert("Failed to update batch.");
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-[] text-white" : "bg-transparent text-black"
      } pt-16`}
    >
      <div className="flex gap-4 mb-4">
        {[
          "Student Management",
          "Faculty Management",
          "Domain Management",
          "Department Management",
          "Permissions",
          "Designation Management",
          "Academic Batch Management",
        ].map((tab) => (
          <button
            key={tab}
            className={`px-2 py-2 rounded-md ${
              activeTab === tab
                ? isDarkMode
                  ? "bg-green-700 text-white"
                  : "bg-green-600 text-white"
                : isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "Student Management" && (
        <div>
          <div className="flex gap-4 mb-4">
            <select
              className="border p-2 rounded"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            >
              <option value="">All Batches</option>
              {batches.map((b, idx) => (
                <option key={idx} value={b}>
                  {b}
                </option>
              ))}
            </select>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by Name, Email, Phone..."
              className="border p-2 rounded w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add
            </button>
            {isAddModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                <div className="bg-white p-6 rounded-lg w-[32rem] max-h-[80vh] overflow-y-auto">
                  <h2 className="text-xl font-bold mb-4">Add Student</h2>

                  {/* Tabs */}
                  <div className="flex border-b mb-4">
                    <button
                      className={`flex-1 p-2 ${
                        activeAddTab === "manual"
                          ? "border-b-2 border-blue-500 font-bold"
                          : ""
                      }`}
                      onClick={() => setAddActiveTab("manual")}
                    >
                      Manual Entry
                    </button>
                    <button
                      className={`flex-1 p-2 ${
                        activeAddTab === "csv"
                          ? "border-b-2 border-blue-500 font-bold"
                          : ""
                      }`}
                      onClick={() => setAddActiveTab("csv")}
                    >
                      CSV/Excel Upload
                    </button>
                  </div>

                  {/* Manual Entry Form */}
                  {activeAddTab === "manual" && (
                    <form onSubmit={handleManualSubmit} className="space-y-3">
                      <div className="max-h-[30vh] overflow-y-auto space-y-3">
                        <div className="flex items-center space-x-2">
                          <label
                            htmlFor="moodleId"
                            className="w-32 font-medium"
                          >
                            Moodle ID
                          </label>
                          <input
                            type="text"
                            name="moodleId"
                            className="border p-2 mt-2 w-full"
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label
                            htmlFor="firstname"
                            className="w-32 font-medium"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstname"
                            className="border p-2 mt-2 w-full"
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label
                            htmlFor="lastname"
                            className="w-32 font-medium"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastname"
                            className="border p-2 mt-2 w-full"
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label
                            htmlFor="middlename"
                            className="w-32 font-medium"
                          >
                            Middle Name
                          </label>
                          <input
                            type="text"
                            id="middlename"
                            name="middlename"
                            className="border p-2 flex-1"
                            onChange={handleInputChange}
                            // required
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label
                            htmlFor="department"
                            className="w-32 font-medium"
                          >
                            Department
                          </label>
                          <input
                            type="text"
                            id="department"
                            name="department"
                            className="border p-2 flex-1"
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label htmlFor="batch" className="w-32 font-medium">
                            Academic Batch
                          </label>
                          <input
                            type="text"
                            id="batch"
                            name="batch"
                            className="border p-2 flex-1"
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label htmlFor="email" className="w-32 font-medium">
                            Email ID
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="border p-2 flex-1"
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        {/* <div className="flex items-center space-x-2">
                          <label htmlFor="phone" className="w-32 font-medium">Phone</label>
                          <input type="tel" id="phone" name="phone" className="border p-2 flex-1" onChange={handleInputChange} required />
                        </div> */}

                        {/* <input type="text" name="middlename" className="border p-2 mt-2 w-full" onChange={handleInputChange} required />
                      <input type="text" name="department" className="border p-2 mt-2 w-full" onChange={handleInputChange} required />
                      <input type="text" name="batch" className="border p-2 mt-2 w-full" onChange={handleInputChange} required />
                      <input type="email" name="email" className="border p-2 mt-2 w-full" onChange={handleInputChange} required />
                      <input type="tel" name="phone" className="border p-2 mt-2 w-full" onChange={handleInputChange} required /> */}
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 w-full rounded"
                      >
                        Submit
                      </button>
                    </form>
                  )}

                  {/* CSV Upload */}
                  {activeAddTab === "csv" && (
                    <div className="space-y-3">
                      <div className="text-gray-700 mt-3">
                        <p>
                          <strong>Required Columns:</strong>
                        </p>
                        <p>
                          moodleId, firstname, lastname, batch, email,
                          middlename, department
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".csv, .xlsx, .xls"
                        className="border p-2 w-full"
                        onChange={handleFileChange}
                      />
                      <button
                        className="bg-green-500 text-white p-2 w-full rounded"
                        onClick={handleCsvSubmit}
                        disabled={!csvFile}
                      >
                        Upload CSV
                      </button>
                    </div>
                  )}

                  {/* Close Button */}
                  <button
                    className="bg-gray-500 text-white p-2 w-full rounded mt-3"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            <button
              className={`px-4 py-2 rounded ${
                isEditDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white"
              }`}
              disabled={isEditDisabled}
              onClick={handleEditClick}
            >
              Edit
            </button>
            {isEditPopupOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                <div className="bg-white p-6 rounded-lg w-[40rem] max-h-[80vh] overflow-y-auto">
                  <h2 className="text-xl font-bold mb-4">Edit Student</h2>

                  {/* Tabs */}
                  <div className="flex border-b mb-4">
                    <button
                      className={`flex-1 p-2 ${
                        activeEditTab === "profile"
                          ? "border-b-2 border-blue-500 font-bold"
                          : ""
                      }`}
                      onClick={() => setAddEditTab("profile")}
                    >
                      Profile
                    </button>
                    <button
                      className={`flex-1 p-2 ${
                        activeEditTab === "password"
                          ? "border-b-2 border-blue-500 font-bold"
                          : ""
                      }`}
                      onClick={() => setAddEditTab("password")}
                    >
                      Password Setup
                    </button>
                  </div>

                  {/* Profile Form */}
                  {activeEditTab === "profile" && (
                    <form onSubmit={handleEditSubmit} className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: "Moodle ID", name: "moodleId" },
                          { label: "First Name", name: "firstName" },
                          { label: "Last Name", name: "lastName" },
                          { label: "Middle Name", name: "middleName" },
                          { label: "Department", name: "department" },
                          { label: "Academic Batch", name: "batch" },
                          { label: "Email ID", name: "email", type: "email" },
                        ].map(({ label, name, type = "text" }) => (
                          <div key={name} className="flex items-center gap-2">
                            <label htmlFor={name} className="w-40 font-medium">
                              {label}
                            </label>
                            <input
                              type={type}
                              name={name}
                              id={name}
                              className="border p-2 flex-1"
                              value={editFormData[name] || ""}
                              onChange={handleEditInputChange}
                              required
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 w-full rounded mt-4"
                      >
                        Save Changes
                      </button>
                    </form>
                  )}

                  {/* Password Setup */}
                  {activeEditTab === "password" && (
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="newPassword"
                          className="w-40 font-medium"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="border p-2 flex-1"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="confirmPassword"
                          className="w-40 font-medium"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="border p-2 flex-1"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded">
                        <p>Password must contain:</p>
                        <ul className="list-disc ml-6">
                          <li>At least 8 characters</li>
                          <li>At least one uppercase letter</li>
                          <li>At least one lowercase letter</li>
                          <li>At least one number</li>
                          <li>At least one special character</li>
                        </ul>
                      </div>

                      <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 w-full rounded mt-2"
                      >
                        Update Password
                      </button>
                    </form>
                  )}

                  {/* Close Button */}
                  <button
                    className="bg-gray-500 text-white p-2 w-full rounded mt-3"
                    onClick={() => {
                      setIsEditPopupOpen(false);
                      setEditFormData({
                        studentId: "",
                        moodleId: "",
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        department: "",
                        batch: "",
                        email: "",
                      });
                      setPassword("");
                      setConfirmPassword("");
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <button
              className={`px-4 py-2 rounded ${
                isRemoveDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white"
              }`}
              disabled={isRemoveDisabled}
            >
              Remove
            </button>
          </div>

          {/* <div className="flex gap-2 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
        <button
          className={`px-4 py-2 rounded ${isEditDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 text-white"}`}
          disabled={isEditDisabled}
        >
          Edit
        </button>
        <button
          className={`px-4 py-2 rounded ${isRemoveDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white"}`}
          disabled={isRemoveDisabled}
        >
          Remove
        </button>
      </div> */}

          {/* Table */}
          <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStudents(
                          filteredStudents.map((s) => s.moodleId)
                        );
                      } else {
                        setSelectedStudents([]);
                      }
                    }}
                  />
                </th>
                <th className="border p-2">Moodle ID</th>
                <th className="border p-2">First Name</th>
                <th className="border p-2">Middle Name</th>
                <th className="border p-2">Last Name</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Batch</th>
                {/* <th className="border p-2">Current Semester</th> */}
                <th className="border p-2">Email</th>
                {/* <th className="border p-2">Phone Number</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.moodleId} className="border">
                    <td className="border p-2">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.moodleId)}
                        onChange={() => handleCheckboxChange(student.moodleId)}
                      />
                    </td>
                    <td className="border p-2">{student.moodleId}</td>
                    <td className="border p-2">{student.firstName}</td>
                    <td className="border p-2">{student.middleName}</td>
                    <td className="border p-2">{student.lastName}</td>
                    <td className="border p-2">{student.department}</td>
                    <td className="border p-2">{student.batch}</td>
                    {/* <td className="border p-2">{student.semester}</td> */}
                    <td className="border p-2">{student.email}</td>
                    {/* <td className="border p-2">{student.phone}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      )}
      {activeTab === "Faculty Management" && (
        <div>
          <div className="flex gap-4 mb-4">
            <select
              className="border p-2 rounded"
              // value={department}
              onChange={(e) => setDept(e.target.value)}
            >
              <option value="">All Departments</option>
              {teacherdepartments.map((dept, idx) => (
                <option key={idx} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded"
              // value={batch}
              onChange={(e) => setDesg(e.target.value)}
            >
              <option value="">All Designations</option>
              {roles.map((b, idx) => (
                <option key={idx} value={b}>
                  {b}
                </option>
              ))}
            </select>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by Name, Email, Phone..."
              className="border p-2 rounded w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add
            </button>
            {isAddModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                <div className="bg-white p-6 rounded-lg w-[32rem] max-h-[80vh]">
                  <h2 className="text-xl font-bold mb-4">Add Teacher</h2>

                  {/* Tabs */}
                  <div className="flex border-b mb-4">
                    <button
                      className={`flex-1 p-2 ${
                        activeAddTab === "manual"
                          ? "border-b-2 border-blue-500 font-bold"
                          : ""
                      }`}
                      onClick={() => setAddActiveTab("manual")}
                    >
                      Manual Entry
                    </button>
                    <button
                      className={`flex-1 p-2 ${
                        activeAddTab === "csv"
                          ? "border-b-2 border-blue-500 font-bold"
                          : ""
                      }`}
                      onClick={() => setAddActiveTab("csv")}
                    >
                      CSV/Excel Upload
                    </button>
                  </div>

                  {/* Manual Entry Form */}
                  {activeAddTab === "manual" && (
                    <form
                      onSubmit={handleTeacherManualSubmit}
                      className="space-y-3"
                    >
                      {/* <div className="max-h-[30vh] overflow-y-auto"> */}
                        {/* <input type="text" name="userId" placeholder="User ID" className="border p-2 mt-2 w-full" onChange={handleTeacherInputChange} required />
                      <input type="text" name="firstname" placeholder="First Name" className="border p-2 mt-2 w-full" onChange={handleTeacherInputChange} required />
                      <input type="text" name="lastname" placeholder="Last Name" className="border p-2 mt-2 w-full" onChange={handleTeacherInputChange} required />
                      <input type="text" name="middlename" placeholder="Middle Name" className="border p-2 mt-2 w-full" onChange={handleTeacherInputChange} required />
                      <input type="text" name="department" placeholder="Department" className="border p-2 mt-2 w-full" onChange={handleTeacherInputChange} required />
                      <input type="text" name="designation" placeholder="Designation" className="border p-2 mt-2 w-full" onChange={handleTeacherInputChange} required />
                      <input type="email" name="email" placeholder="Email ID" className="border p-2 mt-2 w-full" onChange={handleTeacherInputChange} required /> */}
                        {/* <input type="tel" name="phone" placeholder="Phone Number" className="border p-2 mt-2 w-full" onChange={handleInputChange} required /> */}
                      {/* </div> */}
                       <div className="max-h-[30vh] overflow-y-auto space-y-3">
                        <div className="flex items-center space-x-2">
                          <label htmlFor="userId" className="w-32 font-medium">User ID</label>
                          <input type="text" name="userId" className="border p-2 mt-2 w-full" onChange={handleTeacherInputChange} required />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label htmlFor="firstname" className="w-32 font-medium">First Name</label>
                          <input type="text" name="firstname" className="border p-2 mt-2 w-full" onChange={handleTeacherInputChange} required />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label htmlFor="lastname" className="w-32 font-medium">Last Name</label>
                          <input type="text" name="lastname" className="border p-2 mt-2 w-full" onChange={handleTeacherInputChange} required />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label htmlFor="middlename" className="w-32 font-medium">Middle Name</label>
                          <input type="text" id="middlename" name="middlename" className="border p-2 flex-1" onChange={handleTeacherInputChange} />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label htmlFor="department" className="w-32 font-medium">Department</label>
                          <input type="text" id="department" name="department" className="border p-2 flex-1" onChange={handleTeacherInputChange} required />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label htmlFor="designation" className="w-32 font-medium">Designation</label>
                          <input type="text" id="designation" name="designation" className="border p-2 flex-1" onChange={handleTeacherInputChange} required />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label htmlFor="email" className="w-32 font-medium">Email ID</label>
                          <input type="email" id="email" name="email" className="border p-2 flex-1" onChange={handleTeacherInputChange} required />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 w-full rounded"
                      >
                        Submit
                      </button>
                    </form>
                  )}

                  {/* CSV Upload */}
                  {activeAddTab === "csv" && (
                    <div className="space-y-3">
                      <div className="text-gray-700 mt-3">
                        <p>
                          <strong>Required Columns:</strong>
                        </p>
                        <p>
                          moodleId, firstname, lastname, designation, email,
                          middlename, department
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".csv, .xlsx, .xls"
                        className="border p-2 w-full"
                        onChange={handleTeacherFileChange}
                      />
                      <button
                        className="bg-green-500 text-white p-2 w-full rounded"
                        onClick={handleTeacherCsvSubmit}
                        disabled={!csvTeacherFile}
                      >
                        Upload CSV
                      </button>
                    </div>
                  )}

                  {/* Close Button */}
                  <button
                    className="bg-gray-500 text-white p-2 w-full rounded mt-3"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            <button
              className={`px-4 py-2 rounded ${
                selectedTeachers.length !== 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white"
              }`}
              disabled={selectedTeachers.length !== 1}
              onClick={handleEditTeacherClick}
            >
              Edit
            </button>
            {isEditModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                <div className="bg-white p-6 rounded-lg w-[40rem] max-h-[80vh] overflow-y-auto">
                  <h2 className="text-xl font-bold mb-4">Edit Faculty</h2>

                  {/* Tabs */}
                  <div className="flex border-b mb-4">
                    <button
                      className={`flex-1 p-2 ${
                        activeEditTab === "profile"
                          ? "border-b-2 border-blue-500 font-bold"
                          : ""
                      }`}
                      onClick={() => setAddEditTab("profile")}
                    >
                      Profile
                    </button>
                    <button
                      className={`flex-1 p-2 ${
                        activeEditTab === "password"
                          ? "border-b-2 border-blue-500 font-bold"
                          : ""
                      }`}
                      onClick={() => setAddEditTab("password")}
                    >
                      Password Setup
                    </button>
                  </div>

                  {/* Profile Form */}
                  {activeEditTab === "profile" && (
                    <form
                      onSubmit={handleEditTeacherSubmit}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: "User ID", name: "userId" },
                          { label: "First Name", name: "firstname" },
                          { label: "Last Name", name: "lastname" },
                          { label: "Middle Name", name: "middlename" },
                          { label: "Department", name: "department" },
                          { label: "Designation", name: "designation" },
                          { label: "Email ID", name: "email", type: "email" },
                        ].map(({ label, name, type = "text" }) => (
                          <div key={name} className="flex items-center gap-2">
                            <label htmlFor={name} className="w-40 font-medium">
                              {label}
                            </label>
                            <input
                              type={type}
                              name={name}
                              id={name}
                              className="border p-2 flex-1"
                              value={editFormTeacherData[name] || ""}
                              onChange={handleEditChange}
                              required
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 w-full rounded mt-4"
                      >
                        Save Changes
                      </button>
                    </form>
                  )}

                  {/* Password Setup */}
                  {activeEditTab === "password" && (
                    <form
                      onSubmit={handlePasswordTeacherSubmit}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="newPassword"
                          className="w-40 font-medium"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="border p-2 flex-1"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="confirmPassword"
                          className="w-40 font-medium"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="border p-2 flex-1"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded">
                        <p>Password must contain:</p>
                        <ul className="list-disc ml-6">
                          <li>At least 8 characters</li>
                          <li>At least one uppercase letter</li>
                          <li>At least one lowercase letter</li>
                          <li>At least one number</li>
                          <li>At least one special character</li>
                        </ul>
                      </div>

                      <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 w-full rounded mt-2"
                      >
                        Update Password
                      </button>
                    </form>
                  )}

                  {/* Close Button */}
                  <button
                    className="bg-gray-500 text-white p-2 w-full rounded mt-3"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditFormTeacherData({
                        Id: "",
                        userId: "",
                        firstname: "",
                        lastname: "",
                        middlename: "",
                        department: "",
                        designation: "",
                        email: "",
                      });
                      setPassword("");
                      setConfirmPassword("");
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <button
              className={`px-4 py-2 rounded ${
                selectedTeachers.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white"
              }`}
              disabled={selectedTeachers.length === 0}
              onClick={handleTeacherRemove}
            >
              Remove
            </button>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTeachers(
                          filteredTeachers.map((s) => s.userId)
                        );
                      } else {
                        setSelectedTeachers([]);
                      }
                    }}
                  />
                </th>
                <th className="border p-2">User ID</th>
                <th className="border p-2">First Name</th>
                <th className="border p-2">Middle Name</th>
                <th className="border p-2">Last Name</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Designation</th>
                {/* <th className="border p-2">Current Semester</th> */}
                <th className="border p-2">Email</th>
                {/* <th className="border p-2">Phone Number</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((student) => (
                  <tr key={student.userId} className="border">
                    <td className="border p-2">
                      <input
                        type="checkbox"
                        checked={selectedTeachers.includes(student.userId)}
                        onChange={() => handleCheckbox(student.userId)}
                      />
                    </td>
                    <td className="border p-2">{student.userId}</td>
                    <td className="border p-2">{student.firstName}</td>
                    <td className="border p-2">{student.middleName}</td>
                    <td className="border p-2">{student.lastName}</td>
                    <td className="border p-2">{student.department}</td>
                    <td className="border p-2">{student.designation}</td>
                    {/* <td className="border p-2">{student.semester}</td> */}
                    <td className="border p-2">{student.email}</td>
                    {/* <td className="border p-2">{student.phone}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    No user found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "Domain Management" && (
        <div>
          <div className="flex gap-4 mb-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search"
              className="border p-2 rounded w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsAddDomainOpen(true)}
            >
              Add
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedDomains.length !== 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white"
              }`}
              disabled={selectedDomains.length !== 1}
              onClick={handleEditDomainClick}
            >
              Edit
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedDomains.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white"
              }`}
              disabled={selectedDomains.length === 0}
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDomains(domains.map((d) => d.id));
                      } else {
                        setSelectedDomains([]);
                      }
                    }}
                  />
                </th>
                <th className="border p-2">Sr No.</th>
                <th className="border p-2">Domain</th>
              </tr>
            </thead>
            <tbody>
              {filteredDomains.length > 0 ? (
                filteredDomains.map((domain, index) => (
                  <tr key={index}>
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedDomains.includes(domain.id)}
                        onChange={() => handleDomainCheckboxChange(domain.id)}
                      />
                    </td>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">{domain.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4">
                    No domains found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {isAddDomainOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded w-1/3">
                <h2 className="text-lg font-semibold mb-4">Add Domain</h2>
                <input
                  type="text"
                  className="border p-2 w-full mb-4"
                  value={newDomainName}
                  onChange={(e) => setNewDomainName(e.target.value)}
                  placeholder="Enter domain name"
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setIsAddDomainOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleAdd}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {isEditDomainOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded w-1/3">
                <h2 className="text-lg font-semibold mb-4">Edit Domain</h2>
                <input
                  type="text"
                  className="border p-2 w-full mb-4"
                  value={editDomainName}
                  onChange={(e) => setEditDomainName(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setIsEditDomainOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={handleEdit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === "Department Management" && (
        <div>
          <div className="flex gap-4 mb-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search"
              className="border p-2 rounded w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsAddDeptOpen(true)}
            >
              Add
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedDepartments.length !== 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white"
              }`}
              disabled={selectedDepartments.length !== 1}
              onClick={handleEditDeptClick}
            >
              Edit
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedDepartments.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white"
              }`}
              disabled={selectedDepartments.length === 0}
              onClick={handleDeptRemove}
            >
              Remove
            </button>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDepartments(domains.map((d) => d.id));
                      } else {
                        setSelectedDepartments([]);
                      }
                    }}
                  />
                </th>
                <th className="border p-2">Sr No.</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Shortform</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((dept, index) => (
                  <tr key={dept.id}>
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(dept.id)}
                        onChange={() => handleDepartmentCheckboxChange(dept.id)}
                      />
                    </td>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">{dept.name}</td>
                    <td className="border p-2">{dept.shortform}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No departments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {isAddDeptOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded w-1/3">
                <h2 className="text-lg font-semibold mb-4">Add Department</h2>
                <label className="block mb-1 font-medium">
                  Department Name
                </label>
                <input
                  type="text"
                  className="border p-2 w-full mb-4"
                  value={newDepartmentName}
                  onChange={(e) => setNewDepartmentName(e.target.value)}
                  placeholder="Enter department name"
                />
                <label className="block mb-1 font-medium">Shortform</label>
                <input
                  type="text"
                  className="border p-2 w-full mb-4"
                  value={newShortform}
                  onChange={(e) => setNewShortform(e.target.value)}
                  placeholder="Enter shortform"
                />

                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setIsAddDeptOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleAddDept}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {isEditDeptOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded w-1/3">
                <h2 className="text-lg font-semibold mb-4">Edit Department</h2>

                <label className="block mb-1">Department Name</label>
                <input
                  type="text"
                  className="border p-2 w-full mb-4"
                  value={editDepartmentName}
                  onChange={(e) => setEditDepartmentName(e.target.value)}
                  placeholder="Enter department name"
                />

                <label className="block mb-1">Short Form</label>
                <input
                  type="text"
                  className="border p-2 w-full mb-4"
                  value={editShortform}
                  onChange={(e) => setEditShortform(e.target.value)}
                  placeholder="Enter short form"
                />

                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setIsEditDeptOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={handleEditDeptSave} // define this function
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === "Designation Management" && (
        <div>
          <div className="flex gap-4 mb-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search"
              className="border p-2 rounded w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsAddDsgOpen(true)}
            >
              Add
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedDsg.length !== 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white"
              }`}
              disabled={selectedDsg.length !== 1}
              onClick={handleEditDsgClick}
            >
              Edit
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedDsg.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white"
              }`}
              disabled={selectedDsg.length === 0}
              onClick={handleDsgRemove}
            >
              Remove
            </button>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDsg(domains.map((d) => d.id));
                      } else {
                        setSelectedDsg([]);
                      }
                    }}
                  />
                </th>
                <th className="border p-2">Sr No.</th>
                <th className="border p-2">Domain</th>
              </tr>
            </thead>
            <tbody>
              {filteredDsg.length > 0 ? (
                filteredDsg.map((domain, index) => (
                  <tr key={index}>
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedDsg.includes(domain.id)}
                        onChange={() => handleDsgCheckboxChange(domain.id)}
                      />
                    </td>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">{domain.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4">
                    No domains found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {isAddDsgOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded w-1/3">
                <h2 className="text-lg font-semibold mb-4">Add Designation</h2>
                <input
                  type="text"
                  className="border p-2 w-full mb-4"
                  value={newDsgName}
                  onChange={(e) => setNewDsgName(e.target.value)}
                  placeholder="Enter designation name"
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setIsAddDsgOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleDsgAdd}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {isEditDsgOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded w-1/3">
                <h2 className="text-lg font-semibold mb-4">Edit Domain</h2>
                <input
                  type="text"
                  className="border p-2 w-full mb-4"
                  value={editDsgName}
                  onChange={(e) => setEditDsgName(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setIsEditDsgOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={handleDsgEdit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === "Permissions" && (
        <div>
          <div className="flex gap-4 mb-4">
            <select
              className="border p-2 rounded"
              // value={department}
              onChange={(e) => setDept(e.target.value)}
            >
              <option value="">All Departments</option>
              {depart.map((dept, idx) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded"
              // value={batch}
              onChange={(e) => setDesg(e.target.value)}
            >
              <option value="">All Designations</option>
              {dsg.map((b, idx) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by Name, Email, Phone..."
              className="border p-2 rounded w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add
            </button>
            {isAddModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                <div
                  className={`bg-white p-8 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  <h2 className="text-xl font-bold mb-4">Manage Page Access</h2>

                  <div className="flex items-center gap-2 mb-2">
                    <select
                      className="p-2 border rounded"
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                    >
                      <option value="">-- Filter by Department --</option>
                      {depart.map((dept) => (
                        <option key={dept.id} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>

                    <select
                      className="p-2 border rounded"
                      value={designationFilter}
                      onChange={(e) => setDesignationFilter(e.target.value)}
                    >
                      <option value="">-- Filter by Designation --</option>
                      {dsg.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    type="text"
                    className="p-2 border rounded w-full mb-2"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  {/* Select All Checkbox */}
                  <div className="mb-2">
                    <label className="flex items-center font-semibold">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={
                          selectedToAdd.length ===
                            filteredSelectedTeachers.length &&
                          filteredSelectedTeachers.length > 0
                        }
                        onChange={() => {
                          if (
                            selectedToAdd.length ===
                            filteredSelectedTeachers.length
                          ) {
                            setSelectedToAdd([]); // Deselect all
                          } else {
                            setSelectedToAdd(
                              filteredSelectedTeachers.map((t) => t.Id)
                            );
                          }
                        }}
                      />
                      Select All
                    </label>
                  </div>

                  <div className="max-h-60 overflow-auto border p-2 rounded">
                    {filteredSelectedTeachers.map((teacher) => (
                      <div
                        key={teacher.Id}
                        className="flex items-center justify-between p-1"
                      >
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            value={teacher.Id}
                            className="mr-2"
                            checked={selectedToAdd.includes(teacher.Id)}
                            onChange={() => handleSelectionChange(teacher.Id)}
                          />
                          {teacher.firstName} {teacher.lastName} -{" "}
                          {teacher.department} / {teacher.designation}
                        </label>
                      </div>
                    ))}
                  </div>

                  <button
                    className="bg-blue-600 text-white p-2 w-full rounded mt-3 hover:bg-blue-700"
                    onClick={handleSubmitPermissions}
                  >
                    Submit Access
                  </button>

                  {/* Close Button */}
                  <button
                    className="bg-gray-500 text-white p-2 w-full rounded mt-3"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            <button
              className={`px-4 py-2 rounded ${
                selectedToRemove.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white"
              }`}
              disabled={selectedToRemove.length === 0}
              onClick={revokePermissions}
            >
              Remove
            </button>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedToRemove(
                          filteredAccessTeachers.map((s) => s.id)
                        );
                      } else {
                        setSelectedToRemove([]);
                      }
                    }}
                  />
                </th>
                <th className="border p-2">User ID</th>
                <th className="border p-2">First Name</th>
                <th className="border p-2">Middle Name</th>
                <th className="border p-2">Last Name</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Designation</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccessTeachers.length > 0 ? (
                filteredAccessTeachers.map((entry) => {
                  const teacher = entry.teacher; // nested teacher object
                  return (
                    <tr key={entry.id} className="border">
                      <td className="border p-2">
                        <input
                          type="checkbox"
                          checked={selectedToRemove.includes(entry.id)} // use ManagementPermission.id
                          onChange={() => handleRemoveCheckbox(entry.id)}
                        />
                      </td>
                      <td className="border p-2">{teacher.moodleid}</td>
                      <td className="border p-2">{teacher.first_name}</td>
                      <td className="border p-2">{teacher.middle_name}</td>
                      <td className="border p-2">{teacher.last_name}</td>
                      <td className="border p-2">{teacher.department}</td>
                      <td className="border p-2">{teacher.role}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    No user found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
        {activeTab === "Academic Batch Management" && (
  <div>
    <div className="flex gap-4 mb-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search"
        className="border p-2 rounded w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsAddBatchOpen(true)}
      >
        Add
      </button>
      <button
        className={`px-4 py-2 rounded ${
          selectedBatches.length !== 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-yellow-500 text-white"
        }`}
        disabled={selectedBatches.length !== 1}
        onClick={handleEditBatchClick}
      >
        Edit
      </button>
      <button
        className={`px-4 py-2 rounded ${
          selectedBatches.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 text-white"
        }`}
        disabled={selectedBatches.length === 0}
        // onClick={handleBatchRemove}
      >
        Remove
      </button>
    </div>

    {/* Table */}
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedBatches(batches.map((b) => b.id));
                } else {
                  setSelectedBatches([]);
                }
              }}
            />
          </th>
          <th className="border p-2">Sr No.</th>
          <th className="border p-2">Batch Name</th>
          <th className="border p-2">Department</th>
        </tr>
      </thead>
      <tbody>
        {academicBatches.filter((batch) => {
  const query = search.toLowerCase();
  return (
    batch.batch.toLowerCase().includes(query) ||
    batch.department_name.toLowerCase().includes(query)
  );
}).length > 0 ? (
  academicBatches
    .filter((batch) => {
      const query = search.toLowerCase();
      return (
        batch.batch.toLowerCase().includes(query) ||
        batch.department_name.toLowerCase().includes(query)
      );
    }).map((batch, index) => (
            <tr key={batch.id}>
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedBatches.includes(batch.id)}
                  onChange={() => handleBatchCheckboxChange(batch.id)}
                />
              </td>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">{batch.batch}</td>
              <td className="border p-2">{batch.department_name || '—'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center p-4">
              No batches found.
            </td>
          </tr>
        )}
      </tbody>
    </table>

    {/* Add Batch Modal */}
    {isAddBatchOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded w-1/3">
          <h2 className="text-lg font-semibold mb-4">Add Academic Batch</h2>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            value={newBatchName}
            onChange={(e) => setNewBatchName(e.target.value)}
            placeholder="Enter batch name"
          />
          <input
            type="text"
            className="border p-2 w-full mb-4"
            value={newBatchDept}
            onChange={(e) => setNewBatchDept(e.target.value)}
            placeholder="Enter department name"
          />
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => setIsAddBatchOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddBatch}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Edit Batch Modal */}
    {isEditBatchOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded w-1/3">
          <h2 className="text-lg font-semibold mb-4">Edit Academic Batch</h2>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            value={editBatchName}
            onChange={(e) => setEditBatchName(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 w-full mb-4"
            value={editBatchDept}
            onChange={(e) => setEditBatchDept(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => setIsEditBatchOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={handleEditBatch}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)}

    </div>
  );
};

export default ManagementPage;
