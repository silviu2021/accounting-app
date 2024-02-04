import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../Layout";
import Table from "../components/common/Table";
import { useFirebase } from "../components/contexts/Firebase";
import {
  getDocs,
  doc,
  getDoc,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";

export default () => {
  const _firebase = useFirebase();
  const db = _firebase?.db;

  const [parents, setParents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

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

  const handlePaymentModalOpen = () => {
    setAddModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setAddModalOpen(false);
  };

  const handlePaymentCreate = async (e) => {
    e.preventDefault();
    // if (name.length < 3) {
    //   setErrMsg("Please set name for the parent");
    // } else {
    //   if (childName.length < 3) {
    //     setErrMsg("Please set name for the chield");
    //   } else {
    //     await addDoc(collection(db, "parents"), {
    //       childName: childName,
    //       email: email,
    //       phone: phone,
    //       name: name,
    //     });

    //     setName("");
    //     setChildName("");
    //     setPhone("");
    //     setEmail("");
    //     setAddModalOpen(false);
    //   }
    // }
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
            {/* <label>
              <span>Nume:</span>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
              />
            </label>
            <label>
              <span>Nume Copil:</span>
              <input
                onChange={(e) => {
                  setChildName(e.target.value);
                }}
                value={childName}
                type="text"
              />
            </label>

            <label>
              <span>Email:</span>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="text"
              />
            </label>

            <label>
              <span>Telefon:</span>
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                type="text"
              />
            </label>
            {errMsg && <div className="err"> {errMsg}</div>} */}
            <button type="submit">Add Payment</button>
          </form>
        </Modal>
      </StyledPayments>
    </Layout>
  );
};
