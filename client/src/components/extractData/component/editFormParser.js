import React, { useState } from 'react'
import { Button, Modal, Form, Input, Radio } from 'antd'

export const EditFormParser = ({ visible, editItem, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  const layout = {
    labelCol: {
      span: 7
    },
    wrapperCol: {
      span: 17
    }
  }
  return (
    <Modal
      visible={visible}
      title="Update the Cube Test"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        size="small"
        initialValues={
          editItem !== undefined
            ? {
                RefNo: `${editItem.ClientRef}`,
                DATE_CAST: `${editItem.DATE_CAST}`,
                DATE_TESTED: `${editItem.DATE_TESTED}`
              }
            : null
        }
      >
        <Form.Item name="RefNo" label="Client Reference:">
          <Input />
        </Form.Item>

        <Form.Item name="DATE_CAST" label="DATE CAST:">
          <Input />
        </Form.Item>

        <Form.Item name="DATE_TESTED" label="DATE TESTED:">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
