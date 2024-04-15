from sqlalchemy import create_engine

from sqlalchemy import text
# Define database connection parameters
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'Nutritional'
MYSQL_DB = 'nutrient_data'
MYSQL_HOST = 'localhost'
MYSQL_PORT = '3306'

# Create database engine object
engine = create_engine(f'mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}')


# # 尝试连接数据库并执行查询语句
# try:
#     with engine.connect() as connection:
#         # 使用 text() 方法处理 SQL 语句
#         stmt = text("SELECT * FROM 食物营养数据")

#         # 执行查询语句
#         result = connection.execute(stmt)
        
#         # 遍历查询结果并输出每一行数据
#         for row in result:
#             print(row)
# except Exception as e:
#     # 打印连接错误信息
#     print("数据库连接失败：", e)
try:
    with engine.connect() as connection:
        # 执行删除操作
        query = "DELETE FROM nutrient_data WHERE 序号 IS NULL"
        connection.execute(query)
        print("删除操作执行成功！")
except Exception as e:
    # 打印错误信息
    print("删除操作失败：", e)
