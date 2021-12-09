import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Modal } from 'antd'
import { useAuth0 } from '@auth0/auth0-react'
import '../../../App.css'
import insertRowToDdbTable from '../aws_dynamoDb/handleTable'
import connectToAWS from '../connectToAWS'
import { getFormParsers } from '../../../api/formparser-api'
import { getSignedUrl } from '../../../api/formparser-api'

const cAWS = connectToAWS()
var s3 = new cAWS.S3()

function TableRecord() {
  const [data_cb, setdata_cb] = useState([])
  const shownPanel = useSelector((state) => state.shownExtractPanel.value)
  const tempdata = useSelector((state) => state.tempData.listData)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [tokenID, setTokenID] = useState()
  const dispatch = useDispatch()
  const { getIdTokenClaims } = useAuth0()
  //useEffect for 1st loading, data will fetch at first screen
  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const res_tokenid = await getIdTokenClaims()
        const token_id = res_tokenid.__raw
        setTokenID(token_id)
        const fplist = await getFormParsers(token_id)
        setdata_cb(fplist)
      } catch (e) {
        console.log(e.message)
      }
    }
    getUserMetadata()
  }, [shownPanel])

  const getImage = async (filename) => {
    try {
      const openUrl = await getSignedUrl(tokenID, filename)
      const url = openUrl.uploadUrl
      window.open(url)
    } catch (error) {}

    // var presignedGETURL = s3.getSignedUrl(
    //   'getObject',
    //   {
    //     Bucket: process.env.REACT_APP_AWS_S3_BUCKETNAME_CUBETEST,
    //     Key: filename, //filename
    //     Expires: 360 //time to expire in seconds
    //   },
    //   (err, url) => {
    //     if (err) throw err
    //     window.open(url)
    //   }
    // )
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
