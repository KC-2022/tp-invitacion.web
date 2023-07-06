from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://karlaconty:brag3107@karlaconty.mysql.pythonanywhere-services.com/karlaconty$proyecto'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Asistencia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    correo = db.Column(db.String(100))

    def __init__(self, nombre, correo):
        self.nombre = nombre
        self.correo = correo


class AsistenciaSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'correo')


asistencia_schema = AsistenciaSchema()
asistencias_schema = AsistenciaSchema(many=True)


@app.route('/asistencia', methods=['GET'])
def get_asistencias():
    all_asistencias = Asistencia.query.all()
    result = asistencias_schema.dump(all_asistencias)
    return jsonify(result)


@app.route('/asistencia/<id>', methods=['GET'])
def get_asistencia(id):
    asistencia = Asistencia.query.get(id)
    return asistencia_schema.jsonify(asistencia)


@app.route('/asistencia/<id>', methods=['DELETE'])
def delete_asistencia(id):
    asistencia = Asistencia.query.get(id)
    db.session.delete(asistencia)
    db.session.commit()
    return asistencia_schema.jsonify(asistencia)


@app.route('/asistencia', methods=['POST'])
def create_asistencia():
    nombre = request.json['nombre']
    correo = request.json['correo']
    new_asistencia = Asistencia(nombre, correo)
    db.session.add(new_asistencia)
    db.session.commit()
    return asistencia_schema.jsonify(new_asistencia)


@app.route('/asistencia/<id>', methods=['PUT'])
def update_asistencia(id):
    asistencia = Asistencia.query.get(id)
    asistencia.nombre = request.json['nombre']
    asistencia.correo = request.json['correo']
    db.session.commit()
    return asistencia_schema.jsonify(asistencia)


if __name__ == '__main__':
    app.run()
