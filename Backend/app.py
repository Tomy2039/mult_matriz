from flask import Flask, send_from_directory, request, jsonify
import os

frontend_dir = os.path.abspath('../frontend')

app = Flask(__name__, static_folder=frontend_dir, static_url_path='')

@app.route('/')
def index():
    return send_from_directory(frontend_dir, 'index.html')

@app.route('/multiplicar_matriz', methods=['POST'])
def multiplicar_matriz():
    data = request.json
    matriz1 = data['matriz1']
    matriz2 = data['matriz2']

    filas1 = len(matriz1)
    columnas1 = len(matriz1[0])
    columnas2 = len(matriz2[0])

    # Inicializar resultado con ceros
    resultado = [[0 for _ in range(columnas2)] for _ in range(filas1)]

    for i in range(filas1):
        for j in range(columnas2):
            for k in range(columnas1):
                resultado[i][j] += matriz1[i][k] * matriz2[k][j]

    return jsonify({'resultado': resultado})

if __name__ == '__main__':
    app.run(debug=True)
