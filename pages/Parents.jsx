import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import Table from "../components/common/Table";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import styled from "styled-components";
import { useFirebase } from "../components/contexts/Firebase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";

const StyledParents = styled.div`
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

  const handleParentModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleParentModalClose = () => {
    setAddModalOpen(false);
  };

  useEffect(
    () =>
      onSnapshot(query(collection(db, "parents")), (qs) => {
        const _parents = [];
        qs.forEach((parent) => {
          _parents.push({ ...parent.data(), id: parent.id });
        });
        setData([..._parents]);
      }),
    []
  );

  const headers = [
    {
      id: "childName",
      name: "Nume Copil",
      isMain: true,
    },
    {
      id: "name",
      name: "Nume",
      isMain: true,
    },
    {
      id: "email",
      name: "Email",
      isMain: false,
    },
    {
      id: "phone",
      name: "Telefon",
      isMain: false,
    },
  ];

  const [errMsg, setErrMsg] = useState("");
  const [childName, setChildName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleParentCreate = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
      setErrMsg("Please set name for the parent");
    } else {
      if (childName.length < 3) {
        setErrMsg("Please set name for the chield");
      } else {
        await addDoc(collection(db, "parents"), {
          childName: childName,
          email: email,
          phone: phone,
          name: name,
        });

        setName("");
        setChildName("");
        setPhone("");
        setEmail("");
        setAddModalOpen(false);
      }
    }
  };

  return (
    <Layout>
      <StyledParents>
        <Button onClick={handleParentModalOpen}>Add Parent</Button>
        <br />
        <br />
        <Table data={data} headers={headers} />
        <Modal
          title="Create new parent"
          isOpen={addModalOpen}
          handleClose={handleParentModalClose}
        >
          <form onSubmit={handleParentCreate}>
            <label>
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
            {errMsg && <div className="err"> {errMsg}</div>}
            <button type="submit">Add Parent</button>
          </form>
        </Modal>
      </StyledParents>
    </Layout>
  );
};
