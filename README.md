# Plant Health - Plant Disease Detection

This application uses a trained CNN model to detect plant diseases from leaf images.

## Preview vs. Production

- In the preview environment, the application uses mock data to demonstrate the UI
- In production, you need to set up the model to get actual predictions

## Setting Up for Production

1. Make sure your ONNX model is accessible via a public URL
2. Set the `MODEL_URL` environment variable in your Vercel project:
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add `MODEL_URL` with the value pointing to your model file
   - Example: `https://my-plant-models-12345.s3.eu-north-1.amazonaws.com/plant_disease_cnn.onnx`

3. Update the species and condition lists in `app/api/analyze/route.ts` to match your model's output classes

4. Deploy your application

## Local Development

For local development:
1. Create a `.env.local` file with your `MODEL_URL`
2. Run `npm run dev`

## Troubleshooting

If you encounter issues with the model:
1. Check that your model URL is publicly accessible
2. Verify CORS is configured correctly on your storage service
3. Check that your model has the expected input and output format
4. Look at the Vercel Function Logs for detailed error messages
\`\`\`

Let's update the upload page to handle the mock data more gracefully:
