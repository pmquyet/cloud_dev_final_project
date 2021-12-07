import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Layout, Button, Row, Col, Space } from 'antd'

import '../../App.css'
import ExtractFormData from './component/extractFormData'
import TableRecord from './component/tableRecord'
import { changeStatus } from './redux/extractDataSlice'

const { Header, Footer, Content } = Layout

function ExtractDataApp() {
  const shownPanel = useSelector((state) => state.shownExtractPanel.value)
  const dispatch = useDispatch()

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

export default ExtractDataApp
