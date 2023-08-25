const express = require('express')
const sequelize = require('./database/database')

const app = express()
const cors = require('cors')

const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const fs = require('fs')
const path = require('path')

app.use(express.json())
app.use(cors())

const purchaseRoute = require('./routes/purchase')
const expenseRoute = require('./routes/expense')
const userRoute = require('./routes/users')
const passwordRoute = require('./routes/password')
const mainRoute = require('./routes/main')

const User = require('./models/user')
const Expenses = require('./models/expense')
const Orders = require('./models/order')
const ForgotPasswordRequest =  require('./models/forgotPasswordRequests')
const DownloadHistory = require('./models/downloadHistory')

Expenses.belongsTo(User)
User.hasMany(Expenses)

User.hasMany(Orders)
Orders.belongsTo(User)

User.hasMany(ForgotPasswordRequest)

DownloadHistory.belongsTo(User)
User.hasMany(DownloadHistory)

const accessFileStream = fs.createWriteStream(path.join(__dirname, 'access.log'),{flags : 'a'})

app.use(compression())
app.use(helmet())
app.use(morgan('combined',{stream : accessFileStream}))

app.use('/password', passwordRoute)
app.use('/purchase', purchaseRoute)
app.use('/users', userRoute)
app.use('/expense', expenseRoute)
app.use('/', homeRoute)

sequelize.sync().then(
    app.listen(3000)
).catch(err => console.log(err))

