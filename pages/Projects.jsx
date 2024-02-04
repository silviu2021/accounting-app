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

  return (
    <Layout>
      <Table data={data} headers={headers} />
    </Layout>
  );
};
