Create .env file:

PORT=5001
DATABASE_URL=postgres://<your_db_username>@localhost:5432/task_management
JWT_SECRET=<any_jwt_secret_string>

As a value of JWT_SECRET You can write any encrypted string.

In Postgresql Create database “task_management”

Run: npm install

Run: node server.js (it will automatically creates tables)

urls:

Register User:
POST: localhost:5001/api/auth/register
Json body:{
    "email": "ucha@gmail.com",
    "password": "password"
}


Login User:
POST: localhost:5001/api/auth/login
Json body:{
    "email": "ucha@gmail.com",
    "password": "password"
}

Use responded token for Tasks methods. Put them in header:key: Authorization
Value: generated token

GET: 
Filter by pagination: localhost:5001/api/tasks?page=1&limit=10
Filter by status: localhost:5001/api/tasks?status=pending&page=1&limit=10

POST (create task)
localhost:5001/api/tasks
Body example:
{
    "title": "New Task",
    "description": "Task description",
    "status": “pending”
}

Statuses could be: 'pending', 'completed', 'in-progress'


POST (update task)
localhost:5001/api/tasks/<task_id>
Body example:
{
    "title": "New Task",
    "description": "Task description",
    "status": “completed”
}

Statuses could be: 'pending', 'completed', 'in-progress'

DELETE (delete task)
localhost:5001/api/tasks/<task_id>

Statuses could be: 'pending', 'completed', 'in-progress'