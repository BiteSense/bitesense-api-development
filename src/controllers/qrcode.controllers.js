const QRCode = require("qrcode");
const storage = require("../configs/cloud-storage.configs");
const uploadImg = require("../helpers/upload-image.helpers");

const inputProduk = async (req, res) => {
  const { name, composition, expiredDate, createDate } = req.body;
  let data = {
    name: name,
    composition: composition,
    expiredDate: expiredDate,
    createDate: createDate,
  };
  let stringdata = JSON.stringify(data);
  //   res.setHeader("content-type", "image/png");
  //   QRCode.toFileStream(res, stringdata);
  QRCode.toString(stringdata, { type: "terminal" }, async function (err, QRcode) {
    if (err) return console.log("error occurred");

    // Printing the generated code
    res.send(QRcode);
    console.log(QRcode);
  });
  QRCode.toDataURL(stringdata, function (err, code) {
    if (err) return console.log("error occurred");

    // Printing the code
    return res.json(code);
  });
};
const scanProduk = async (req, res) => {};

module.exports = {
  inputProduk,
  scanProduk,
};
