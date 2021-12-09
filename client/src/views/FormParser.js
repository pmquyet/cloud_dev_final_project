import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { Layout, Button, Row, Col, Space } from 'antd'

import '../App.css'
import ExtractFormData from '../components/extractData/component/extractFormData'
import TableRecord from '../components/extractData/component/tableRecord'
import { changeStatus } from '../components/extractData/redux/extractDataSlice'
import { ExportToExcel } from '../components/extractData/exportDataToXlsx/exportToXlsx'
import { getFormParsers } from '../api/formparser-api'

const { Footer, Content } = Layout

const FormParser = () => {
  const { getIdTokenClaims } = useAuth0()
  const [tokenID, setTokenID] = useState()

  const shownPanel = useSelector((state) => state.shownExtractPanel.value)
  const dispatch = useDispatch()

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const res_tokenid = await getIdTokenClaims()
        const token_id = res_tokenid.__raw
        setTokenID(token_id)
      } catch (e) {
        console.log(e.message)
      }
    }
    getUserMetadata()
  }, [shownPanel])

  const handleExport = async () => {
    const fplist = await getFormParsers(tokenID)
    ExportToExcel(fplist)
    // const createFP = await createFormParser(tokenID, fp)
  }

  return (
    <div>
      <Layout>
        <Content>
          <Row>
            <Col span={24}>
              <Space size="middle">
                <Button
                  type="primary"
                  disabled={shownPanel == 0 ? false : true}
                  onClick={() => dispatch(changeStatus(1))}
                >
                  Process New Data
                </Button>
                <Button color="primary">Export To Excel</Button>

                {/* <Button color="primary" onClick={() => handleGetData()}>
                  Test with DynamoDB
                </Button> */}
              </Space>
            </Col>
          </Row>

          <Row>
            <Col span={shownPanel == 0 ? 24 : 16}>
              <TableRecord />
            </Col>

            {shownPanel != 0 ? (
              <Col span={6}>
                <h2 className="App-header-body">UPLOAD FILE</h2>
                <ExtractFormData />
              </Col>
            ) : null}
          </Row>
        </Content>

        <Footer
          fixedPosition
          style={{
            textAlign: 'center',
            position: 'absolute',
            bottom: '0',
            left: 0,
            right: 0
          }}
        >
          Demo of parse scan form data to table.
        </Footer>
      </Layout>
    </div>
  )
}

export default FormParser
