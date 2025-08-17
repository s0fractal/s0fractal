// Цей агент розпізнає структуру наміру та ініціює фрактальний вузол
import { initializeFractal } from "./src/core/init";
import { unfoldFS } from "./src/core/unfolding-fs";

(async () => {
  const context = await initializeFractal();
  const fs = unfoldFS(context);
  console.log("🌱 Fractal structure activated:", fs.preview());
})();
