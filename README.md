# Plant Disease Detection

This application uses a ResNet18 model to detect plant diseases from leaf images.

## Setup

1. Make sure your ONNX model is accessible via a public URL
2. Set the `MODEL_URL` environment variable in your Vercel project to point to your model file
3. Place your `classes.json` file in the `public` directory

## How It Works

The application follows these steps:

1. User uploads an image
2. Image is resized to 224x224
3. Image is normalized with mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
4. The model processes the image and returns a prediction
5. The prediction is displayed to the user

## Troubleshooting

If you encounter issues:

1. Check that your model URL is accessible
2. Verify that classes.json is in the public directory
3. Check the server logs for detailed error messages
