let filters = {
  Brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  Contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  Saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  HueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  Blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  Grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  Sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  Opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  Invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");

let file = null;
let image = null;

const filterContainer = document.querySelector(".filters");

function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (event) => {
    filters[name].value = input.value;
    applyFilters();
  });

  return div;
}

function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElement(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max,
    );

    filterContainer.appendChild(filterElement);
  });
}

createFilters();

imageInput.addEventListener("change", (event) => {
  file = event.target.files[0];
  const imagePlaceholder = document.querySelector(".placeholder");

  imageCanvas.style.display = "block";

  imagePlaceholder.style.display = "none";

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});

function applyFilters() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  canvasCtx.filter = `
    brightness(${filters.Brightness.value}${filters.Brightness.unit})
    contrast(${filters.Contrast.value}${filters.Contrast.unit})
    saturate(${filters.Saturation.value}${filters.Saturation.unit})
    hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})
    blur(${filters.Blur.value}${filters.Blur.unit})
    grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})
    sepia(${filters.Sepia.value}${filters.Sepia.unit})
    opacity(${filters.Opacity.value}${filters.Opacity.unit})
    invert(${filters.Invert.value}${filters.Invert.unit})
  `;

  canvasCtx.drawImage(image, 0, 0);
}

resetButton.addEventListener("click", () => {
  filters = {
    Brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    Contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    Saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    HueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    Blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
    Grayscale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    Sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    Opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },
    Invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };
  applyFilters();

  filterContainer.innerHTML = "";
  createFilters();
});

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

const presets = {
  // Vintage/Retro Styles
  Vintage: {
    Brightness: 100,
    Contrast: 90,
    Saturation: 80,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 30,
    Opacity: 100,
    Invert: 0,
  },

  "Old School": {
    Brightness: 95,
    Contrast: 85,
    Saturation: 70,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 50,
    Opacity: 100,
    Invert: 0,
  },

  "Warm Vintage": {
    Brightness: 105,
    Contrast: 95,
    Saturation: 75,
    HueRotation: 15,
    Blur: 0,
    Grayscale: 0,
    Sepia: 40,
    Opacity: 100,
    Invert: 0,
  },

  // Drama & Mood
  Drama: {
    Brightness: 95,
    Contrast: 150,
    Saturation: 120,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  "Dark Drama": {
    Brightness: 70,
    Contrast: 140,
    Saturation: 110,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  "High Contrast": {
    Brightness: 105,
    Contrast: 180,
    Saturation: 130,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  // Black & White
  "Black & White": {
    Brightness: 100,
    Contrast: 120,
    Saturation: 0,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  "High Contrast B&W": {
    Brightness: 100,
    Contrast: 160,
    Saturation: 0,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  "Soft B&W": {
    Brightness: 105,
    Contrast: 90,
    Saturation: 0,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  // Color Effects
  "Cool Blue": {
    Brightness: 100,
    Contrast: 100,
    Saturation: 80,
    HueRotation: 200,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  "Warm Sunset": {
    Brightness: 105,
    Contrast: 95,
    Saturation: 120,
    HueRotation: 30,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Pastel: {
    Brightness: 115,
    Contrast: 80,
    Saturation: 70,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Vibrant: {
    Brightness: 105,
    Contrast: 110,
    Saturation: 180,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Muted: {
    Brightness: 100,
    Contrast: 90,
    Saturation: 40,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  // Artistic
  "Soft Glow": {
    Brightness: 115,
    Contrast: 85,
    Saturation: 90,
    HueRotation: 0,
    Blur: 5,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Dreamy: {
    Brightness: 110,
    Contrast: 80,
    Saturation: 70,
    HueRotation: 0,
    Blur: 3,
    Grayscale: 0,
    Sepia: 10,
    Opacity: 100,
    Invert: 0,
  },

  Neon: {
    Brightness: 120,
    Contrast: 150,
    Saturation: 200,
    HueRotation: 180,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 20,
  },

  "Film Grain": {
    Brightness: 100,
    Contrast: 105,
    Saturation: 90,
    HueRotation: 0,
    Blur: 2,
    Grayscale: 0,
    Sepia: 15,
    Opacity: 100,
    Invert: 0,
  },

  // Special Effects
  Silhouette: {
    Brightness: 60,
    Contrast: 200,
    Saturation: 0,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  "X-Ray": {
    Brightness: 130,
    Contrast: 180,
    Saturation: 0,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 100,
  },

  Faded: {
    Brightness: 110,
    Contrast: 70,
    Saturation: 50,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 20,
    Opacity: 85,
    Invert: 0,
  },

  Noir: {
    Brightness: 90,
    Contrast: 140,
    Saturation: 0,
    HueRotation: 0,
    Blur: 1,
    Grayscale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Summer: {
    Brightness: 110,
    Contrast: 95,
    Saturation: 140,
    HueRotation: 10,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Autumn: {
    Brightness: 100,
    Contrast: 100,
    Saturation: 110,
    HueRotation: 30,
    Blur: 0,
    Grayscale: 0,
    Sepia: 20,
    Opacity: 100,
    Invert: 0,
  },

  Polaroid: {
    Brightness: 110,
    Contrast: 85,
    Saturation: 80,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 15,
    Opacity: 100,
    Invert: 0,
  },

  "Sepia Tone": {
    Brightness: 100,
    Contrast: 95,
    Saturation: 60,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 80,
    Opacity: 100,
    Invert: 0,
  },

  "Deep Sepia": {
    Brightness: 90,
    Contrast: 100,
    Saturation: 50,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 100,
    Opacity: 100,
    Invert: 0,
  },
};

Object.keys(presets).forEach((presetName) => {
  const presetButton = document.createElement("Button");
  presetButton.classList.add("btn");
  presetButton.innerText = presetName;

  presetsContainer.appendChild(presetButton);

  presetButton.addEventListener("click", () => {
    const preset = presets[presetName];

    console.log(preset);

    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });

    applyFilters();
  });
});
