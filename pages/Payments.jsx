import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import Table from "../components/common/Table";
import { useFirebase } from "../components/contexts/Firebase";
import { doc, getDoc, collection, onSnapshot, query } from "firebase/firestore";

export default () => {
  const _firebase = useFirebase();
  const db = _firebase?.db;

  const [data, setData] = useState([]);

  useEffect(
    () =>
      onSnapshot(query(collection(db, "payments")), async (qs) => {
        const _payments = [];
        qs.forEach((payment) => {
          _payments.push({ ...payment.data(), id: payment.id });
        });
        for (let payment of _payments) {
          const parent = (
            await getDoc(doc(db, "parents", payment.parentId))
          ).data();
          const project = (
            await getDoc(doc(db, "projects", payment.projectId))
          ).data();
          payment.parent = parent;
          payment.project = project;

          payment.parentChieldName = parent.childName;
          payment.projectName = project.name;
          payment.projectCost = project.cost;
        }
        setData([..._payments]);
      }),
    []
  );

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

  return (
    <Layout>
      <Table data={data} headers={headers} />
    </Layout>
  );
};
