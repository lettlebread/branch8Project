require("module-alias/register");

const guestArea = async (req, res) => {
  try {
    res.status(200).json({
      message: "hello world guest"
    });
  } catch (e) {
    if (e.code) {
      res.status(e.code).json(e.message);
    } else {
      throw e;
    }
  }
};

exports.guestArea = guestArea;