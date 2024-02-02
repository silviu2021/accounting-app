import Layout from "../Layout";
import Table from "../components/common/Table";

export default () => {
  const data = [
    {
      id: "lsdkfmlsd",
      cost: 200,
      desactiption: "alkdsmnlaskn",
      name: "excursie zoo",
    },
    {
      id: "lsdkfmlacsdsd",
      cost: 300,
      desactiption: "test test",
      name: "excursie plaja",
    },
  ];

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
