import HttpStatus from "http-status-codes";
import axios from "axios";

async function sendNotification(req, res) {
  const { email, firstName, gender, dateOfBirth, campaignId } = req.body;

  if (!email) {
    res.status(HttpStatus.BAD_REQUEST).json(`Email fild is empty`);
  }

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
        },
      },
    ],
  };

  const options = {
    headers: {
      Authorization: "auth c89bb3613c84e65cfbb3c2b67bc9f26b-us20",
    },
  };

  try {
    await axios.post(
      "https://us20.api.mailchimp.com/3.0/lists/f36845f863",
      data,
      options
    );
    res
      .status(HttpStatus.OK)
      .json({ message: "Notification sent successfully" });
  } catch (error) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json(`Error to send notification: ${error}`);
  }
}

async function unsubscribeNotification(req, res) {
  const { email } = req.body;

  if (!email) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: `Email fild is empty` });
  }

  const data = {
    members: [{ email_address: email, status: "unsubscribed" }],
    update_existing: true,
  };

  const options = {
    headers: {
      Authorization: "auth c89bb3613c84e65cfbb3c2b67bc9f26b-us20",
    },
  };

  try {
    await axios.post(
      "https://us20.api.mailchimp.com/3.0/lists/f36845f863",
      data,
      options
    );
    res
      .status(HttpStatus.OK)
      .json({ message: "Unsubscribed from the newsletter" });
  } catch (error) {
    console.log(error);
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: `Error to unsubscribe: ${error}` });
  }
}

export default {
  sendNotification,
  unsubscribeNotification,
};
