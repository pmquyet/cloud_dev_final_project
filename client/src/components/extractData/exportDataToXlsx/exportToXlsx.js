import Excel from 'exceljs'
import * as fs from 'file-saver'
import _ from 'lodash'

export const ExportToExcel = async (data) => {
  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet('data_export')

  worksheet.columns = [
    { header: 'ClientRef', key: 'ClientRef', width: 50 },
    { header: `LOCATION`, key: 'LOCATION', width: 25 },
    { header: `DATE_CAST`, key: 'DATE_CAST', width: 25 },
    { header: `SUPPLIER`, key: 'SUPPLIER', width: 25 },
    { header: 'AGE_AT_TEST', key: 'AGE_AT_TEST', width: 25 },
    { header: 'GRADE', key: 'GRADE', width: 20 },
    { header: 'SPECIFIED_STRENGTH', key: 'SPECIFIED_STRENGTH', width: 25 },
    { header: 'AVERAGE_STRESS', key: 'AVERAGE_STRESS', width: 25 },
    { header: 'MAX_LOAD', key: 'MAX_LOAD', width: 25 },
    { header: 'STRESS_FALURE', key: 'STRESS_FALURE', width: 25 },
    { header: 'MODE_OF_FAILURE', key: 'MODE_OF_FAILURE', width: 25 },
    { header: 'DATE_TESTED', key: 'DATE_TESTED', width: 25 }
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
