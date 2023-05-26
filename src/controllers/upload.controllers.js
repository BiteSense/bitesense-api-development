const uploadImage = require("../helpers/upload-image.helpers");

const imageUploadUser = async (req, res, next) => {
  const id_user = req.cookies.id_user;
  try {
    const file = req.file;
    file.originalname = `${Date.now()}${id_user}${file.originalname}`;
    const publicUrl = await uploadImage(file);

    return res.status(200).json({
      status: "success",
      message: "Upload Success",
      imgUrl: publicUrl,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = imageUploadUser;
