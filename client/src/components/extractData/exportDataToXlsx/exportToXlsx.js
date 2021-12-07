const fs = require('fs')
var path = require('path')

var exportToExcel = () => {
  var pathfile = path.join(__dirname, 'templates', 'sample.xlsx')
  //   const data = fs.readFileSync(pathfile);

  // var t = new XlsxTemplate(data);

  // t.substitute(1, {
  //    demo: { extractDate: new Date("2013-01-02") },
  //    revision: 10,
  //    dates: [
  //       new Date("2013-01-01"),
  //       new Date("2013-01-02"),
  //       new Date("2013-01-03"),
  //    ],
  //    planData: [
  //       {
  //          name: "John Smith",
  //          role: { name: "Developer" },
  //          days: [8, 8, 4],
  //       },
  //       {
  //          name: "James Smith",
  //          role: { name: "Analyst" },
  //          days: [4, 4, 4],
  //       },
  //       {
  //          name: "Jim Smith",
  //          role: { name: "Manager" },
  //          days: [4, 4, 4],
  //       },
  //    ],
  // });

  // var newData = t.generate();

  // var sharedStrings = etree
  //       .parse(t.archive.file("xl/sharedStrings.xml").asText())
  //       .getroot(),
  //    sheet1 = etree
  //       .parse(t.archive.file("xl/worksheets/sheet1.xml").asText())
  //       .getroot();

  // // Dimensions should be updated
  // expect(sheet1.find("./dimension").attrib.ref).toEqual("B2:F9");

  // // extract date placeholder - interpolated into string referenced at B4
  // expect(sheet1.find("./sheetData/row/c[@r='B4']").attrib.t).toEqual("s");
  // expect(
  //    sharedStrings
  //       .findall("./si")
  //       [parseInt(sheet1.find("./sheetData/row/c[@r='B4']/v").text, 10)].find(
  //          "t"
  //       ).text
  // ).toEqual("Extracted on 41276");

  // // revision placeholder - cell C4 changed from string to number
  // expect(sheet1.find("./sheetData/row/c[@r='C4']/v").text).toEqual("10");

  // // dates placeholder - added cells
  // expect(sheet1.find("./sheetData/row/c[@r='D6']/v").text).toEqual("41275");
  // expect(sheet1.find("./sheetData/row/c[@r='E6']/v").text).toEqual("41276");
  // expect(sheet1.find("./sheetData/row/c[@r='F6']/v").text).toEqual("41277");

  // // planData placeholder - added rows and cells
  // expect(sheet1.find("./sheetData/row/c[@r='B7']").attrib.t).toEqual("s");
  // expect(
  //    sharedStrings
  //       .findall("./si")
  //       [parseInt(sheet1.find("./sheetData/row/c[@r='B7']/v").text, 10)].find(
  //          "t"
  //       ).text
  // ).toEqual("John Smith");
  // expect(sheet1.find("./sheetData/row/c[@r='B8']").attrib.t).toEqual("s");
  // expect(
  //    sharedStrings
  //       .findall("./si")
  //       [parseInt(sheet1.find("./sheetData/row/c[@r='B8']/v").text, 10)].find(
  //          "t"
  //       ).text
  // ).toEqual("James Smith");
  // expect(sheet1.find("./sheetData/row/c[@r='B9']").attrib.t).toEqual("s");
  // expect(
  //    sharedStrings
  //       .findall("./si")
  //       [parseInt(sheet1.find("./sheetData/row/c[@r='B9']/v").text, 10)].find(
  //          "t"
  //       ).text
  // ).toEqual("Jim Smith");

  // expect(sheet1.find("./sheetData/row/c[@r='C7']").attrib.t).toEqual("s");
  // expect(
  //    sharedStrings
  //       .findall("./si")
  //       [parseInt(sheet1.find("./sheetData/row/c[@r='C7']/v").text, 10)].find(
  //          "t"
  //       ).text
  // ).toEqual("Developer");
  // expect(sheet1.find("./sheetData/row/c[@r='C8']").attrib.t).toEqual("s");
  // expect(
  //    sharedStrings
  //       .findall("./si")
  //       [parseInt(sheet1.find("./sheetData/row/c[@r='C8']/v").text, 10)].find(
  //          "t"
  //       ).text
  // ).toEqual("Analyst");
  // expect(sheet1.find("./sheetData/row/c[@r='C9']").attrib.t).toEqual("s");
  // expect(
  //    sharedStrings
  //       .findall("./si")
  //       [parseInt(sheet1.find("./sheetData/row/c[@r='C9']/v").text, 10)].find(
  //          "t"
  //       ).text
  // ).toEqual("Manager");

  // expect(sheet1.find("./sheetData/row/c[@r='D7']/v").text).toEqual("8");
  // expect(sheet1.find("./sheetData/row/c[@r='D8']/v").text).toEqual("4");
  // expect(sheet1.find("./sheetData/row/c[@r='D9']/v").text).toEqual("4");

  // expect(sheet1.find("./sheetData/row/c[@r='E7']/v").text).toEqual("8");
  // expect(sheet1.find("./sheetData/row/c[@r='E8']/v").text).toEqual("4");
  // expect(sheet1.find("./sheetData/row/c[@r='E9']/v").text).toEqual("4");

  // expect(sheet1.find("./sheetData/row/c[@r='F7']/v").text).toEqual("4");
  // expect(sheet1.find("./sheetData/row/c[@r='F8']/v").text).toEqual("4");
  // expect(sheet1.find("./sheetData/row/c[@r='F9']/v").text).toEqual("4");

  // // XXX: For debugging only
  // fs.writeFileSync("test/output/test2.xlsx", newData, "binary");
}

export default exportToExcel
