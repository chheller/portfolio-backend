import axios from "axios";
module.exports = (req, res) => {
  try {
    if (req.method !== "POST") return res.send("Method Not Allowed.");
    const { responseToken } = JSON.parse(req.body);
    return axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GRECAPTCHA_TOKEN}&response=${responseToken}`
      )
      .then(response => {
        if (response.data.score > 0.3) {
          res.json({ email: process.env.CONTACT_EMAIL });
        } else {
          res.json({ error: "Are you a bot?" });
        }
      })
      .catch(err => {
        res.json({ error: err });
      });
  } catch (err) {
    res.json(err);
  }
};
