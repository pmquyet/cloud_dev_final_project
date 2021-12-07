function column_definition() {
  const columns = [
    {
      key: "ClientRef",
      dataIndex: "ClientRef",
      title: "CUBE REF.NO",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.ClientRef.length - b.ClientRef.length,
    },
    {
      key: "DATE_CAST",
      dataIndex: "DATE_CAST",
      title: "DATE_CAST",
      sorter: (a, b) => new Date(a.DATE_CAST) - new Date(b.DATE_CAST),
      sortDirections: ["descend", "ascend"],
      // sortable: true,
      // width: 125,
    },
    {
      key: "SUPPLIER",
      dataIndex: "SUPPLIER",
      title: "SUPPLIER",
      // width: 175,
    },
    {
      key: "LOCATION",
      dataIndex: "LOCATION",
      title: "LOCATION",
      // sortable: true,
      // width: 250,
    },
    {
      key: "DATE_TESTED",
      dataIndex: "DATE_TESTED",
      // sortable: true,
      title: "DATE_TESTED",
      // width: 125,
    },
    {
      key: "CUBE_DIMENSION",
      dataIndex: "CUBE_DIMENSION",
      title: "CUBE SIZE",
      width: 150,
    },
    {
      key: "GRADE",
      dataIndex: "GRADE",
      title: "GRADE",
      // , width: 75
    },

    {
      key: "MODE_OF_FAILURE",
      dataIndex: "MODE_OF_FAILURE",
      title: "MODE_OF_FAILURE",
      width: 200,
    },
    {
      key: "SPECIFIED_STRENGTH",
      dataIndex: "SPECIFIED_STRENGTH",
      // sortable: true,
      title: "SPECIFIED_STRENGTH",
      // width: 175,
    },
    {
      key: "AVERAGE_STRESS",
      dataIndex: "AVERAGE_STRESS",
      title: "AVERAGE_STRESS",
      // width: 175,
    },
    {
      key: "AGE_AT_TEST",
      dataIndex: "AGE_AT_TEST",
      // sortable: true,
      title: "AGE_AT_TEST",
      // width: 150,
    },
    {
      key: "STRESS_FALURE",
      dataIndex: "STRESS_FALURE",
      // sortable: true,
      title: "STRESS_FALURE",
      // width: 150,
    },
    {
      key: "MAX_LOAD",
      dataIndex: "MAX_LOAD",
      title: "MAX_LOAD",
      // , width: 150
    },
    {
      key: "S3FILE_ID",
      dataIndex: "S3FILE_ID",
      // sortable: true,
      title: "S3FILE_ID",
      render: (text, record) => (
        <a onClick={() => console.log(record)}>{text}</a>
      ),
    },
  ];
  return columns;
}

export default column_definition;
