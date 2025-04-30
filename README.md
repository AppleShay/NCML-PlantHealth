# Plant Disease Detection

This application uses a ResNet18 model to detect plant diseases from leaf images.

## How It Works

The application follows these steps:

1. User uploads an image
2. Image is resized to 224x224
3. Image is normalized with mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
4. The model processes the image and returns a prediction
5. The prediction is displayed to the user

## Model Information

The application uses a ResNet18 model trained on the Plant Village dataset, which can identify 38 different combinations of plant species and disease conditions.

## Files

- `public/classes.json`: Contains the 38 classes the model can predict
- Model URL: https://my-plant-models-12345.s3.eu-north-1.amazonaws.com/plant_disease_resnet18.onnx

## Troubleshooting

If you encounter issues:

1. Check that the model URL is accessible
2. Verify that classes.json is in the public directory
3. Check the server logs for detailed error messages
