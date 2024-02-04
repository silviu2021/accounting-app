import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import Table from "../components/common/Table";
import { useFirebase } from "../components/contexts/Firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

export default () => {
  const _firebase = useFirebase();
  const db = _firebase?.db;

  const [data, setData] = useState([]);

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

  return (
    <Layout>
      <Table data={data} headers={headers} />
    </Layout>
  );
};
