import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../Layout";
import Table from "../components/common/Table";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import { useFirebase } from "../components/contexts/Firebase";
import {
  addDoc,
  getDocs,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";

const StyledPayments = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    label {
      display: flex;
      width: 100%;
      justify-content: space-between;
      gap: 20px;
    }
    .err {
      color: red;
    }
  }
`;

export default () => {
  const _firebase = useFirebase();
  const db = _firebase?.db;

  const [parents, setParents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [selectedParent, setSelectedParent] = useState("none");
  const [selectedProject, setSelectedProject] = useState("none");

  useEffect(() => {
    let unsubscribe = () => {};

    const run = async () => {
      const _parents = [];
      const _projects = [];

      const parentsQs = await getDocs(query(collection(db, "parents")));
      parentsQs.forEach((parent) => {
        _parents.push({ ...parent.data(), id: parent.id });
      });
      setParents([..._parents]);

      const projectsQs = await getDocs(query(collection(db, "projects")));
      projectsQs.forEach((project) => {
        _projects.push({ ...project.data(), id: project.id });
      });
      setProjects([..._projects]);
      unsubscribe = onSnapshot(
        query(collection(db, "payments")),
        async (qs) => {
          const _payments = [];
          qs.forEach((payment) => {
            _payments.push({ ...payment.data(), id: payment.id });
          });
          for (let payment of _payments) {
            const parent = _parents.find((p) => p.id == payment.parentId);
            const project = _projects.find((p) => p.id == payment.projectId);
            payment.parent = parent;
            payment.project = project;

            payment.parentChieldName = parent.childName;
            payment.projectName = project.name;
            payment.projectCost = project.cost;
          }
          setData([..._payments]);
        }
      );
    };

    run();

    return unsubscribe;
  }, []);

  const headers = [
    {
      id: "parentChieldName",
      name: "Nume Copil",
      isMain: true,
    },
    {
      id: "projectName",
      name: "Nume Proiect",
      isMain: true,
    },
    {
      id: "projectCost",
      name: "Cost Proiect",
      isMain: false,
    },
  ];

  const handlePaymentModalOpen = () => {
    setAddModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setAddModalOpen(false);
  };

  const handlePaymentCreate = async (e) => {
    e.preventDefault();
    if (selectedParent == "none") {
      setErrMsg("Please select a parent");
    } else {
      if (selectedProject == "none") {
        setErrMsg("Please select a project");
      } else {
        await addDoc(collection(db, "payments"), {
          parentId: selectedParent,
          projectId: selectedProject,
        });

        setSelectedParent("none");
        setSelectedProject("none");
        setAddModalOpen(false);
      }
    }
  };

  return (
    <Layout>
      <StyledPayments>
        <Button onClick={handlePaymentModalOpen}>Add Payment</Button>
        <br />
        <br />
        <Table data={data} headers={headers} />
        <Modal
          title="Create new parent"
          isOpen={addModalOpen}
          handleClose={handlePaymentModalClose}
        >
          <form onSubmit={handlePaymentCreate}>
            <label>
              <span>Parent:</span>
              <select
                onChange={(e) => {
                  setSelectedParent(e.target.value);
                }}
                value={selectedParent}
              >
                <option value="none">Select One</option>
                {parents.map((parent) => (
                  <option key={parent.id} value={parent.id}>
                    {parent.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Project:</span>
              <select
                onChange={(e) => {
                  setSelectedProject(e.target.value);
                }}
                value={selectedProject}
              >
                <option value="none">Select One</option>
                {projects
                  .filter(
                    (prj) =>
                      selectedParent != "none" &&
                      !data.find(
                        (d) =>
                          d.parent.id == selectedParent &&
                          d.project.id == prj.id
                      )
                  )
                  .map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
              </select>
            </label>

            {errMsg && <div className="err"> {errMsg}</div>}
            <button type="submit">Add Payment</button>
          </form>
        </Modal>
      </StyledPayments>
    </Layout>
  );
};
