#!/bin/bash

echo "🚀 Ініціалізація середовища s0fractal"
git clone https://github.com/s0fractal/s0fractal.git
cd s0fractal
npm install || yarn
echo "✅ Встановлення завершено"
