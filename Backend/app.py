from flask import Flask, send_from_directory, request, jsonify
import os

frontend_dir = os.path.abspath('../frontend')

app = Flask(__name__, static_folder=frontend_dir, static_url_path='')

@app.route('/')
def index():
    return send_from_directory(frontend_dir, 'index.html')

@app.route('/multiplicacion_matriz', methods=['POST'])
def multiplicacion_matriz():
    data = request.json
    matriz1 = data['matriz1']
    matriz2 = data['matriz2']

    filas1 = len(matriz1)
    columnas1 = len(matriz1[0])
    filas2 = len(matriz2)
    columnas2 = len(matriz2[0])

    if columnas1 != filas2:
        return jsonify({'error': 'Las dimensiones de las matrices no permiten multiplicación'}), 400

    resultado = []
    for i in range(filas1):
        fila = []
        for j in range(columnas2):
            suma = 0
            for k in range(columnas1):
                suma += matriz1[i][k] * matriz2[k][j]
            fila.append(suma)
        resultado.append(fila)

    return jsonify({'resultado': resultado})

if __name__ == '__main__':
    app.run(debug=True)
