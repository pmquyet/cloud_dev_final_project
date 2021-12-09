import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Upload, message, Progress } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { createFormParser } from '../../../api/formparser-api'

import '../../../App.css'

import connectToAWS from '../connectToAWS'
import { changeStatus } from '../redux/extractDataSlice'
import { addData } from '../redux/tempDataSlice'
import { getUploadUrl, uploadFile } from '../../../api/formparser-api'

const { Dragger } = Upload
const cAWS = connectToAWS()

function ExtractFormData() {
  const { getIdTokenClaims } = useAuth0()
  const [listFiles, setlistFiles] = useState([])
  const [percent, setPercent] = useState(0)
  const [formData, setFormData] = useState()
  const [fname, setFileName] = useState()

  const shownPanel = useSelector((state) => state.shownExtractPanel.value)
  const tempData = useSelector((state) => state.tempData.listData)
  const dispatch = useDispatch()

  const [tokenID, setTokenID] = useState()

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        // const accessToken = await getAccessTokenSilently()
        const res_tokenid = await getIdTokenClaims()
        const token_id = res_tokenid.__raw
        setTokenID(token_id)
        console.log(token_id)
      } catch (e) {
        console.log(e.message)
      }
    }

    getUserMetadata()
  }, [])

  const handleClick = async (e) => {
    e.preventDefault()
    if (listFiles.length > 0) {
      const file = listFiles[0]
      const filename = file.name.replace(/\s/g, '')
      setFileName(filename)
      const uploadUrl = await getUploadUrl(tokenID, filename)
      setPercent(15)
      await uploadFile(uploadUrl, file)
      setPercent(50)

      const resTextract = fetch(
        'https://vr5x8w4q7l.execute-api.ap-southeast-1.amazonaws.com/Production/ocr',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application.json'
          },
          body: JSON.stringify(filename)
        }
      )
        .then((r1) => r1.json())
        .then((data) => {
          console.log('DATA FOUND: ', data.body)
          const dataBody = data.body[0]
          setFormData(dataBody)
          dataBody.forEach((data) => {
            dispatch(addData([data, filename]))
          })
          dispatch(changeStatus(2))
          console.log('temp ' + tempData)
          setPercent(100)
          message.success('Data processing has done!')
        })
    } else {
      alert('Ayoh, Select files first lah!')
    }
  }

  const handleApply = async () => {
    if (formData.length > 0) {
      const datas = formData.map(async (data) => {
        let fp = {
          ClientRef: data[0],
          LOCATION: data[1],
          DATE_CAST: data[2],
          SUPPLIER: data[4],
          AGE_AT_TEST: data[5],
          GRADE: data[6],
          SPECIFIED_STRENGTH: data[7],
          AVERAGE_STRESS: data[8],
          CUBE_DIMENSION: data[9],
          MAX_LOAD: data[10],
          STRESS_FALURE: data[11],
          MODE_OF_FAILURE: data[12],
          DATE_TESTED: data[13],
          S3FILE_ID: fname
        }
        return new Promise((data, err1) => {
          createFormParser(tokenID, fp)
        })
      })
      await Promise.all(datas)
      message.success('Data has saved!')
    }
  }
  const props = {
    multiple: true,
    onRemove: (file) => {
      const index = listFiles.indexOf(file)
      const newFileList = listFiles.slice()
      newFileList.splice(index, 1)

      return setlistFiles(newFileList)
    },
    beforeUpload: (file) => {
      setlistFiles([...listFiles, file])
      return false
    },
    listFiles
  }

  return (
    <div>
      <div>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag 1 file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Upload scanned cube test form. Accepted .jpg .png .pdf format.
          </p>
        </Dragger>
        ,
      </div>

      <div
        style={{
          width: '100%',
          textAlign: 'center',
          // position: "absolute",
          bottom: 0
        }}
      >
        <Progress percent={percent} />
        <p />
        {shownPanel < 2 ? (
          <Button
            type="primary"
            block
            onClick={(event) => {
              handleClick(event)
            }}
          >
            Processing
          </Button>
        ) : (
          <Button type="contained" block disabled>
            Processed
          </Button>
        )}
        <p />
        <Button
          block
          type="primary"
          onClick={() => {
            // InsertMultipleRowToDbTable(docClient, tempData)
            handleApply()
            dispatch(changeStatus(3))
          }}
        >
          Save Data To System
        </Button>
        <p />
        <Button
          block
          type="primary"
          onClick={() => {
            console.log('ERM YOU CHANGE STATUS TO 0')
            dispatch(changeStatus(0))
          }}
        >
          Close
        </Button>
      </div>
    </div>
  )
}

export default ExtractFormData
