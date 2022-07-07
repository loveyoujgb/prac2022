from flask import Flask, request, render_template, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.4wyjp.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
  return render_template('index.html')

# 1. 페이지 로드 시 GET요청
@app.route("/todo", methods=["GET"])
def todo_get():
  all_todo_list = list(db.todo.find({}, {'_id': False}))
  return jsonify({'todo_list': all_todo_list })

# 2. 리스트 추가 시 POST 요청
@app.route("/todo", methods=["POST"])
def list_post():
  all_todo_list = list(db.todo.find({}, {'_id': False}))
  numbers = len(all_todo_list)+1

  list_receive = request.form['list_give']
  doc = {'list': list_receive,'number': int(numbers),'done':0}
  db.todo.insert_one(doc)
  return jsonify({'msg': 'post 연결 완료!'})

# 3. 리스트 완료 시 POST 요청
@app.route("/todo/done", methods=["POST"])
def done_post():
  done_receive = request.form['done_give']
  db.todo.update_one({'number': int(done_receive)}, {'$set': {'done': 1}})
  return jsonify({'msg': 'todo 완료!'})

# 3-1. 리스트 완료 취소 시 POST 요청
@app.route("/todo/done_cancel", methods=["POST"])
def cancel_post():
  done_receive = request.form['done_give']
  db.todo.update_one({'number': int(done_receive)}, {'$set': {'done': 0}})
  return jsonify()

# 4. 리스트 삭제 시 POST 요청
@app.route("/todo/delete", methods=["POST"])
def delete_post():
  delete_receive = request.form['delete_give']
  db.todo.delete_one({'number': int(delete_receive)})
  return jsonify({'msg': '삭제 완료!'})

# 5. 리스트 수정 시 POST 요청
@app.route("/todo/success", methods=["POST"])
def out_post():
  number_receive = request.form['number_give']
  change_receive = request.form['change_give']
  db.todo.update_one({'number': int(number_receive)}, {'$set': {'list': change_receive}})
  return jsonify({'msg': '수정 완료!'})

if __name__ == '__main__':
  app.run('0.0.0.0', port=5000, debug=True)
