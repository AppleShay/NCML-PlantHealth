type DiseaseRecommendation = {
  title: string
  description: string
  treatments: string[]
  prevention: string[]
}

type DiseaseRecommendations = {
  [key: string]: DiseaseRecommendation
}

// Database of specific recommendations for each disease
export const diseaseRecommendations: DiseaseRecommendations = {
  // Apple diseases
  Apple_scab: {
    title: "Apple Scab",
    description: "A fungal disease that causes dark, scabby lesions on leaves and fruit.",
    treatments: [
      "Apply fungicides containing captan or sulfur at 7-10 day intervals",
      "Remove and destroy fallen leaves and infected fruit",
      "Prune trees to improve air circulation",
    ],
    prevention: [
      "Plant resistant apple varieties like Liberty, Enterprise, or Jonafree",
      "Apply preventative fungicide sprays in early spring",
      "Maintain good orchard sanitation by removing leaf litter",
    ],
  },
  Black_rot: {
    title: "Black Rot",
    description: "A fungal disease affecting apples, causing circular lesions on leaves and rotting fruit.",
    treatments: [
      "Apply fungicides containing captan or myclobutanil",
      "Remove mummified fruit from trees and ground",
      "Prune out cankers and dead wood during dormant season",
    ],
    prevention: [
      "Maintain proper tree spacing for good air circulation",
      "Control insects that create entry wounds for the fungus",
      "Apply dormant oil spray to kill overwintering fungal spores",
    ],
  },
  Cedar_apple_rust: {
    title: "Cedar Apple Rust",
    description: "A fungal disease that requires both apple trees and cedar/juniper to complete its life cycle.",
    treatments: [
      "Apply fungicides containing myclobutanil or propiconazole",
      "Remove galls from nearby cedar/juniper trees",
      "Treat at pink bud stage and continue at 7-10 day intervals",
    ],
    prevention: [
      "Plant resistant apple varieties like Liberty, Enterprise, or Williams Pride",
      "Remove cedar or juniper trees within 1/4 mile if possible",
      "Apply preventative fungicide sprays starting at pink bud stage",
    ],
  },

  // Cherry diseases
  Powdery_mildew: {
    title: "Powdery Mildew",
    description: "A fungal disease causing white powdery coating on leaves and stems.",
    treatments: [
      "Apply fungicides containing sulfur or potassium bicarbonate",
      "Prune affected branches to improve air circulation",
      "Apply neem oil or horticultural oils to affected areas",
    ],
    prevention: [
      "Plant resistant varieties when available",
      "Ensure proper spacing between plants for good air circulation",
      "Avoid overhead watering and water at the base of plants",
    ],
  },

  // Corn diseases
  "Cercospora_leaf_spot Gray_leaf_spot": {
    title: "Gray Leaf Spot",
    description: "A fungal disease causing rectangular gray to tan lesions on corn leaves.",
    treatments: [
      "Apply fungicides containing pyraclostrobin, azoxystrobin, or propiconazole",
      "Rotate crops to non-host plants for at least one year",
      "Maintain balanced soil fertility, especially nitrogen levels",
    ],
    prevention: [
      "Plant resistant corn hybrids",
      "Practice crop rotation with non-host crops",
      "Till crop residue thoroughly to promote decomposition",
    ],
  },
  Common_rust_: {
    title: "Common Rust",
    description: "A fungal disease causing small, circular to elongated orange-brown pustules on corn leaves.",
    treatments: [
      "Apply fungicides containing azoxystrobin or pyraclostrobin",
      "Time fungicide applications at first sign of disease",
      "Maintain balanced soil fertility",
    ],
    prevention: [
      "Plant rust-resistant corn hybrids",
      "Plant early in the season to avoid peak rust periods",
      "Avoid excessive nitrogen fertilization",
    ],
  },
  Northern_Leaf_Blight: {
    title: "Northern Leaf Blight",
    description: "A fungal disease causing long, elliptical gray-green to tan lesions on corn leaves.",
    treatments: [
      "Apply fungicides containing azoxystrobin, pyraclostrobin, or propiconazole",
      "Time applications at early disease development",
      "Maintain balanced soil fertility",
    ],
    prevention: [
      "Plant resistant corn hybrids",
      "Practice crop rotation with non-host crops for 1-2 years",
      "Till crop residue thoroughly to promote decomposition",
    ],
  },

  // Grape diseases
  Black_rot: {
    title: "Black Rot",
    description: "A fungal disease causing circular lesions on leaves and rotting fruit with black pycnidia.",
    treatments: [
      "Apply fungicides containing myclobutanil, tebuconazole, or captan",
      "Remove mummified fruit and infected leaves",
      "Prune to improve air circulation",
    ],
    prevention: [
      "Remove all mummified berries and infected canes during dormant pruning",
      "Apply dormant sprays to kill overwintering spores",
      "Train vines for maximum air circulation and sun exposure",
    ],
  },
  "Esca_(Black_Measles)": {
    title: "Esca (Black Measles)",
    description: "A complex fungal disease affecting the woody tissue of grapevines, causing tiger-striped leaves.",
    treatments: [
      "No effective chemical treatments are available once infected",
      "Remove and destroy severely infected vines",
      "Protect pruning wounds with fungicidal paste",
    ],
    prevention: [
      "Use clean pruning tools disinfected between cuts",
      "Prune during dry weather to minimize infection",
      "Avoid large pruning cuts and protect wounds with sealant",
    ],
  },
  "Leaf_blight_(Isariopsis_Leaf_Spot)": {
    title: "Leaf Blight (Isariopsis Leaf Spot)",
    description: "A fungal disease causing dark brown to black spots on grape leaves.",
    treatments: [
      "Apply fungicides containing mancozeb or copper-based products",
      "Remove infected leaves and destroy them",
      "Ensure proper vine spacing and training for air circulation",
    ],
    prevention: [
      "Maintain good air circulation through proper pruning",
      "Avoid overhead irrigation",
      "Apply preventative fungicides during humid weather",
    ],
  },

  // Orange diseases
  "Haunglongbing_(Citrus_greening)": {
    title: "Citrus Greening (Huanglongbing)",
    description:
      "A bacterial disease spread by the Asian citrus psyllid, causing mottled leaves and bitter, misshapen fruit.",
    treatments: [
      "No cure is available; management focuses on controlling psyllids",
      "Apply insecticides to control Asian citrus psyllid",
      "Remove and destroy infected trees to prevent spread",
    ],
    prevention: [
      "Plant disease-free certified nursery stock",
      "Monitor regularly for Asian citrus psyllid and symptoms",
      "Control ants that protect psyllids from natural enemies",
    ],
  },

  // Peach diseases
  Bacterial_spot: {
    title: "Bacterial Spot",
    description: "A bacterial disease causing small, dark lesions on leaves, fruit, and twigs.",
    treatments: [
      "Apply copper-based bactericides early in the growing season",
      "Remove infected leaves and fruit",
      "Prune affected branches during dry weather",
    ],
    prevention: [
      "Plant resistant varieties when available",
      "Avoid overhead irrigation",
      "Maintain good orchard sanitation",
    ],
  },

  // Pepper diseases
  Bacterial_spot: {
    title: "Bacterial Spot",
    description: "A bacterial disease causing small, dark lesions on leaves, stems, and fruit.",
    treatments: [
      "Apply copper-based bactericides early in the growing season",
      "Remove infected leaves and fruit",
      "Rotate with non-host crops for 1-2 years",
    ],
    prevention: [
      "Plant resistant varieties when available",
      "Use pathogen-free seeds and transplants",
      "Avoid overhead irrigation and working with wet plants",
    ],
  },

  // Potato diseases
  Early_blight: {
    title: "Early Blight",
    description: "A fungal disease causing dark, concentric rings on lower leaves first.",
    treatments: [
      "Apply fungicides containing chlorothalonil or copper-based products",
      "Remove infected leaves to prevent spread",
      "Ensure adequate plant nutrition, especially potassium",
    ],
    prevention: [
      "Practice crop rotation with non-host plants for 2-3 years",
      "Plant certified disease-free seed potatoes",
      "Space plants for good air circulation",
    ],
  },
  Late_blight: {
    title: "Late Blight",
    description: "A devastating water mold disease causing dark, water-soaked lesions on leaves and stems.",
    treatments: [
      "Apply fungicides containing chlorothalonil, mancozeb, or copper-based products",
      "Remove and destroy infected plants immediately",
      "Hill soil around plants to protect tubers",
    ],
    prevention: [
      "Plant certified disease-free seed potatoes",
      "Destroy volunteer potatoes and nightshade weeds",
      "Plant resistant varieties when available",
    ],
  },

  // Squash diseases
  Powdery_mildew: {
    title: "Powdery Mildew",
    description: "A fungal disease causing white powdery coating on leaves and stems.",
    treatments: [
      "Apply fungicides containing sulfur, potassium bicarbonate, or neem oil",
      "Remove severely infected leaves",
      "Apply compost tea as a preventative measure",
    ],
    prevention: [
      "Plant resistant varieties when available",
      "Space plants for good air circulation",
      "Avoid overhead watering and water at the base of plants",
    ],
  },

  // Strawberry diseases
  Leaf_scorch: {
    title: "Leaf Scorch",
    description: "A fungal disease causing small, purple to red spots that enlarge to look like scorched leaves.",
    treatments: [
      "Apply fungicides containing captan or myclobutanil",
      "Remove infected leaves and destroy them",
      "Ensure proper plant spacing for air circulation",
    ],
    prevention: [
      "Plant resistant varieties when available",
      "Use drip irrigation instead of overhead watering",
      "Apply mulch to prevent soil splash onto leaves",
    ],
  },

  // Tomato diseases
  Bacterial_spot: {
    title: "Bacterial Spot",
    description: "A bacterial disease causing small, dark lesions on leaves, stems, and fruit.",
    treatments: [
      "Apply copper-based bactericides early in the growing season",
      "Remove infected leaves and fruit",
      "Rotate with non-host crops for 2-3 years",
    ],
    prevention: [
      "Plant resistant varieties when available",
      "Use pathogen-free seeds and transplants",
      "Avoid overhead irrigation and working with wet plants",
    ],
  },
  Early_blight: {
    title: "Early Blight",
    description: "A fungal disease causing dark, concentric rings on lower leaves first.",
    treatments: [
      "Apply fungicides containing chlorothalonil or copper-based products",
      "Remove infected leaves to prevent spread",
      "Stake plants to keep foliage off the ground",
    ],
    prevention: [
      "Practice crop rotation with non-host plants for 2-3 years",
      "Mulch around plants to prevent soil splash",
      "Space plants for good air circulation",
    ],
  },
  Late_blight: {
    title: "Late Blight",
    description: "A devastating water mold disease causing dark, water-soaked lesions on leaves, stems, and fruit.",
    treatments: [
      "Apply fungicides containing chlorothalonil, mancozeb, or copper-based products",
      "Remove and destroy infected plants immediately",
      "Harvest remaining healthy fruit if disease is detected",
    ],
    prevention: [
      "Plant resistant varieties when available",
      "Destroy volunteer tomatoes and nightshade weeds",
      "Avoid overhead irrigation and dense plantings",
    ],
  },
  Leaf_Mold: {
    title: "Leaf Mold",
    description:
      "A fungal disease causing pale green to yellow spots on upper leaf surfaces and olive-green to grayish-purple fuzzy growth on undersides.",
    treatments: [
      "Apply fungicides containing chlorothalonil or copper-based products",
      "Remove infected leaves to reduce spore production",
      "Improve air circulation by pruning and proper spacing",
    ],
    prevention: [
      "Plant resistant varieties when available",
      "Reduce humidity in greenhouses with ventilation",
      "Avoid overhead irrigation and water at the base of plants",
    ],
  },
  Septoria_leaf_spot: {
    title: "Septoria Leaf Spot",
    description: "A fungal disease causing small, circular spots with dark borders and light centers on leaves.",
    treatments: [
      "Apply fungicides containing chlorothalonil or copper-based products",
      "Remove infected leaves to prevent spread",
      "Stake plants to keep foliage off the ground",
    ],
    prevention: [
      "Practice crop rotation with non-host plants for 2-3 years",
      "Mulch around plants to prevent soil splash",
      "Remove and destroy plant debris after harvest",
    ],
  },
  "Spider_mites Two-spotted_spider_mite": {
    title: "Two-spotted Spider Mite",
    description:
      "Tiny arachnids that cause stippling on leaves and fine webbing, especially during hot, dry conditions.",
    treatments: [
      "Apply insecticidal soap or horticultural oil to affected areas",
      "Release predatory mites as biological control",
      "Spray plants with strong water stream to dislodge mites",
    ],
    prevention: [
      "Maintain adequate soil moisture and humidity",
      "Regularly mist plants during hot, dry weather",
      "Avoid excessive nitrogen fertilization",
    ],
  },
  Target_Spot: {
    title: "Target Spot",
    description: "A fungal disease causing brown, concentric rings on leaves, stems, and fruit.",
    treatments: [
      "Apply fungicides containing chlorothalonil or copper-based products",
      "Remove infected leaves and fruit",
      "Improve air circulation by pruning and proper spacing",
    ],
    prevention: [
      "Practice crop rotation with non-host plants",
      "Avoid overhead irrigation",
      "Mulch around plants to prevent soil splash",
    ],
  },
  Tomato_Yellow_Leaf_Curl_Virus: {
    title: "Tomato Yellow Leaf Curl Virus",
    description: "A viral disease spread by whiteflies, causing yellowing, curling leaves and stunted growth.",
    treatments: [
      "No cure is available; management focuses on controlling whiteflies",
      "Apply insecticidal soap or neem oil to control whiteflies",
      "Remove and destroy infected plants immediately",
    ],
    prevention: [
      "Plant resistant varieties when available",
      "Use reflective mulch to repel whiteflies",
      "Install fine mesh screens in greenhouse production",
    ],
  },
  Tomato_mosaic_virus: {
    title: "Tomato Mosaic Virus",
    description: "A viral disease causing mottled light and dark green patterns on leaves and stunted growth.",
    treatments: [
      "No cure is available; remove and destroy infected plants",
      "Control aphids that may spread the virus",
      "Disinfect gardening tools between plants",
    ],
    prevention: [
      "Plant resistant varieties when available",
      "Wash hands after handling tobacco products before touching plants",
      "Use certified disease-free seeds and transplants",
    ],
  },

  // Default recommendations for any disease not specifically listed
  default: {
    title: "General Disease Management",
    description: "General recommendations for managing plant diseases.",
    treatments: [
      "Isolate the affected plant to prevent spread",
      "Remove and dispose of severely affected leaves",
      "Consider appropriate fungicide or treatment based on diagnosis",
      "Ensure proper air circulation around plants",
    ],
    prevention: [
      "Practice crop rotation",
      "Maintain good garden sanitation",
      "Avoid overhead watering",
      "Choose disease-resistant varieties when available",
    ],
  },

  // Default recommendations for healthy plants
  healthy: {
    title: "Maintaining Plant Health",
    description: "Recommendations for keeping your healthy plants in good condition.",
    treatments: [
      "Continue regular monitoring for early signs of disease",
      "Maintain balanced fertilization schedule",
      "Water appropriately for the plant species",
    ],
    prevention: [
      "Practice crop rotation",
      "Maintain good garden sanitation",
      "Ensure proper spacing for air circulation",
      "Use mulch to prevent soil splash and maintain moisture",
    ],
  },
}

// Helper function to get recommendations for a specific disease
export function getRecommendations(condition: string): DiseaseRecommendation {
  // Clean up the condition string to match our keys
  const cleanCondition = condition
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/,/g, "") // Remove commas

  // Try to find specific recommendations for this condition
  if (diseaseRecommendations[cleanCondition]) {
    return diseaseRecommendations[cleanCondition]
  }

  // If it's healthy, return healthy recommendations
  if (cleanCondition === "healthy") {
    return diseaseRecommendations.healthy
  }

  // If no specific recommendations found, return default
  return diseaseRecommendations.default
}
