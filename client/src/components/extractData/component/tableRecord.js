import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Modal } from 'antd'

import '../../../App.css'
import insertRowToDdbTable from '../aws_dynamoDb/handleTable'
import connectToAWS from '../connectToAWS'

const cAWS = connectToAWS()
const dynamodb = new cAWS.DynamoDB()
var s3 = new cAWS.S3()

function TableRecord() {
  const [data_cb, setdata_cb] = useState([])
  const shownPanel = useSelector((state) => state.shownExtractPanel.value)
  const tempdata = useSelector((state) => state.tempData.listData)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const dispatch = useDispatch()

  //useEffect for 1st loading, data will fetch at first screen
  useEffect(() => {
    var docClient = new cAWS.DynamoDB.DocumentClient()
    var paramsdb = {
      TableName: 'CubeTestData'
    }
    docClient.scan(paramsdb, function (err, data) {
      if (err) {
        console.log(
          'Unable to query. Error: ' + '\n' + JSON.stringify(err, undefined, 2)
        )
      } else {
        console.log(
          'Data get form AWS DynamoDB: ' +
            '\n' +
            JSON.stringify(data, undefined, 2)
        )
        var data1 = data.Items
        setdata_cb(data1)
      }
    })
  }, [shownPanel])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const getImage = (filename) => {
    var presignedGETURL = s3.getSignedUrl(
      'getObject',
      {
        Bucket: process.env.REACT_APP_AWS_S3_BUCKETNAME_CUBETEST,
        Key: filename, //filename
        Expires: 360 //time to expire in seconds
      },
      (err, url) => {
        if (err) throw err
        window.open(url)
      }
    )
  }

  const columns = [
    {
      key: 'ClientRef',
      dataIndex: 'ClientRef',
      title: 'Ref.No',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.ClientRef.length - b.ClientRef.length
    },
    {
      key: 'DATE_CAST',
      dataIndex: 'DATE_CAST',
      title: 'Date',
      sorter: (a, b) => new Date(a.DATE_CAST) - new Date(b.DATE_CAST),
      sortDirections: ['descend', 'ascend'],
      sortable: true
      // width: 125,
    },
    {
      key: 'SUPPLIER',
      dataIndex: 'SUPPLIER',
      title: 'Supplier',
      width: 175
    },
    {
      key: 'LOCATION',
      dataIndex: 'LOCATION',
      title: 'Location',
      sortable: true
      // width: 250,
    },
    {
      key: 'DATE_TESTED',
      dataIndex: 'DATE_TESTED',
      sortable: true,
      title: 'Date test'
      // width: 125,
    },
    {
      key: 'CUBE_DIMENSION',
      dataIndex: 'CUBE_DIMENSION',
      title: 'Cube Size'
      // width: 150,
    },
    {
      key: 'GRADE',
      dataIndex: 'GRADE',
      title: 'Grade',
      width: 75
    },

    {
      key: 'MODE_OF_FAILURE',
      dataIndex: 'MODE_OF_FAILURE',
      title: 'Failure mode'
      // width: 200,
    },
    {
      key: 'SPECIFIED_STRENGTH',
      dataIndex: 'SPECIFIED_STRENGTH',
      // sortable: true,
      title: 'Specified strength'
      // width: 175,
    },
    {
      key: 'AVERAGE_STRESS',
      dataIndex: 'AVERAGE_STRESS',
      title: 'Ave Stress'
      // width: 175,
    },
    {
      key: 'AGE_AT_TEST',
      dataIndex: 'AGE_AT_TEST',
      // sortable: true,
      title: 'Test age',
      width: 90
    },
    {
      key: 'STRESS_FALURE',
      dataIndex: 'STRESS_FALURE',
      // sortable: true,
      title: 'Stress failure'
      // width: 150,
    },
    {
      key: 'MAX_LOAD',
      dataIndex: 'MAX_LOAD',
      title: 'Max load'
      // width: 150,
    },
    {
      key: 'S3FILE_ID',
      dataIndex: 'S3FILE_ID',
      sortable: true,
      title: 'Origin form',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.S3FILE_ID.localeCompare(b.S3FILE_ID),
      render: (text, record) => <a onClick={() => getImage(text)}>{text}</a>
    }
  ]
  function onChange(pagination, sorter, extra) {
    console.log('params', pagination, sorter, extra)
  }

  return (
    <div>
      <Table
        size="small"
        dataSource={!shownPanel ? data_cb : tempdata}
        columns={columns}
        onChange={onChange}
        scroll={{ y: 'calc(90vh - 6em)' }}
        // style={{ width: "auto" }}
      />
    </div>
  )
}

export default TableRecord
