import * as dotenv from "dotenv";
import { createError } from "../error.js";
import axios from "axios";

dotenv.config();

export const generateImage = async (req, res, next) => {
  try {

    const { prompt } = req.body;

    if (!prompt) {
      return next(createError(400, "Prompt is required"));
    }

    const imageUrl =
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const base64Image = Buffer.from(response.data, "binary").toString("base64");

    return res.status(200).json({
      success: true,
      photo: base64Image,
    });

  } catch (err) {

    console.log("FULL ERROR:", err);

    next(
      createError(
        err.status || 500,
        err.message || "Something went wrong"
      )
    );
  }
};