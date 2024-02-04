import { useState, useEffect } from "react";
import Layout from "../Layout";
import Table from "../components/common/Table";
import styled from "styled-components";
import { useFirebase } from "../components/contexts/Firebase";
import {
  addDoc,
  getDocs,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";

const StyledDashBoard = styled.div``;

export default () => {
  const _firebase = useFirebase();
  const db = _firebase?.db;

  const [data, setData] = useState([]);

  const [parents, setParents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    let unsubscribe = () => {};

    const run = async () => {
      const parentsUnsubscribe = onSnapshot(
        query(collection(db, "parents")),
        async (qs) => {
          const _parents = [];
          qs.forEach((parent) => {
            _parents.push({ ...parent.data(), id: parent.id });
          });
          setParents([..._parents]);
        }
      );

      const projectsUnsubscribe = onSnapshot(
        query(collection(db, "projects")),
        async (qs) => {
          const _projects = [];
          qs.forEach((project) => {
            _projects.push({ ...project.data(), id: project.id });
          });
          setProjects([..._projects]);
        }
      );

      const paymentsUnsubscribe = onSnapshot(
        query(collection(db, "payments")),
        async (qs) => {
          const _payments = [];
          qs.forEach((payment) => {
            _payments.push({ ...payment.data(), id: payment.id });
          });
          setPayments([..._payments]);
        }
      );

      unsubscribe = () => {
        parentsUnsubscribe();
        projectsUnsubscribe();
        paymentsUnsubscribe();
      };
    };

    run();

    return () => {
      unsubscribe();
    };
  });

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
      <StyledDashBoard>
        <Table data={data} headers={headers} />
      </StyledDashBoard>
    </Layout>
  );
};
