export interface UnitType {
  [category: string]: string[];
}

export const units: UnitType = {
  time: ["seconds", "minutes", "hours", "days", "weeks", "months", "years"],
  "length / distance": [
    "millimeters (mm)",
    "centimeters (cm)",
    "meters (m)",
    "kilometers (km)",
    "inches (in)",
    "feet (ft)",
    "yards (yd)",
    "miles (mi)"
  ],
  temperature: ["Celsius (°C)", "Fahrenheit (°F)", "Kelvin (K)"],
  capacity: [
    "milliliters (mL)",
    "liters (L)",
    "teaspoons (tsp)",
    "tablespoons (tbsp)",
    "fluid ounces (fl oz)",
    "cups",
    "pints (pt)",
    "quarts (qt)",
    "gallons (gal)"
  ],
  "weight / mass": [
    "milligrams (mg)",
    "grams (g)",
    "kilograms (kg)",
    "ounces (oz)",
    "pounds (lb)",
    "tons (t)"
  ]
};
