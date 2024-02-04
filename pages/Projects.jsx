import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import Table from "../components/common/Table";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import styled from "styled-components";
import { useFirebase } from "../components/contexts/Firebase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";

const StyledProjects = styled.div`
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

  const [data, setData] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleProjectModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleProjectModalClose = () => {
    setAddModalOpen(false);
  };

  useEffect(
    () =>
      onSnapshot(query(collection(db, "projects")), (qs) => {
        const _projects = [];
        qs.forEach((project) => {
          _projects.push({ ...project.data(), id: project.id });
        });
        setData([..._projects]);
      }),
    []
  );

  const headers = [
    {
      id: "name",
      name: "Nume",
      isMain: true,
    },
    {
      id: "cost",
      name: "Cost",
      isMain: true,
    },
    {
      id: "description",
      name: "Descriere",
      isMain: false,
    },
  ];

  const [errMsg, setErrMsg] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [description, setDescription] = useState("");

  const handleProjectCreate = async (e) => {
    e.preventDefault();
    if (!cost) {
      setErrMsg("Please set a cost");
    } else {
      if (name.length < 3) {
        setErrMsg("Please set name for the project");
      } else {
        await addDoc(collection(db, "projects"), {
          name: name,
          cost: cost,
          description: description,
        });

        setName("");
        setCost(0);
        setDescription("");
        setAddModalOpen(false);
      }
    }
  };

  return (
    <Layout>
      <StyledProjects>
        <Button onClick={handleProjectModalOpen}>Add Project</Button>
        <br />
        <br />
        <Table data={data} headers={headers} />
        <Modal
          title="Create new project"
          isOpen={addModalOpen}
          handleClose={handleProjectModalClose}
        >
          <form onSubmit={handleProjectCreate}>
            <label>
              <span>Name:</span>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
              />
            </label>

            <label>
              <span>Cost:</span>
              <input
                onChange={(e) => {
                  setCost(e.target.value);
                }}
                value={cost}
                type="number"
              />
            </label>
            <label>
              <span>Description:</span>
              <textarea
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              ></textarea>
            </label>
            {errMsg && <div className="err"> {errMsg}</div>}
            <button type="submit">Add Project</button>
          </form>
        </Modal>
      </StyledProjects>
    </Layout>
  );
};
