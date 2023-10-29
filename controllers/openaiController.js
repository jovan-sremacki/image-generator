const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

const generateImage = async (req, res) => {
  const { prompt } = req.body
  try {
    const image = await openai.images.generate(
      { prompt: prompt }
    )

    res.status(200).json({
      success: true,
      data: image['data'][0]['url']
    })
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated'
    })
  }
}

module.exports = { generateImage }