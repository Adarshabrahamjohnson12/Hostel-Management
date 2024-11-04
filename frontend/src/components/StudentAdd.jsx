import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";

const StudentAdd = () => {
    const [studentName, setStudentName] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [rno,setRno] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const validationSchema = Yup.object().shape({
        studentName: Yup.string()
            .required("Student name is required")
            .min(2, "Name must be at least 2 characters long"),
        studentEmail: Yup.string()
            .required("Email is required")
            .email("Invalid email format"),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        try {
            await validationSchema.validate({ studentName, studentEmail });

            setLoading(true);
            setError("");
            setSuccessMessage("");

            // Sending data
            const response = await axios.post('http://localhost:5080/addstudent', {
                studentName,
                studentEmail,
                rno,
            });

            if (response.status === 200) {
                setSuccessMessage("Student added successfully!");
                setStudentName("");
                setStudentEmail("");
            }
        } catch (err) {
            if (err.name === "ValidationError") {
                setError(err.errors[0]);
            } else {
                setError("Failed to add student. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid justify-center h-screen p-8 bg-gray-800 text-white">
            <a href="/admin" className="text-bold">HOME</a>
            <h1 className="text-3xl font-black ">New Student Register</h1>
            <form onSubmit={handleSubmit} className="bg-slate-200 text-black p-16">
                <div>
                    <label className="block">Student Name:</label>
                    <input
                        type="text"
                        name="studentName"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="border p-2"
                    />
                </div>
                <div>
                    <label className="block mt-2">Rno:</label>
                    <input
                    type="text"
                    name="rno"
                    value={rno}
                    onChange={(e) => setRno(e.target.value)}
                    className="border p-2"
                    />
                </div>
                <div>
                    <label className="block mt-2">Student Email:</label>
                    <input
                        type="email"
                        name="studentEmail"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        className="border p-2"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white mt-8 p-2"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default StudentAdd;
