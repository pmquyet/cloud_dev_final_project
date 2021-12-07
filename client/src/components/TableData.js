import React, { Fragment } from 'react'
import axios from 'axios'
import { Button } from 'antd'

const TableData = () => {
  const getData = async () => {
    const json = JSON.stringify({
      username: 'wohhup',
      password: '@RWtr67a!q'
    })

    const get_token = await axios
      .post(
        'https://cors-anywhere.herokuapp.com/https://apptest.panunited.com.sg/ccapi/login',
        json,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .catch((err) => {
        console.log('errror token', err)
      })

    console.log(get_token)

    if (get_token !== undefined) {
      const Token = get_token.data.jwtToken
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        }
      }

      let data_eachday = []
      let raw_data = []

      for (let i = 0; i < 25; i++) {
        const bodyParameters = {
          projectCode: 'C821A',
          data: {
            submittedFrom: `${i}/11/2021 00:00:00`
          }
        }

        data_eachday = await axios
          .post(
            'https://cors-anywhere.herokuapp.com/https://apptest.panunited.com.sg/ccapi/do-info',

            bodyParameters,
            config
          )
          .catch((err) => {
            console.log('errror list do', err)
          })

        raw_data = raw_data.concat(data_eachday.data.data)
      }
      console.log(`Total got ${raw_data.length} dos`)
      console.log(raw_data)
    }
  }

  return (
    <div>
      <Button onClick={() => getData()}>Click to get data</Button>
    </div>
  )
}

export default TableData
