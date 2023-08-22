const RazorPay = require('razorpay')
const Order = require('../models/order')
require('dotenv').config

exports.purchaseMembership = async (req, res) => {
    try {
        var rzp = new RazorPay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500

        rzp.orders.create({
            amount,
            currency: 'INR'
        }, (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err))
            } else {
                req.user.createOrder({
                    orderId: order.id,
                    status: 'PENDING'
                }).then(() => {
                    return res.status(201).json({
                        order,
                        key_id: process.env.RAZORPAY_KEY_ID
                    })
                }).catch(err => console.log(err))
            }
        })

    } catch (err) {
        console.log(err)
    }
}
exports.updateTransactionStatus = async (req, res) => {

    try {
        const payment_id = req.body.paymentId;
        const order_id = req.body.order_id;
        const status = req.body.status
        if(status){
            Order.findOne({
                where: {
                    orderId: order_id
                }
            }).then((order) => {
                Promise.all([
                        order.update({
                            paymentId: payment_id,
                            status: 'SUCCESS',
                        }),
                        req.user.update({
                            isPremium: true
                        })
                    ]).then(() => {
                        return res.status(200).json({
                            success: true,
                            message: 'Transaction Successful'
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }).catch(err => console.log(err))
        }else {
            Order.findOne({where : { orderId : order_id}}).then((order)=> {
                order.update({
                    paymentId : payment_id,
                    status : 'FAILED' 
                }).then(() => {
                    res.status(200).json({
                        success : false,
                        message : 'Transaction Failed'
                    })
                })
            })
        }
        }catch (err) {
            console.log(err)
    }
}



