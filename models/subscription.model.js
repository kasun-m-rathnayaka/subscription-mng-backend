import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be a positive number"],
        max: [1000, "Price must be less than 1000"]
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'GBP']
    },
    frequency: {
        type: String,
        required: true,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        required: true,
        enum: ['food', 'transport', 'clothing', 'rent', 'utilities', 'entertainment', 'other']
    },
    payment: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'canceled', 'trial'],
        default: 'active',
    },
    startData: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value < new Date(),
            message: 'Start date must be in the future'
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be in the past'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, {timestamps: true});

// auto calculate renewal data if missing
subscriptionSchema.pre('save', function (next) {
    const renewalPeriods ={
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365
    }
    this.renewalDate = new Date(this.startDate)
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency])

    if (this.renewalDate > new Date()){
        this.status = 'active'
    }

    next()
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;