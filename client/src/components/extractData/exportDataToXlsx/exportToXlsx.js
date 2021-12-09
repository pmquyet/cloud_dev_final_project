import Excel from 'exceljs'
import * as fs from 'file-saver'
import _ from 'lodash'

export const ExportToExcel = async (data) => {
  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet('data_export')

  worksheet.columns = [
    { header: 'ClientRef', key: 'ClientRef', width: 25 },
    { header: `LOCATION`, key: 'LOCATION', width: 30 },
    { header: `DATE_CAST`, key: 'DATE_CAST', width: 15 },
    { header: `SUPPLIER`, key: 'SUPPLIER', width: 15 },
    { header: 'AGE_AT_TEST', key: 'AGE_AT_TEST', width: 15 },
    { header: 'GRADE', key: 'GRADE', width: 15 },
    { header: 'SPECIFIED_STRENGTH', key: 'SPECIFIED_STRENGTH', width: 15 },
    { header: 'AVERAGE_STRESS', key: 'AVERAGE_STRESS', width: 15 },
    { header: 'MAX_LOAD', key: 'MAX_LOAD', width: 15 },
    { header: 'STRESS_FALURE', key: 'STRESS_FALURE', width: 15 },
    { header: 'MODE_OF_FAILURE', key: 'MODE_OF_FAILURE', width: 15 },
    { header: 'DATE_TESTED', key: 'DATE_TESTED', width: 15 }
  ]

  data.forEach((d) => {
    let row = worksheet.addRow(d)
  })

  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    fs.saveAs(blob, 'Summary_Data.xlsx')
  })
}
