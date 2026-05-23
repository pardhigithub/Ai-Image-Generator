
import axios from "axios";
import * as dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config();

export const generateImage = async (req, res, next) => {
  try {

    const { prompt } = req.body;

    if (!prompt) {
      return next(createError(400, "Prompt is required"));
    }

    const response = await axios({
      url: "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        inputs: prompt,
      },
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
        err.response?.status || 500,
        err.message || "Something went wrong"
      )
    );
  }
};