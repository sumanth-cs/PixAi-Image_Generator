import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

//setup openAI api key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);


//controller to generate ai image
export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });
        // const generatedImage = 'base64_encoded_image_mock';
        const generatedImage = response.data.data[0].b64_json;
        res.status(200).json({ photo: generatedImage });
    } catch (error) {
        next(
            createError(
                error.status,
                error?.response?.data?.error.message || error.message
            )
        );
    }
};