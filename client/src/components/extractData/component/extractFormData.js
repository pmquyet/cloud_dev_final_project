import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button, Divider, Upload, message, Progress } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import axios from 'axios'

import '../../../App.css'
import InsertMultipleRowToDbTable from '../aws_dynamoDb/InsertMultipleRowToDbTable'
import Upload_Single_Files_To_S3 from '..//aws_s3/upload_single_file'
import postToAwsTextract from '../aws_textract/postToTextract'
import connectToAWS from '../connectToAWS'
import { changeStatus } from '../redux/extractDataSlice'
import { addData } from '../redux/tempDataSlice'

const { Dragger } = Upload
const cAWS = connectToAWS()

function ExtractFormData() {
  const [imageURL, setImageURL] = useState('')
  const [fileNames, setFileNames] = useState([])
  const [listFiles, setlistFiles] = useState([])
  const [percent, setPercent] = useState(0)

  const shownPanel = useSelector((state) => state.shownExtractPanel.value)
  const tempData = useSelector((state) => state.tempData.listData)
  const dispatch = useDispatch()

  var s3 = new cAWS.S3()
  var dynamodb = new cAWS.DynamoDB()
  var docClient = new cAWS.DynamoDB.DocumentClient()

  const handleDrop = (acceptedFiles) => {
    setFileNames(acceptedFiles.map((file) => file.name))
    setlistFiles(acceptedFiles)
  }

  const handleClick = async (e) => {
    e.preventDefault()
    if (listFiles.length > 0) {
      const increase = 100 / listFiles.length
      var progress = 0
      await Promise.all(
        listFiles.map(async (file) => {
          const paramss3 = {
            Bucket: process.env.REACT_APP_AWS_S3_BUCKETNAME_CUBETEST,
            Key: file.name, //filename
            Body: file,
            ContentType: 'image/png',
            Expires: 3600 //time to expire in seconds
          }

          s3.getSignedUrl('putObject', paramss3, function (err, url) {
            axios({
              method: 'put',
              url,
              data: file,
              headers: {
                'Content-Type': 'image/png'
              }
            })
              .then((result) => {
                console.log('START RUNNING TEXTRACT')
                const resTextract = fetch(
                  'https://vr5x8w4q7l.execute-api.ap-southeast-1.amazonaws.com/Production/ocr',
                  {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application.json'
                    },
                    body: JSON.stringify(file.name)
                  }
                )
                  .then((r1) => r1.json())
                  .then((data) => {
                    console.log('DATA FOUND: ', data.body)
                    const dataBody = data.body[0]
                    dataBody.forEach((data) => {
                      dispatch(addData([data, file.name]))
                    })
                    dispatch(changeStatus(2))
                    //let result = objArray.map((a) => a.foo);
                    console.log('temp ' + tempData)
                    progress = progress + increase
                    setPercent(progress)
                  })
              })
              .catch((err) => {
                console.log('err', err)
              })
          })
        })
      )
    } else {
      alert('Ayoh, Select files first lah!')
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
            Click or drag file to this area to upload
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
            InsertMultipleRowToDbTable(docClient, tempData)
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
