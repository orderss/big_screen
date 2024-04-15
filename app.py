from flask import Flask, render_template, jsonify,request
from sqlalchemy import create_engine, text



import logging
app = Flask(__name__)
app.logger.setLevel(logging.DEBUG)
# 定义数据库连接参数
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'Nutritional'
MYSQL_DB = 'nutrient_data'
MYSQL_HOST = 'localhost'
MYSQL_PORT = '3306'
# 创建数据库引擎对象
engine = create_engine(f'mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}')

# 每页显示的记录数
PER_PAGE = 10
data = []
@app.route('/')
def index():

    # 获取当前页码，默认为第一页
    page = int(request.args.get('page', 1))

    try:
        with engine.connect() as connection:
            # 使用 text() 方法处理 SQL 语句
            row_count_query = text("SELECT COUNT(*) FROM 食物营养数据")
            row_count_result = connection.execute(row_count_query).scalar()

            column_count_query = text("SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = :db_name AND table_name = '食物营养数据'")
            column_count_result = connection.execute(column_count_query, {'db_name': MYSQL_DB}).scalar()

            # 查询总记录数
            count_query = text("SELECT COUNT(*) FROM 食物营养数据")
            total_count = connection.execute(count_query).scalar()

            # 计算总页数
            total_pages = (total_count + PER_PAGE - 1) // PER_PAGE

            # 计算当前页的数据范围
            offset = max((page - 1) * PER_PAGE, 0)
            limit = PER_PAGE
            #执行数据库查询
            query = text("SELECT * FROM 食物营养数据 ORDER BY CAST(序号 AS UNSIGNED) ASC LIMIT :per_page OFFSET :offset")
            # 将参数打包成一个字典
            params = {"per_page": PER_PAGE, "offset": offset}
            # 使用 execute 方法执行查询，并将参数字典作为第二个参数传递
            result = connection.execute(query, params)
            # data = []
            # 清空全局变量 data
            data.clear()
            for row in result:
                row_dict = {}
                row_dict['序号'] = row[0]
                row_dict['名称'] = row[1]
                row_dict['可食部分(%)'] = row[2]
                row_dict['能量(千卡)'] = row[3]
                row_dict['水分(克)'] = row[4]
                row_dict['蛋白质(克)'] = row[5]
                row_dict['脂肪(克)'] = row[6]
                row_dict['膳食纤维(克)'] = row[7]
                row_dict['碳水化物(克)'] = row[8]
                row_dict['维生素A'] = row[9]
                row_dict['维生素B1(毫克)'] = row[10]
                row_dict['维生素B2(毫克)'] = row[11]
                row_dict['烟酸(毫克)'] = row[12]
                row_dict['维生素E'] = row[13]
                row_dict['钠(毫克)'] = row[14]
                row_dict['钙(毫克)'] = row[15]
                row_dict['铁(毫克)'] = row[16]
                row_dict['类别'] = row[17]
                row_dict['维生素C(毫克)'] = row[18]
                row_dict['胆固醇(毫克)'] = row[19]
                # 如果还有其他列，可以继续添加到字典中
                data.append(row_dict)
            # 渲染模板并传递行数和列数到前端
            return render_template('index.html', row_count=row_count_result, column_count=column_count_result, data=data,total_pages=total_pages, current_page=page)


    except Exception as e:
        # 打印错误信息
        print("查询操作失败：", e)
        # 如果查询失败，返回错误信息给前端
        return render_template('error.html', error_message=str(e))
    

@app.route('/get_data')
def get_data():
    try:
        global data
        return jsonify(data=data)
    except Exception as e:
        print("获取数据失败：", e)
        return jsonify(error=str(e))

if __name__ == '__main__':
    app.run(debug=True)