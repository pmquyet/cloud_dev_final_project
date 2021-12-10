import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, message, Popconfirm } from 'antd'
import { useAuth0 } from '@auth0/auth0-react'
import '../../../App.css'

import connectToAWS from '../connectToAWS'
import { getFormParsers } from '../../../api/formparser-api'
import { getSignedUrl } from '../../../api/formparser-api'
import { deleteFormParser, patchFormParser } from '../../../api/formparser-api'
import { EditFormParser } from './editFormParser'

function TableRecord() {
  const [data_cb, setdata_cb] = useState([])
  const [refresh, setRefesh] = useState(true)
  const [editItem, setEditItem] = useState()
  const shownPanel = useSelector((state) => state.shownExtractPanel.value)
  const tempdata = useSelector((state) => state.tempData.listData)

  const [tokenID, setTokenID] = useState()
  const dispatch = useDispatch()
  const { getIdTokenClaims } = useAuth0()

  const [visible, setVisible] = useState(false)

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
  }, [shownPanel, refresh])

  const getImage = async (filename) => {
    try {
      const openUrl = await getSignedUrl(tokenID, filename)
      console.log(openUrl)
      window.open(openUrl)
    } catch (error) {}
  }

  const handleDeleteFormParserItem = async (id) => {
    const del = await deleteFormParser(tokenID, id)
    setRefesh(!refresh)
    message.success(`Item with ID: ${id} was deleted.`)
  }

  const handleEdit = async (item) => {
    setEditItem(item)
    setVisible(true)
  }

  const handleEditOk = async (values) => {
    console.log('Received values of form: ', values)
    const editedItem = {
      userId: editItem.userId,
      id: editItem.id,
      createdAt: editItem.createdAt,
      ClientRef: values.RefNo,
      AGE_AT_TEST: values.AGE_AT_TEST,
      AVERAGE_STRESS: values.AVERAGE_STRESS,
      CUBE_DIMENSION: values.CUBE_DIMENSION,
      DATE_CAST: values.DATE_CAST,
      DATE_TESTED: values.DATE_TESTED,
      GRADE: values.GRADE,
      LOCATION: values.LOCATION,
      MAX_LOAD: values.MAX_LOAD,
      MODE_OF_FAILURE: values.MODE_OF_FAILURE,
      SPECIFIED_STRENGTH: values.SPECIFIED_STRENGTH,
      STRESS_FALURE: values.STRESS_FALURE,
      SUPPLIER: values.SUPPLIER,
      S3FILE_ID: editItem.S3FILE_ID
    }
    await patchFormParser(tokenID, editedItem)

    setVisible(false)

    setRefesh(!refresh)
    message.success(`Item with original Ref: ${values.RefNo} was updated.`)
    setEditItem()
  }

  const columns = [
    {
      key: 'ClientRef',
      dataIndex: 'ClientRef',
      title: 'Ref.No',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.ClientRef.length - b.ClientRef.length,
      width: 150
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
      title: 'Max load',
      width: 100
    },
    {
      key: 'S3FILE_ID',
      dataIndex: 'S3FILE_ID',
      sortable: true,
      title: 'Origin form',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.S3FILE_ID.localeCompare(b.S3FILE_ID),
      render: (text, record) => <a onClick={() => getImage(text)}>{text}</a>
    },
    {
      title: 'Delete',
      key: 'Delete',
      render: (text, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDeleteFormParserItem(record.id)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
      width: 75
    },
    {
      title: 'Edit',
      key: 'Edit',
      render: (text, record) => <a onClick={() => handleEdit(record)}>Edit</a>,
      width: 75
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

      <EditFormParser
        visible={visible}
        editItem={editItem}
        onCreate={handleEditOk}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </div>
  )
}

export default TableRecord
